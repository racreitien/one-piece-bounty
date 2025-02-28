from PIL import Image, ImageDraw, ImageFont
from fastapi import HTTPException


def create_bounty_poster(character_image_path: str, template_path: str, output_path: str, name: str, bounty: int):
    try:
        character_img = Image.open(character_image_path).convert("RGBA")
        template_img = Image.open(template_path).convert("RGBA")

        template_img.paste(character_img, (54, 182), character_img)

        draw = ImageDraw.Draw(template_img)
        # font = ImageFont.truetype("arial.ttf", 40)  # Adjust font and size as needed
        name_font = ImageFont.load_default(size=52)
        bounty_font = ImageFont.load_default(size=36)

        bounty_formatted = f"{bounty:,}"

        name_x = 55 + (180 - 6 * len(name)) if len(name) < 13 else 80

        draw.text((name_x, 643), name.upper(), font=name_font, fill=(53, 38, 31))
        draw.text((175, 730), f"$ {bounty_formatted}", font=bounty_font, fill=(53, 38, 31))

        template_img.save(output_path)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating bounty poster: {str(e)}")
