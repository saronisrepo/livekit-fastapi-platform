from livekit import api
from dotenv import load_dotenv
import os

load_dotenv()

async def create_token(identity: str, room: str):

    print("KEY:", os.getenv("LIVEKIT_API_KEY"))
    print("SECRET:", os.getenv("LIVEKIT_API_SECRET"))

    token = api.AccessToken(
        os.getenv("LIVEKIT_API_KEY"),
        os.getenv("LIVEKIT_API_SECRET")
    )

    token.identity = identity

    token.with_grants(
        api.VideoGrants(
            room_join=True,
            room=room
        )
    )

    return token.to_jwt()