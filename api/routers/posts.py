from models.posts import Post, PostIn, PostOut
from queries.posts import PostQueries
from fastapi import APIRouter, Depends, Response


router = APIRouter(tags=["posts"])

@router.post("/api/post/", response_model=PostOut)
async def create_post(
    post_in: PostIn,
    queries: PostQueries = Depends(),
    # account_data: dict = Depends(authenticator.get_current_account_data),
):
    post = queries.create_post(post_in)
    return post

@router.get("/api/post/", response_model=list)
async def get_all_posts(queries: PostQueries = Depends()):
    return queries.get_all_posts()

@router.get("/api/post/{post_id}", response_model=PostOut)
async def get_post(
    post_id: str,
    response: Response,
    queries: PostQueries = Depends(),
):
    post = queries.get_post(post_id)
    if post is None:
        response.status_code = 404
    else:
        return post
    
@router.put("/api/post/{post_id}/", response_model=PostOut | str)
async def update_post(
    post_id: str,
    post_in: PostIn,
    response: Response,
    queries: PostQueries = Depends(),
):
    post = queries.update_post(post_id, post_in)
    if post is None:
        response.status_code = 404
    else:
        return post

@router.delete("/api/post/{post_id}/", response_model=bool | str)
async def delete_post(
    post_id: str,
    response: Response,
    queries: PostQueries = Depends(),
):
    post = queries.delete_post(post_id)
    if post is None:
        response.status_code = 404
    else:
        return True