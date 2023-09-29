from .client import Queries
from bson.objectid import ObjectId
from pymongo import ReturnDocument, MongoClient
from models.game_objects import GameObject, GameObjectIn, GameObjectOut


class GameObjectQueries(Queries):
    DB_NAME = 'games'
    COLLECTION = 'game_objects'
    
    def create_game_object(self, game_object_in: GameObjectIn) -> GameObject:
        props = game_object_in.dict()
        self.collection.insert_one(props)
        props['id'] = str(props['_id'])
        return GameObject(**props)

    def get_all_game_objects(self) -> list:
        db = self.collection.find()
        game_objects = []
        for document in db:
            document["id"] = str(document["_id"])
            game_objects.append(GameObjectOut(**document))
        return game_objects
    
    def get_game_object(self, id) -> GameObjectOut:
        props = self.collection.find_one({"_id": ObjectId(id)})
        if not props:
            return None
        props["id"] = str(props["_id"])
        return GameObjectOut(**props)
    
    def update_game_object(self, id: str, game_object: GameObjectIn) -> GameObjectOut:
        props = game_object.dict()
        self.collection.find_one_and_update(
            {"_id": ObjectId(id)},
            {"$set": props},
            return_document=ReturnDocument.AFTER,
        )
        return GameObjectOut(**props, id=id)
    
    def delete_game_object(self, id: str) -> bool:
        return self.collection.delete_one({"_id": ObjectId(id)})