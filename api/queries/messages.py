from .client import Queries
from bson.objectid import ObjectId
from pymongo import ReturnDocument, MongoClient
from models.messages import Message, MessageIn, MessageOut
from datetime import datetime

class MessageQueries(Queries):
    DB_NAME = 'games'
    COLLECTION = 'messages'

    def create_message(self, message_in: MessageIn) -> Message:
        props = message_in.dict()
        date = datetime.now().isoformat()
        time_dict = {
            "year": int(date[:4]),
            "month": int(date[5:7]),
            "day": int(date[8:10]),
            "time": date[11:16],
            "full_time": date
        }
        props["time"] = time_dict
        self.collection.insert_one(props)
        props['id'] = str(props['_id'])
        return Message(**props)

    def get_all_messages(self) -> list:
        db = self.collection.find()
        messages = []
        for document in db:
            document["id"] = str(document["_id"])
            messages.append(MessageOut(**document))
        return messages
    
    def get_message(self, id) -> MessageOut:
        props = self.collection.find_one({"_id": ObjectId(id)})
        if not props:
            return None
        props["id"] = str(props["_id"])
        return MessageOut(**props)
    
    def update_message(self, id: str, message: MessageIn) -> MessageOut:
        props = message.dict()
        self.collection.find_one_and_update(
            {"_id": ObjectId(id)},
            {"$set": props},
            return_document=ReturnDocument.AFTER,
        )
        return MessageOut(**props, id=id)
    
    def delete_message(self, id: str) -> bool:
        return self.collection.delete_one({"_id": ObjectId(id)})