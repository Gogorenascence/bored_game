from .client import Queries
from bson.objectid import ObjectId
from pymongo import ReturnDocument, MongoClient
from models.sessions import Session, SessionIn, SessionOut

class SessionQueries(Queries):
    DB_NAME = 'games'
    COLLECTION = 'sessions'

    def create_session(self, session_in: SessionIn) -> Session:
        props = session_in.dict()
        self.collection.insert_one(props)
        props['id'] = str(props['_id'])
        return Session(**props)

    def get_all_sessions(self) -> list:
        db = self.collection.find()
        sessions = []
        for document in db:
            document["id"] = str(document["_id"])
            sessions.append(SessionOut(**document))
        return sessions
    
    def get_session(self, id) -> SessionOut:
        props = self.collection.find_one({"_id": ObjectId(id)})
        if not props:
            return None
        props["id"] = str(props["_id"])
        return SessionOut(**props)
    
    def update_session(self, id: str, session: SessionIn) -> SessionOut:
        props = session.dict()
        self.collection.find_one_and_update(
            {"_id": ObjectId(id)},
            {"$set": props},
            return_document=ReturnDocument.AFTER,
        )
        return SessionOut(**props, id=id)
    
    def delete_session(self, id: str) -> bool:
        return self.collection.delete_one({"_id": ObjectId(id)})