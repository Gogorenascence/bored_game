from fastapi import FastAPI
from routers import games


app = FastAPI()

app.include_router(games.router, tags=["games"])

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )