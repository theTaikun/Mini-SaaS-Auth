# services/auth.py

import uuid

from fastapi import Depends, HTTPException, status, Request
from sqlalchemy.orm import Session

from core.supabase import supabase
from database import get_db
from models.user import User


async def get_current_user(
    request: Request,
    db: Session = Depends(get_db)
    ):

    auth_header = request.headers.get("Authorization")
    if not auth_header:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing authorization header"
        )
    token = auth_header.replace("Bearer ", "")

    try:
        response = supabase.auth.get_claims(token)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        ) from e

    supabase_user = response["claims"]
    if not supabase_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid user"
        )

    # check local user
    user = db.query(User).filter(
        User.auth_provider_uid == supabase_user["sub"],
        User.auth_provider == "supabase",
    ).one_or_none()

    # create if missing
    if not user:
        user = User(
            id=str(uuid.uuid4()),
            email=supabase_user["email"],
            auth_provider="supabase",
            auth_provider_uid=supabase_user["sub"],
        )

        db.add(user)
        db.commit()
        db.refresh(user)

    return user
