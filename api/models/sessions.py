from pydantic import BaseModel
from typing import List, Optional
from bson.objectid import ObjectId

class PydanticObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, value: ObjectId | str) -> ObjectId:
        if value:
            try:
                ObjectId(value)
            except ValueError:
                raise ValueError(f"Not a valid object id: {value}")
        return value
    
class SessionIn(BaseModel):
    time: dict
    host: str
    location: str
    max_players: int
    members: List[str]
    game: str
    game_chat: List[str]

class Session(SessionIn):
    id: PydanticObjectId

class SessionOut(SessionIn):
    id: str