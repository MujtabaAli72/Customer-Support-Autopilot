from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime

from .. import models, schemas, auth
from ..database import get_db
from .tickets import can_access_ticket

router = APIRouter()

def can_access_message(
    db: Session, 
    message_id: int, 
    user: models.User
) -> models.Message:
    """Check if user can access the message and return the message if found"""
    message = db.query(models.Message).filter(models.Message.id == message_id).first()
    if not message:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Message not found"
        )
    
    # Get the ticket associated with this message
    ticket = db.query(models.Ticket).filter(
        models.Ticket.id == message.ticket_id
    ).first()
    
    if not ticket:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ticket not found"
        )
    
    # Check ticket access
    can_access_ticket(db, ticket.id, user)
    
    return message

@router.get("/ticket/{ticket_id}", response_model=List[schemas.MessageResponse])
def list_messages(
    ticket_id: int,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_active_user)
) -> Any:
    """List messages for a specific ticket"""
    # Check if user can access the ticket
    can_access_ticket(db, ticket_id, current_user)
    
    # Get messages for the ticket
    messages = db.query(models.Message).filter(
        models.Message.ticket_id == ticket_id
    ).order_by(
        models.Message.created_at.asc()
    ).offset(skip).limit(limit).all()
    
    return messages

@router.post("/", response_model=schemas.MessageResponse, status_code=status.HTTP_201_CREATED)
def create_message(
    message_in: schemas.MessageCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_active_user)
) -> Any:
    """Create a new message in a ticket"""
    # Check if the ticket exists and user has access
    ticket = can_access_ticket(db, message_in.ticket_id, current_user)
    
    # Create the message
    db_message = models.Message(
        content=message_in.content,
        ticket_id=message_in.ticket_id,
        user_id=current_user.id,
        is_ai_generated=False
    )
    
    # Update ticket's updated_at timestamp
    ticket.updated_at = datetime.utcnow()
    
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    
    return db_message

@router.get("/{message_id}", response_model=schemas.MessageResponse)
def get_message(
    message_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_active_user)
) -> Any:
    """Get a specific message by ID"""
    message = can_access_message(db, message_id, current_user)
    return message

@router.put("/{message_id}", response_model=schemas.MessageResponse)
def update_message(
    message_id: int,
    message_in: schemas.MessageCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_active_user)
) -> Any:
    """Update a message"""
    message = can_access_message(db, message_id, current_user)
    
    # Only the message author can update it
    if message.user_id != current_user.id and current_user.role != models.UserRole.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions to update this message"
        )
    
    # Update message content
    message.content = message_in.content
    
    # Update ticket's updated_at timestamp
    ticket = db.query(models.Ticket).filter(
        models.Ticket.id == message.ticket_id
    ).first()
    if ticket:
        ticket.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(message)
    
    return message

@router.delete("/{message_id}", response_model=schemas.Msg)
def delete_message(
    message_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_active_user)
) -> Any:
    """Delete a message"""
    message = can_access_message(db, message_id, current_user)
    
    # Only the message author or an admin can delete it
    if message.user_id != current_user.id and current_user.role != models.UserRole.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions to delete this message"
        )
    
    # Update ticket's updated_at timestamp if this is the last message
    ticket = db.query(models.Ticket).filter(
        models.Ticket.id == message.ticket_id
    ).first()
    if ticket:
        # Check if this is the last message
        last_message = db.query(models.Message).filter(
            models.Message.ticket_id == ticket.id
        ).order_by(
            models.Message.created_at.desc()
        ).first()
        
        if last_message and last_message.id == message_id:
            # If this is the last message, update ticket's updated_at
            ticket.updated_at = datetime.utcnow()
    
    db.delete(message)
    db.commit()
    
    return {"msg": "Message deleted successfully"}

@router.post("/ai-response/{ticket_id}", response_model=schemas.MessageResponse)
def generate_ai_response(
    ticket_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_active_user)
) -> Any:
    """Generate an AI response for a ticket (agent/admin only)"""
    if current_user.role not in [models.UserRole.ADMIN, models.UserRole.AGENT]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only agents and admins can generate AI responses"
        )
    
    # Check if user can access the ticket
    ticket = can_access_ticket(db, ticket_id, current_user)
    
    # In a real implementation, you would call the AI service here
    # For now, we'll return a placeholder response
    ai_response = "Thank you for contacting support. We're looking into your issue and will get back to you shortly."
    
    # Create the AI message
    db_message = models.Message(
        content=ai_response,
        ticket_id=ticket_id,
        user_id=current_user.id,  # Or a system user ID for AI
        is_ai_generated=True
    )
    
    # Update ticket's updated_at timestamp
    ticket.updated_at = datetime.utcnow()
    
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    
    return db_message
