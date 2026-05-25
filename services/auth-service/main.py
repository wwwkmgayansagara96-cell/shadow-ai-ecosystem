from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="SHEDOW Auth Service")

class User(BaseModel):
    username: str
    email: str
    password: str

class LoginRequest(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user_id: str

@app.get("/health")
async def health():
    return {"status": "ok", "service": "auth-service"}

@app.post("/register", response_model=TokenResponse)
async def register(user: User):
    """
    Register a new user
    """
    # TODO: Hash password, store in DB, return JWT
    return {
        "access_token": "token_here",
        "token_type": "bearer",
        "user_id": "user_123"
    }

@app.post("/login", response_model=TokenResponse)
async def login(credentials: LoginRequest):
    """
    Login user
    """
    # TODO: Verify credentials, return JWT
    return {
        "access_token": "token_here",
        "token_type": "bearer",
        "user_id": "user_123"
    }

@app.get("/verify")
async def verify_token(token: str):
    """
    Verify JWT token
    """
    # TODO: Verify JWT
    return {"valid": True}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3001)
