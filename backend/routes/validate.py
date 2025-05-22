from fastapi import APIRouter
from openai import OpenAI
import os

router = APIRouter()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


@router.post("/validate/name")
async def validate(name: str):
    prompt = f'''Evaluate whether this user input is a valid name for a person or fictional character: {name}
                 If it is NOT a valid name, please reply only with this response: Invalid
                 If it is a valid name, please reply only with this reponse: Valid
             '''

    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "developer",
                "content": "You are a cybersecurity expert familiar with prompt injection attacks."},
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return completion.choices[0].message.content
