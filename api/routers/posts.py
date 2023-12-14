from models.posts import PostIn, PostOut, CommentOut, CommentIn
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
        
@router.post("/api/comments/", response_model=CommentOut)
async def create_comment(
    comment_in: CommentIn,
    queries: PostQueries = Depends(),
    # account_data: dict = Depends(authenticator.get_current_account_data),
):
    comment = queries.create_comment(comment_in)
    return comment

@router.get("/api/comments/", response_model=list)
async def get_all_comments(queries: PostQueries = Depends()):
    return queries.get_all_comments()

@router.get("/api/comments/{comment_id}", response_model=CommentOut)
async def get_comment(
    comment_id: str,
    response: Response,
    queries: PostQueries = Depends(),
):
    comment = queries.get_comment(comment_id)
    if comment is None:
        response.status_code = 404
    else:
        return comment
    
@router.put("/api/comments/{comment_id}/", response_model=CommentOut | str)
async def update_comment(
    comment_id: str,
    comment_in: CommentIn,
    response: Response,
    queries: PostQueries = Depends(),
):
    comment = queries.update_comment(comment_id, comment_in)
    if comment is None:
        response.status_code = 404
    else:
        return comment

@router.delete("/api/comments/{comment_id}/", response_model=bool | str)
async def delete_comment(
    comment_id: str,
    response: Response,
    queries: PostQueries = Depends(),
):
    comment = queries.delete_comment(comment_id)
    if comment is None:
        response.status_code = 404
    else:
        return True