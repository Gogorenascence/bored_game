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
    
class MessageIn(BaseModel):
    content: str
    sender: str
    time: dict
    receiver: str

class Message(MessageIn):
    id: PydanticObjectId

class MessageOut(MessageIn):
    id: str