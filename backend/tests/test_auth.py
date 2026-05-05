# pylint: disable=duplicate-code
from fastapi import Request
import pytest
from sqlalchemy.exc import IntegrityError

from models.user import User
from services.auth import (
    extract_token_from_req,
    get_or_create_app_user,
    #decode_token,
    app_user_from_auth_id,
    create_app_user,
    )

def craft_request(
    method: str = "GET",
    path: str = "/",
    headers: dict | None = None,
    ) -> Request:

    headers = headers or {}

    scope = {
        "type": "http",
        "method": method,
        "path": path,
        "headers": [
            (k.lower().encode("latin-1"), v.encode("latin-1"))
            for k, v in headers.items()
            ],
        }

    return Request(scope)


def test_extract_token_from_req():
    original_token = "123XYZ"
    req = craft_request(
        headers={"Authorization": f"Bearer { original_token }"}
        )
    returned_token = extract_token_from_req(req)
    assert returned_token == original_token


# TODO: Requires a real token for Supabase to decrypt
"""
def test_decode_token():
    token = ""
    claim = decode_token(token)
    assert claim[x] == y
"""


def test_get_or_create_app_user(override_get_db):
    # Ensure user doesn't exist
    sub = "random-string"
    assert app_user_from_auth_id(override_get_db, sub) is None

    # Test User creation
    email = "test@example.com"
    claim = { "sub": sub, "email": email}
    user1 = create_app_user(override_get_db, claim)
    assert user1.auth_provider_uid == sub
    assert user1.email == email
    assert user1.nickname == "theTaikun"

    # Test user not duplicated
    assert len(override_get_db.query(User).all()) == 1
    with pytest.raises(IntegrityError):
        create_app_user(override_get_db, claim)
    user2 = get_or_create_app_user(override_get_db, claim)
    assert user2 == user1
    assert len(override_get_db.query(User).all()) == 1


# TODO: Requires a real token for Supabase to decrypt
"""
def test_get_me(test_client):
    token = ""
    response = test_client.get(
        "/me",
        headers={"Authorization": f"Bearer { token }"},
        )
    assert response.status_code == 200
    assert response.json() == {
        "email": "some_email",
        "auth_provider_uid": "some_sub",
        }
"""
