from models.game_objects import GameObject, GameObjectIn, GameObjectOut
from queries.game_objects import GameObjectQueries
from fastapi import APIRouter, Depends, Response


router = APIRouter(tags=["game_objects"])

@router.post("/api/game_objects/", response_model=GameObjectOut)
async def create_game_object(
    game_object_in: GameObjectIn,
    queries: GameObjectQueries = Depends(),
    # account_data: dict = Depends(authenticator.get_current_account_data),
):
    game_object = queries.create_game_object(game_object_in)
    return game_object

@router.get("/api/game_objects/", response_model=list)
async def get_all_game_objects(queries: GameObjectQueries = Depends()):
    return queries.get_all_game_objects()

@router.get("/api/game_objects/{game_object_id}", response_model=GameObjectOut)
async def get_game_object(
    game_object_id: str,
    response: Response,
    queries: GameObjectQueries = Depends(),
):
    game_object = queries.get_game_object(game_object_id)
    if game_object is None:
        response.status_code = 404
    else:
        return game_object
    
@router.put("/api/game_objects/{game_object_id}/", response_model=GameObjectOut | str)
async def update_game_object(
    game_object_id: str,
    game_object_in: GameObjectIn,
    response: Response,
    queries: GameObjectQueries = Depends(),
):
    game_object = queries.update_game_object(game_object_id, game_object_in)
    if game_object is None:
        response.status_code = 404
    else:
        return game_object

@router.delete("/api/game_objects/{game_object_id}/", response_model=bool | str)
async def delete_game_object(
    game_object_id: str,
    response: Response,
    queries: GameObjectQueries = Depends(),
):
    game_object = queries.delete_game_object(game_object_id)
    if game_object is None:
        response.status_code = 404
    else:
        return True