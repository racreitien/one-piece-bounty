from fastapi import APIRouter, HTTPException
from openai import OpenAI
import os
from huggingface_hub import InferenceClient
from character_types import Gender, Group
from create_bounty_poster import create_bounty_poster
from request_types import BountyPosterRequest
from fastapi.responses import FileResponse

router = APIRouter()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

hfClient = InferenceClient(token=os.getenv("HF_API_KEY"))

poster_output_path = "images/bountyposter.png"


@router.post("/generate")
async def generate(request: BountyPosterRequest):
    age_desc = "a young child"
    if 13 <= request.age < 20:
        age_desc = "a teenager"
    elif request.age < 40:
        age_desc = "a young adult"
    elif request.age < 65:
        age_desc = "middle-aged"
    else:
        age_desc = "elderly"

    prompt = f'''
        Drawing of a {request.gender} character from the One Piece anime, who is {age_desc} with 
        {request.eyeColor} eyes, {request.hairColor} hair and {request.skinColor} skin. 
        {f"The character belongs to {request.group}" if request.group != Group.Unaffiliated else ""}
        One Piece manga art style.
    '''

    negative_prompt = "Text"

    try:
        sdxl_image = hfClient.text_to_image(prompt,
                                            negative_prompt=negative_prompt,
                                            width=480,
                                            height=352,
                                            model="stabilityai/stable-diffusion-3.5-large")

        sdxl_image.save("images/character.png")

        if os.path.exists(poster_output_path):
            os.remove(poster_output_path)

        create_bounty_poster(character_image_path="images/character.png",
                             template_path="images/bountypostertemplate.jpg",
                             output_path=poster_output_path,
                             name=request.name,
                             bounty=request.bounty)
    except Exception as e:
        print(str(e))
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/poster")
async def poster():
    if os.path.exists(poster_output_path):
        return FileResponse(poster_output_path)
    else:
        raise HTTPException(status_code=404, detail="Bounty poster image not found")


@router.post("/generate/name")
async def generatename(request: BountyPosterRequest):
    prompt = f'''
                I will give you some information about a new, imaginary character in the One Piece world from 
                the One Piece anime. Using this information, you will think of a name for the character.
                
                The name should be short, creative, and relevant to the character's traits. No more than 15 characters long.

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

    group_info = f"The skill or power should make sense for their group, {request.group}."

    prompt = f'''
            I will give you some information about a new, imaginary character in the One Piece world from 
            the One Piece anime. Using this information, you will generate a short introduction for the character.
            
            Here is the information you will use:
            Their name is {request.name} and they are {request.gender}. They are {request.age} years old
            and a member of the {request.group}. {request.name} has {request.eyeColor} eyes, 
            {request.hairColor} hair and {request.skinColor} skin.
            
            Come up with either a skill (such as navigator or chef), or a Devil Fruit power that this character has.
            {group_info if request.group != Group.Unaffiliated else ""}
            
            Do NOT explicitly reference their age unless it is below 15 or above 100.
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
