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
    
class GameIn(BaseModel):
    name: str
    publisher: str
    max_players: int
    min_players: int
    genre: str
    game_length: int
    interaction: str
    picture_url: List
    websites: List
    theming: str
    rules: str #base rules
    formats: List #extended rules
    ratings: List[int]
    comments: List
    created: Optional[dict]
    updated: Optional[dict]

class Game(GameIn):
    id: PydanticObjectId

class GameOut(GameIn):
    id: str
