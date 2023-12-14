from .client import Queries
from bson.objectid import ObjectId
from pymongo import ReturnDocument, MongoClient
from models.posts import Post, PostIn, PostOut, Comment, CommentIn, CommentOut
from datetime import datetime

class PostQueries(Queries):
    DB_NAME = 'games'
    COLLECTION = 'posts'

    def create_post(self, post_in: PostIn) -> Post:
        props = post_in.dict()
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
        return Post(**props)

    def get_all_posts(self) -> list:
        db = self.collection.find()
        posts = []
        for document in db:
            document["id"] = str(document["_id"])
            posts.append(PostOut(**document))
        return posts
    
    def get_post(self, id) -> PostOut:
        props = self.collection.find_one({"_id": ObjectId(id)})
        if not props:
            return None
        props["id"] = str(props["_id"])
        return PostOut(**props)
    
    def update_post(self, id: str, post: PostIn) -> PostOut:
        props = post.dict()
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
        return PostOut(**props, id=id)
    
    def delete_post(self, id: str) -> bool:
        return self.collection.delete_one({"_id": ObjectId(id)})
    
    def create_comment(self, comment_in: CommentIn) -> Comment:
        props = comment_in.dict()
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
        return Comment(**props)
    
    def get_all_comments(self) -> list:
        db = self.collection.find()
        posts = []
        for document in db:
            document["id"] = str(document["_id"])
            posts.append(CommentOut(**document))
        return posts
    
    def get_comment(self, id) -> CommentOut:
        props = self.collection.find_one({"_id": ObjectId(id)})
        if not props:
            return None
        props["id"] = str(props["_id"])
        return CommentOut(**props) 

    def update_comment(self, id: str, comment: CommentIn) -> CommentOut:
        props = comment.dict()
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
            {"$set": {k: v for k, v in props.items() if k != "created"}},
            return_document=ReturnDocument.AFTER,
        )
        return CommentOut(**props, id=id)
    
    def delete_comment(self, id: str) -> bool:
        return self.collection.delete_one({"_id": ObjectId(id)})