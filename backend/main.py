from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from livekit_service import create_token

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/get-token")
async def get_token(identity: str, room: str):
    token = await create_token(identity, room)
    return {"token": token}