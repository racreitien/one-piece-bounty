import json
from fastapi import APIRouter
from openai import OpenAI
import os
from huggingface_hub import InferenceClient
from character_types import Gender
from request_types import BountyPosterRequest

router = APIRouter()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

hfClient = InferenceClient(token=os.getenv("HF_API_KEY"))


@router.post("/generate")
async def generate(request: BountyPosterRequest):
    prompt = f'''
        A {request.gender} character from the One Piece anime. The character has
        {request.eyeColor} eyes, {request.hairColor} hair and {request.skinColor} skin. 
        They are {request.age} years old.

        The poster says WANTED at the top. At the bottom, it says DEAD OR ALIVE.
        Below that, ${request.bounty}.
    '''

    bountyposter = hfClient.text_to_image(prompt, model="stabilityai/stable-diffusion-3.5-large")
    bountyposter.save("../poster.png")

    return json.dumps({"url": "localhost:8000/poster.png"})


@router.post("/generate/name")
async def generatename(request: BountyPosterRequest):
    prompt = f'''
                I will give you some information about a new, imaginary character in the One Piece world from 
                the One Piece anime. Using this information, you will think of a name for the character.
                
                The name should be short, creative, and relevant to the character's traits.

                Here is the information you will use:
                The character's gender is {request.gender}. They are {request.age} years old
                and a member of the {request.group}. Their bounty is {request.bounty} berries.

                In your response, return ONLY the name and nothing else.
            '''

    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "developer", "content": "You are Eichiro Oda, the author of the famous manga and "
                                             "anime called One Piece."},
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return completion.choices[0].message.content


@router.post("/generate/description")
async def generatedescription(request: BountyPosterRequest):
    pronouns = "they/them"
    if request.gender == Gender.Male:
        pronouns = "he/him"
    elif request.gender == Gender.Female:
        pronouns = "she/her"

    prompt = f'''
            I will give you some information about a new, imaginary character in the One Piece world from 
            the One Piece anime. Using this information, you will generate a short introduction for the character.
            
            Here is the information you will use:
            Their name is {request.name} and they are {request.gender}. They are {request.age} years old
            and a member of the {request.group}. {request.name} has {request.eyeColor} eyes, 
            {request.hairColor} hair and {request.skinColor} skin.
            
            Come up with either a skill (such as navigator or chef), or a Devil Fruit power that this character has.
            
            Do NOT include a title for the introduction. Separate the introduction into two short paragraphs.
            Keep your sentences very short. Refer to {request.name} as {pronouns}. It's not necessary to mention their
            appearance, unless it's unusual. 
        '''

    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "developer", "content": "You are Eichiro Oda, the author of the famous manga and "
                                             "anime called One Piece."},
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return completion.choices[0].message.content
