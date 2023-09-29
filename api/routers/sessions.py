from models.sessions import Session, SessionIn, SessionOut
from queries.sessions import SessionQueries
from fastapi import APIRouter, Depends, Response


router = APIRouter(tags=["sessions"])

@router.post("/api/session/", response_model=SessionOut)
async def create_session(
    session_in: SessionIn,
    queries: SessionQueries = Depends(),
    # account_data: dict = Depends(authenticator.get_current_account_data),
):
    session = queries.create_session(session_in)
    return session

@router.get("/api/session/", response_model=list)
async def get_all_sessions(queries: SessionQueries = Depends()):
    return queries.get_all_sessions()

@router.get("/api/session/{session_id}", response_model=SessionOut)
async def get_session(
    session_id: str,
    response: Response,
    queries: SessionQueries = Depends(),
):
    session = queries.get_session(session_id)
    if session is None:
        response.status_code = 404
    else:
        return session
    
@router.put("/api/session/{session_id}/", response_model=SessionOut | str)
async def update_session(
    session_id: str,
    session_in: SessionIn,
    response: Response,
    queries: SessionQueries = Depends(),
):
    session = queries.update_session(session_id, session_in)
    if session is None:
        response.status_code = 404
    else:
        return session

@router.delete("/api/session/{session_id}/", response_model=bool | str)
async def delete_session(
    session_id: str,
    response: Response,
    queries: SessionQueries = Depends(),
):
    session = queries.delete_session(session_id)
    if session is None:
        response.status_code = 404
    else:
        return True