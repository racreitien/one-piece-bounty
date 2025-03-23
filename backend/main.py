from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import character
import os

app = FastAPI()

origins = [
    "http://localhost:5173" if os.getenv("MODE") == "Dev" else "https://one-piece-bounty.onrender.com",
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


if __name__ == "__main__":
    port = int(os.environ.get("UVICORN_PORT", 8000))
