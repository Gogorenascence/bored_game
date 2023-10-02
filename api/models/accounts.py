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
    
class AccountIn(BaseModel):
    email: str
    username: str
    password: str
    unhashed_password: Optional[str]
    profile_picture: str
    collection: List[str]
    wishlist: List[str]
    recomendations: List[str]
    games_played: List[str]
    friends: Optional[List]
    availability: List[dict]
    preferences: dict
    socials: List
    created_on: dict

class Account(AccountIn):
    id: PydanticObjectId

class AccountOut(AccountIn):
    id: str
