from datetime import datetime

def create_booster_set(self, booster_set: BoosterSetIn) -> BoosterSet:
        props = booster_set.dict()
        date = datetime.now().isoformat()
        time_dict = {
            "year": int(date[:4]),
            "month": int(date[5:7]),
            "day": int(date[8:10]),
            "time": date[11:16],
            "full_time": datetime.now(),
            "date_created": f"{int(date[5:7])}-{int(date[8:10])}-{int(date[:4])}"
        }
        props["created_on"] = time_dict
        props["updated_on"] = time_dict
        self.collection.insert_one(props)
        props["id"] = str(props["_id"])
        return BoosterSet(**props)

def update_booster_set(self, id: str, booster_set: BoosterSetIn) -> BoosterSetOut:
        props = booster_set.dict()
        date = datetime.now().isoformat()
        time_dict = {
            "year": int(date[:4]),
            "month": int(date[5:7]),
            "day": int(date[8:10]),
            "time": date[11:16],
            "full_time": datetime.now(),
            "date_updated": f"{int(date[5:7])}-{int(date[8:10])}-{int(date[:4])}"
        }
        props["updated_on"] = time_dict
        date_string = props["created_on"]["full_time"]
        props["created_on"]["full_time"] = datetime.strptime(date_string, "%Y-%m-%dT%H:%M:%S.%f")
        self.collection.find_one_and_update(
            {"_id": ObjectId(id)},
            {"$set": props},
            return_document=ReturnDocument.AFTER,
        )
        print((props["created_on"]["full_time"]))
        return BoosterSetOut(**props, id=id)

def add_card(self, id: str, card_number: int) -> DeckOut:
        props = self.collection.find_one({"_id": ObjectId(id)})
        cards = props["cards"]
        pluck = props["pluck"]

        DATABASE_URL = os.environ["DATABASE_URL"]
        conn = MongoClient(DATABASE_URL)
        db = conn.cards.cards
        card = db.find_one({"card_number": card_number})
        card_type = card["card_type"][0]

        db = conn.cards.card_types
        card_type = db.find_one({"_id": ObjectId(card_type)})
        deck_type = card_type["deck_type"]

        if deck_type == "Main" and cards.count(card_number) < 2:
            self.collection.find_one_and_update(
                {"_id": ObjectId(id)},
                {"$push": {"cards": card_number}},
                return_document=ReturnDocument.AFTER,
            )
        elif deck_type == "Pluck" and pluck.count(card_number) < 2:
            self.collection.find_one_and_update(
                {"_id": ObjectId(id)},
                {"$push": {"pluck": card_number}},
                return_document=ReturnDocument.AFTER,
            )

        return DeckOut(**props, id=id)