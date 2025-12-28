from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from datetime import datetime

from .. import models, schemas, auth
from ..database import get_db

router = APIRouter()

def can_access_ticket(
    db: Session, 
    ticket_id: int, 
    user: models.User
) -> models.Ticket:
    """Check if user can access the ticket and return the ticket if found"""
    ticket = db.query(models.Ticket).filter(models.Ticket.id == ticket_id).first()
    if not ticket:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ticket not found"
        )
    
    # Admins and agents can access any ticket
    if user.role in [models.UserRole.ADMIN, models.UserRole.AGENT]:
        return ticket
    
    # Customers can only access their own tickets
    if ticket.customer_id != user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions to access this ticket"
        )
    
    return ticket

@router.get("/", response_model=List[schemas.TicketResponse])
def list_tickets(
    skip: int = 0,
    limit: int = 100,
    status: Optional[schemas.TicketStatus] = None,
    priority: Optional[schemas.TicketPriority] = None,
    assigned_agent_id: Optional[int] = None,
    customer_id: Optional[int] = None,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_active_user)
) -> Any:
    """List tickets with optional filtering"""
    query = db.query(models.Ticket)
    
    # Regular users can only see their own tickets
    if current_user.role == models.UserRole.CUSTOMER:
        query = query.filter(models.Ticket.customer_id == current_user.id)
    # Agents can see tickets assigned to them or unassigned tickets
    elif current_user.role == models.UserRole.AGENT:
        query = query.filter(
            (models.Ticket.assigned_agent_id == current_user.id) |
            (models.Ticket.assigned_agent_id.is_(None))
        )
    
    # Apply filters
    if status:
        query = query.filter(models.Ticket.status == status)
    if priority:
        query = query.filter(models.Ticket.priority == priority)
    if assigned_agent_id:
        # Only admins can filter by arbitrary agent_id
        if current_user.role == models.UserRole.ADMIN:
            query = query.filter(models.Ticket.assigned_agent_id == assigned_agent_id)
        else:
            # Agents can only see their own assigned tickets
            query = query.filter(models.Ticket.assigned_agent_id == current_user.id)
    if customer_id:
        # Only admins can filter by arbitrary customer_id
        if current_user.role == models.UserRole.ADMIN:
            query = query.filter(models.Ticket.customer_id == customer_id)
        else:
            # Regular users can only see their own tickets
            query = query.filter(models.Ticket.customer_id == current_user.id)
    
    tickets = query.offset(skip).limit(limit).all()
    return tickets

@router.post("/", response_model=schemas.TicketResponse, status_code=status.HTTP_201_CREATED)
def create_ticket(
    ticket_in: schemas.TicketCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_active_user)
) -> Any:
    """Create a new ticket"""
    # Only customers can create tickets
    if current_user.role != models.UserRole.CUSTOMER:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only customers can create tickets"
        )
    
    # Create the ticket
    db_ticket = models.Ticket(
        title=ticket_in.title,
        description=ticket_in.description,
        status=schemas.TicketStatus.OPEN,
        priority=ticket_in.priority,
        customer_id=current_user.id,
        assigned_agent_id=None  # Will be assigned by an agent or admin
    )
    
    db.add(db_ticket)
    db.commit()
    db.refresh(db_ticket)
    
    return db_ticket

@router.get("/{ticket_id}", response_model=schemas.TicketResponse)
def get_ticket(
    ticket_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_active_user)
) -> Any:
    """Get a specific ticket by ID"""
    ticket = can_access_ticket(db, ticket_id, current_user)
    return ticket

@router.put("/{ticket_id}", response_model=schemas.TicketResponse)
def update_ticket(
    ticket_id: int,
    ticket_in: schemas.TicketUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_active_user)
) -> Any:
    """Update a ticket"""
    ticket = can_access_ticket(db, ticket_id, current_user)
    
    # Only admins and agents can update certain fields
    if current_user.role in [models.UserRole.ADMIN, models.UserRole.AGENT]:
        if ticket_in.status is not None:
            ticket.status = ticket_in.status
        if ticket_in.priority is not None:
            ticket.priority = ticket_in.priority
        if ticket_in.assigned_agent_id is not None:
            # Check if the assigned agent exists and is an agent
            agent = db.query(models.User).filter(
                models.User.id == ticket_in.assigned_agent_id,
                models.User.role == models.UserRole.AGENT,
                models.User.is_active == True
            ).first()
            if not agent:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Invalid agent ID"
                )
            ticket.assigned_agent_id = ticket_in.assigned_agent_id
    
    # Customers can only update title and description
    if ticket_in.title is not None:
        ticket.title = ticket_in.title
    if ticket_in.description is not None:
        ticket.description = ticket_in.description
    
    ticket.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(ticket)
    
    return ticket

@router.delete("/{ticket_id}", response_model=schemas.Msg)
def delete_ticket(
    ticket_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_active_user)
) -> Any:
    """Delete a ticket (admin only)"""
    if current_user.role != models.UserRole.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    ticket = db.query(models.Ticket).filter(models.Ticket.id == ticket_id).first()
    if not ticket:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ticket not found"
        )
    
    db.delete(ticket)
    db.commit()
    
    return {"msg": "Ticket deleted successfully"}

@router.post("/{ticket_id}/assign/{agent_id}", response_model=schemas.TicketResponse)
def assign_ticket(
    ticket_id: int,
    agent_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_active_user)
) -> Any:
    """Assign a ticket to an agent (admin/agent only)"""
    if current_user.role not in [models.UserRole.ADMIN, models.UserRole.AGENT]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    ticket = can_access_ticket(db, ticket_id, current_user)
    
    # Check if the agent exists and is an agent
    agent = db.query(models.User).filter(
        models.User.id == agent_id,
        models.User.role == models.UserRole.AGENT,
        models.User.is_active == True
    ).first()
    
    if not agent:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid agent ID"
        )
    
    ticket.assigned_agent_id = agent_id
    ticket.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(ticket)
    
    return ticket

@router.post("/{ticket_id}/status/{status}", response_model=schemas.TicketResponse)
def update_ticket_status(
    ticket_id: int,
    status: schemas.TicketStatus,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_active_user)
) -> Any:
    """Update ticket status (admin/agent only)"""
    if current_user.role not in [models.UserRole.ADMIN, models.UserRole.AGENT]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    ticket = can_access_ticket(db, ticket_id, current_user)
    
    # Only allow valid status transitions
    valid_transitions = {
        schemas.TicketStatus.OPEN: [
            schemas.TicketStatus.IN_PROGRESS, 
            schemas.TicketStatus.RESOLVED,
            schemas.TicketStatus.CLOSED
        ],
        schemas.TicketStatus.IN_PROGRESS: [
            schemas.TicketStatus.RESOLVED,
            schemas.TicketStatus.CLOSED
        ],
        schemas.TicketStatus.RESOLVED: [
            schemas.TicketStatus.CLOSED
        ],
        schemas.TicketStatus.CLOSED: []
    }
    
    if status not in valid_transitions.get(ticket.status, []):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid status transition from {ticket.status} to {status}"
        )
    
    ticket.status = status
    ticket.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(ticket)
    
    return ticket
