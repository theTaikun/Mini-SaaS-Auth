# services/auth.py

import logging
import uuid

from fastapi import Depends, HTTPException, status, Request
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from core.supabase import supabase
from database import get_db
from models.user import User

logger = logging.getLogger(__name__)

def extract_token_from_req(request: Request):
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing authorization header"
        )
    token = auth_header.replace("Bearer ", "")
    return token


def decode_token(token: str):
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

    return supabase_user


def get_or_create_app_user(db:Session, payload: dict):
    app_user = app_user_from_auth_id(
        db,
        payload["sub"],
        )
    if not app_user:
        app_user = create_app_user(db, payload)

    return app_user


def app_user_from_auth_id(
    db: Session,
    sub: str,
    auth_provider:str = "supabase",
    ):

    user = db.query(User).filter(
        User.auth_provider_uid == sub,
        User.auth_provider == auth_provider,
    ).one_or_none()

    return user


def create_app_user(
    db: Session,
    supabase_user: dict,
    provider = "supabase"
    ):

    user = User(
        id=str(uuid.uuid4()),
        email=supabase_user["email"],
        auth_provider=provider,
        auth_provider_uid=supabase_user["sub"],
    )

    db.add(user)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise
    db.refresh(user)

    logger.info("Created user %{user.id}s")

    return user


async def get_current_user(
    request: Request,
    db: Session = Depends(get_db)
    ):

    token = extract_token_from_req(request)
    payload = decode_token(token)
    app_user = get_or_create_app_user(db, payload)

    return app_user
