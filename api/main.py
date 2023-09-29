from fastapi import FastAPI
from routers import games, game_objects, posts, messages, sessions


app = FastAPI()

app.include_router(games.router, tags=["games"])
app.include_router(game_objects.router, tags=["game_objects"])
app.include_router(posts.router, tags=["posts"])
app.include_router(messages.router, tags=["messages"])
app.include_router(sessions.router, tags=["sessions"])

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )