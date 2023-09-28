from models.games import Game, GameIn, GameOut
from queries.games import GameQueries
from fastapi import APIRouter, Depends, Response


router = APIRouter(tags=["games"])

@router.post("/api/games/", response_model=GameOut)
async def create_game(
    game_in: GameIn,
    queries: GameQueries = Depends(),
    # account_data: dict = Depends(authenticator.get_current_account_data),
):
    game = queries.create_game(game_in)
    return game

@router.get("/api/games/", response_model=list)
async def get_all_games(queries: GameQueries = Depends()):
    return queries.get_all_games()

@router.get("/api/games/{game_id}", response_model=GameOut)
async def get_game(
    game_id: str,
    response: Response,
    queries: GameQueries = Depends(),
):
    game = queries.get_game(game_id)
    if game is None:
        response.status_code = 404
    else:
        return game
    
@router.put("/api/game/{game_id}/", response_model=GameOut | str)
async def update_game(
    game_id: str,
    game_in: GameIn,
    response: Response,
    queries: GameQueries = Depends(),
):
    game = queries.update_game(game_id, game_in)
    if game is None:
        response.status_code = 404
    else:
        return game

@router.delete("/api/game/{game_id}/", response_model=bool | str)
async def delete_game(
    game_id: str,
    response: Response,
    queries: GameQueries = Depends(),
):
    game = queries.delete_game(game_id)
    if game is None:
        response.status_code = 404
    else:
        return True