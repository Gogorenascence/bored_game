from models.messages import Message, MessageIn, MessageOut
from queries.messages import MessageQueries
from fastapi import APIRouter, Depends, Response


router = APIRouter(tags=["messages"])

@router.post("/api/message/", response_model=MessageOut)
async def create_message(
    message_in: MessageIn,
    queries: MessageQueries = Depends(),
    # account_data: dict = Depends(authenticator.get_current_account_data),
):
    message = queries.create_message(message_in)
    return message

@router.get("/api/message/", response_model=list)
async def get_all_messages(queries: MessageQueries = Depends()):
    return queries.get_all_messages()

@router.get("/api/message/{message_id}", response_model=MessageOut)
async def get_message(
    message_id: str,
    response: Response,
    queries: MessageQueries = Depends(),
):
    message = queries.get_message(message_id)
    if message is None:
        response.status_code = 404
    else:
        return message
    
@router.put("/api/message/{message_id}/", response_model=MessageOut | str)
async def update_message(
    message_id: str,
    message_in: MessageIn,
    response: Response,
    queries: MessageQueries = Depends(),
):
    message = queries.update_message(message_id, message_in)
    if message is None:
        response.status_code = 404
    else:
        return message

@router.delete("/api/message/{message_id}/", response_model=bool | str)
async def delete_message(
    message_id: str,
    response: Response,
    queries: MessageQueries = Depends(),
):
    message = queries.delete_message(message_id)
    if message is None:
        response.status_code = 404
    else:
        return True