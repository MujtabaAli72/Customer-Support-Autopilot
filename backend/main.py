from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel
import uvicorn
import google.generativeai as genai
import os

# --- IMPORT YOUR DATA ---
from knowledge_base import FAQ_DATA 

# --- DATABASE SETUP ---
from database import Base, engine, SessionLocal
from models import User, UserRole

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- APP CONFIGURATION ---
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- SECURITY ---
SECRET_KEY = "your-secret-key-here"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login")

# --- AI CONFIGURATION ---
# YOUR KEY
GOOGLE_API_KEY = "AIzaSyDa5udV9RD7GPCsYlYzu684lPzGvhdnbPU"

model = None

try:
    print(f"[*] Connecting to AI with Key: {GOOGLE_API_KEY[:10]}...")
    genai.configure(api_key=GOOGLE_API_KEY)
    
    # Using the Flash model for speed
    model = genai.GenerativeModel('gemini-2.5-flash')

    print("[+] AI Model initialized successfully!")
except Exception as e:
    print(f"[-] AI Connection Failed: {e}")
    model = None

# --- HELPERS ---
def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(password: str, hashed: str) -> bool:
    return pwd_context.verify(password, hashed)

def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid credentials")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user

# --- SCHEMAS ---
class UserCreate(BaseModel):
    email: str
    password: str
    full_name: str
    role: str = "customer"

class LoginRequest(BaseModel):
    email: str
    password: str

class ChatRequest(BaseModel):
    message: str

# --- ROUTES ---

@app.post("/api/chat")
async def chat_with_ai(request: ChatRequest):
    if not model:
        return {"response": "System Error: AI is not configured."}
    
    try:
        # =================================================================
        #  HYBRID INTELLIGENCE PROMPT
        # =================================================================
        # This tells the AI: "Be an expert on the Brewery data, 
        # BUT also be a general assistant for everything else."
        
        system_instruction = f"""
        You are 'Support AutoPilot', an intelligent AI assistant.
        
        You have access to a specific Knowledge Base for a company called 'Just Another Sample' Brewery.
        
        === KNOWLEDGE BASE (Specific Company Data) ===
        {FAQ_DATA}
        ==============================================
        
        YOUR INSTRUCTIONS:
        1. FIRST, check the Knowledge Base. If the user asks about shipping, beer, tours, or the brewery, answer using that data strictly.
        2. SECOND, if the user asks a GENERAL question (e.g., "What is 2+2?", "Write Python code", "Who is Albert Einstein?"), IGNORE the knowledge base and answer using your own general intelligence.
        3. Do not say "I don't know" if it is a general knowledge question. Answer it!
        4. Be helpful, friendly, and professional.
        
        User Question: {request.message}
        """
        
        response = model.generate_content(system_instruction)
        return {"response": response.text}

    except Exception as e:
        print(f"AI Error: {e}")
        return {"response": "I am having trouble processing your request right now."}

@app.post("/api/register", status_code=201)
def register(user: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    new_user = User(
        email=user.email,
        hashed_password=get_password_hash(user.password),
        full_name=user.full_name,
        role=user.role
    )
    db.add(new_user)
    db.commit()
    return {"message": "User created successfully"}

@app.post("/api/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):
    email = data.email.lower().strip()
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    access_token = create_access_token({"sub": user.email}, timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/api/users/me")
def read_me(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "email": current_user.email,
        "full_name": current_user.full_name,
        "role": current_user.role
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)