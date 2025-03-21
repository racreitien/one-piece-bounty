from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import character

app = FastAPI()

origins = [
    "http://localhost:5173",
    "https://character-gen-api.onrender.com"
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
