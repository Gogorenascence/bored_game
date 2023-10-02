from .client import Queries
from bson.objectid import ObjectId
from pymongo import ReturnDocument, MongoClient
from pymongo.errors import DuplicateKeyError
from models.accounts import Account, AccountIn, AccountOut
from datetime import datetime
from typing import Union

class DuplicateAccountError(ValueError):
    pass

class AccountQueries(Queries):
    DB_NAME = 'games'
    COLLECTION = 'accounts'
    
    def create_account(self, account_in: AccountIn, hashed_password: str) -> Account:
        props = account_in.dict()
        props["unhashed_password"] = props["password"]
        props["password"] = hashed_password
        date = datetime.now().isoformat()
        time_dict = {
            "year": int(date[:4]),
            "month": int(date[5:7]),
            "day": int(date[8:10]),
            "time": date[11:16],
            "full_time": date
        }
        props["created_on"] = time_dict
        self.collection.insert_one(props)
        props['id'] = str(props['_id'])
        return Account(**props)

    def get_all_accounts(self) -> list:
        db = self.collection.find()
        accounts = []
        for document in db:
            document["id"] = str(document["_id"])
            accounts.append(AccountOut(**document))
        return accounts
    
    def get_account(self, username) -> AccountOut:
        props = self.collection.find_one({"username": username})
        if not props:
            return None
        props["id"] = str(props["_id"])
        return AccountOut(**props)
    
    def get_account_by_id(self, id) -> AccountOut:
        props = self.collection.find_one({"_id": ObjectId(id)})
        if not props:
            return None
        props["id"] = str(props["_id"])
        return AccountOut(**props)
    
    def update_account(self, id: str, account: AccountIn, hashed_password: Union[None, str]) -> AccountOut:
        props = account.dict()
        if hashed_password:
            props["unhashed_password"] = props["password"]
            props["password"] = hashed_password
        self.collection.find_one_and_update(
            {"_id": ObjectId(id)},
            {"$set": props},
            return_document=ReturnDocument.AFTER,
        )
        return AccountOut(**props, id=id)
    
    def update_account_without(self, id: str, account: AccountIn) -> AccountOut:
        props = account.dict()
        self.collection.find_one_and_update(
            {"_id": ObjectId(id)},
            {"$set": props},
            return_document=ReturnDocument.AFTER,
        )
        return AccountOut(**props, id=id)
    
    def delete_account(self, id: str) -> bool:
        return self.collection.delete_one({"_id": ObjectId(id)})