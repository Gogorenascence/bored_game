from .client import Queries
from bson.objectid import ObjectId
from datetime import datetime
from pymongo import ReturnDocument, MongoClient
from models.games import Game, GameIn, GameOut


class GameQueries(Queries):
    DB_NAME = 'games'
    COLLECTION = 'games'
    
    def create_game(self, game_in: GameIn) -> Game:
        props = game_in.dict()
        date = datetime.now().isoformat()
        time_dict = {
            "year": int(date[:4]),
            "month": int(date[5:7]),
            "day": int(date[8:10]),
            "time": date[11:16],
            "full_time": date
        }
        props["created"] = time_dict
        props["updated"] = time_dict
        self.collection.insert_one(props)
        props['id'] = str(props['_id'])
        return Game(**props)
    
    async def scraper_create_game(self, game_in: GameIn) -> Game:
        props = game_in
        date = datetime.now().isoformat()
        time_dict = {
            "year": int(date[:4]),
            "month": int(date[5:7]),
            "day": int(date[8:10]),
            "time": date[11:16],
            "full_time": date
        }
        props["created"] = time_dict
        props["updated"] = time_dict
        db_game = self.collection.find_one({"name": props["name"]})
        if not db_game:
            self.collection.insert_one(props)
            props['id'] = str(props['_id'])
            return Game(**props)
        else:
            print("this would be a dupe")

    def get_all_games(self) -> list:
        db = self.collection.find()
        games = []
        for document in db:
            document["id"] = str(document["_id"])
            games.append(GameOut(**document))
        return games

    def get_all_popular_games(self) -> list:
        db = self.collection.find()
        all_time_games = []
        for document in db:
            document["id"] = str(document["_id"])
            all_time_games.append(GameOut(**document))
        monthly_games = all_time_games
        print(monthly_games)
        daily_games = all_time_games

        return all_time_games, monthly_games, daily_games

    def get_game(self, id) -> GameOut:
        props = self.collection.find_one({"_id": ObjectId(id)})
        if not props:
            return None
        props["id"] = str(props["_id"])
        return GameOut(**props)
    
    def update_game(self, id: str, game: GameIn) -> GameOut:
        props = game.dict()
        date = datetime.now().isoformat()
        time_dict = {
            "year": int(date[:4]),
            "month": int(date[5:7]),
            "day": int(date[8:10]),
            "time": date[11:16],
            "full_time": date
        }
        props["updated"] = time_dict
        self.collection.find_one_and_update(
            {"_id": ObjectId(id)},
            {"$set": props},
            return_document=ReturnDocument.AFTER,
        )
        return GameOut(**props, id=id)
    
    def delete_game(self, id: str) -> bool:
        return self.collection.delete_one({"_id": ObjectId(id)})