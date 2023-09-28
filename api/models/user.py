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
    
class UserIn(BaseModel):
    collection = List[str]
    wishlist = List[str]
    recomendations = List[str]
    games_played = List[str]
    friends = List[str]
    availability = List[dict]
    preferences = dict
    socials = List
    last_seen = dict
    joined = dict

class User(UserIn):
    id: PydanticObjectId

class UserOut(UserIn):
    id: str
