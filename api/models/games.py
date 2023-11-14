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
    min_players: int
    max_players: int
    min_game_length: int
    max_game_length: int
    genre: str
    picture_url: List
    websites: Optional[list]
    theming: List
    rules: Optional[str] #base rules
    formats: Optional[list]
    bgg_rating: float
    ratings: List[float]
    comments: List
    game_mechanics: List
    description: str

# name
# publ
# image 
# thumbnail 
# max players
# min players
# genre = subdomain 
# themeing = category
# length
# boardgame mechanics
# description

class Game(GameIn):
    id: PydanticObjectId

class GameOut(GameIn):
    id: str
