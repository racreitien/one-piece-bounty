from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import character
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    mode: str = "Prod"


settings = Settings()
app = FastAPI()

origins = [
    "http://localhost:5173" if settings.mode == "Dev" else "https://one-piece-bounty.onrender.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/")
async def root():
    return {"message": "Hello World"}

app.include_router(character.router)
