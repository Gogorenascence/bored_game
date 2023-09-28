from .client import Queries
from bson.objectid import ObjectId
from pymongo import ReturnDocument, MongoClient
from models.games import Game, GameIn, GameOut


class GameQueries(Queries):
    DB_NAME = 'games'
    COLLECTION = 'games'
    
    def create_game(self, game_in: GameIn) -> Game:
        props = game_in.dict()
        self.collection.insert_one(props)
        props['id'] = str(props['_id'])
        return Game(**props)

    def get_all_games(self) -> list:
        db = self.collection.find()
        games = []
        for document in db:
            document["id"] = str(document["_id"])
            games.append(GameOut(**document))
        return games
    
    def get_game(self, id) -> GameOut:
        props = self.collection.find_one({"_id": ObjectId(id)})
        if not props:
            return None
        props["id"] = str(props["_id"])
        return GameOut(**props)
    
    def update_game(self, id: str, game: GameIn) -> GameOut:
        props = game.dict()
        self.collection.find_one_and_update(
            {"_id": ObjectId(id)},
            {"$set": props},
            return_document=ReturnDocument.AFTER,
        )
        return GameOut(**props, id=id)
    
    def delete_game(self, id: str) -> bool:
        return self.collection.delete_one({"_id": ObjectId(id)})