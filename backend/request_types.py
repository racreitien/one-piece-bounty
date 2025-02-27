from pydantic import BaseModel
from character_types import Group, Gender, EyeColor, HairColor, SkinColor


class BountyPosterRequest(BaseModel):
    name: str
    group: Group
    bounty: int
    gender: Gender
    age: int
    eyeColor: EyeColor
    hairColor: HairColor
    skinColor: SkinColor
