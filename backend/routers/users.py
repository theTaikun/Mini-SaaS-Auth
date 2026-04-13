# routes/users.py

from fastapi import APIRouter, Depends
from services.auth import get_current_user
from models.user import User

router = APIRouter()

@router.get("/me")
async def get_me(user: User = Depends(get_current_user)):

    return {
        "id": user.id,
        "email": user.email,
        "nickname": user.nickname,
    }
