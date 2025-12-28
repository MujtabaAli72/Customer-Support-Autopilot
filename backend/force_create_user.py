from database import SessionLocal, engine, Base
from models import User
from passlib.context import CryptContext

# 1. Setup Security (Corrected Syntax)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def force_create():
    print("--- STARTING USER CREATION ---")
    
    # Ensure tables exist
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    # 2. Define the user you want
    target_email = "m.elya1412@gmail.com"
    target_pass = "password123"
    
    # 3. Check if user exists
    user = db.query(User).filter(User.email == target_email).first()
    
    if user:
        print(f"[INFO] User found: {user.email}")
        # Reset password to ensure it matches
        user.hashed_password = pwd_context.hash(target_pass)
        db.commit()
        print(f"[SUCCESS] Password updated to: {target_pass}")
    else:
        print(f"[INFO] User not found. Creating {target_email}...")
        new_user = User(
            email=target_email,
            hashed_password=pwd_context.hash(target_pass),
            full_name="Naeem Ullah",
            role="admin"
        )
        db.add(new_user)
        db.commit()
        print(f"[SUCCESS] Created user: {target_email}")
    
    # 4. List all users to verify
    print("\n--- DATABASE CONTENTS ---")
    users = db.query(User).all()
    for u in users:
        print(f"User: {u.email} | Role: {u.role}")
    print("-------------------------")
    
    db.close()

if __name__ == "__main__":
    force_create()