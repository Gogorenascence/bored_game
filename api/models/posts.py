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

class PostIn(BaseModel):
    content: str
    sender: str
    time: dict
    users_wall: str

class Post(PostIn):
    id: PydanticObjectId

class PostOut(PostIn):
    id: str

class CommentIn(BaseModel):
    game_id: str
    user_id: str
    content: list[str]
    created: dict
    updated: dict

class Comment(CommentIn):
    id: PydanticObjectId

class CommentOut(CommentIn):
    id: str