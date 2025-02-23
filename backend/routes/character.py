from fastapi import APIRouter
from pydantic import BaseModel
from openai import OpenAI
from diffusers import DiffusionPipeline
import torch
import os
from character_types import Group, Gender, EyeColor, HairColor, SkinColor

router = APIRouter()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

'''
# Load base and refiner pipelines for SDXL model
base = DiffusionPipeline.from_pretrained(
    "stabilityai/stable-diffusion-xl-base-1.0", torch_dtype=torch.float16, variant="fp16", use_safetensors=True
)
base.to("cuda")
refiner = DiffusionPipeline.from_pretrained(
    "stabilityai/stable-diffusion-xl-refiner-1.0",
    text_encoder_2=base.text_encoder_2,
    vae=base.vae,
    torch_dtype=torch.float16,
    use_safetensors=True,
    variant="fp16",
)
refiner.to("cuda")

# Define how many steps and what % of steps to be run on each expert (80/20) here
n_steps = 40
high_noise_frac = 0.8
'''


class BountyPosterRequest(BaseModel):
    name: str
    group: Group
    bounty: int
    gender: Gender
    age: int
    eyeColor: EyeColor
    hairColor: HairColor
    skinColor: SkinColor


@router.post("/generate")
async def generate(request: BountyPosterRequest):
    prompt = f'''
        A {request.gender} character from the One Piece anime. The character has
        {request.eyeColor} eyes, {request.hairColor} hair and {request.skinColor} skin. 
        They are {request.age} years old.
    '''

    '''
    The poster says WANTED at the top. At the bottom, it says DEAD OR ALIVE.
        Below that, ${request.bounty}.
    '''

    ''' Run the stable diffusion pipelines to generate the image
    image = base(
        prompt=prompt,
        num_inference_steps=n_steps,
        denoising_end=high_noise_frac,
        output_type="latent",
    ).images
    image = refiner(
        prompt=prompt,
        num_inference_steps=n_steps,
        denoising_start=high_noise_frac,
        image=image,
    ).images[0]

    return image'''
    return {}


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
