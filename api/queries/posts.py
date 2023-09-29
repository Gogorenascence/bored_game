from .client import Queries
from bson.objectid import ObjectId
from pymongo import ReturnDocument, MongoClient
from models.posts import Post, PostIn, PostOut

class PostQueries(Queries):
    DB_NAME = 'games'
    COLLECTION = 'posts'

    def create_post(self, post_in: PostIn) -> Post:
        props = post_in.dict()
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
        self.collection.find_one_and_update(
            {"_id": ObjectId(id)},
            {"$set": props},
            return_document=ReturnDocument.AFTER,
        )
        return PostOut(**props, id=id)
    
    def delete_post(self, id: str) -> bool:
        return self.collection.delete_one({"_id": ObjectId(id)})