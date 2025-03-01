from PIL import Image, ImageDraw, ImageFont
from fastapi import HTTPException


def create_bounty_poster(character_image_path: str, template_path: str, output_path: str, name: str, bounty: int):
    try:
        character_img = Image.open(character_image_path).convert("RGBA")
        template_img = Image.open(template_path).convert("RGBA")

        template_img.paste(character_img, (54, 182), character_img)

        draw = ImageDraw.Draw(template_img)

        name_font_size = 56
        name_y = 643
        name_x = 55 + (180 - 12 * len(name))
        if len(name) < 7:
            name_font_size = 92
            name_x = 55 + (180 - 16 * len(name))
            name_y -= 30
        elif len(name) < 11:
            name_font_size = 74
            name_x = 55 + (180 - 14 * len(name))

        name_font = ImageFont.truetype("fonts/DustismoRomanBold-lKAd.ttf", name_font_size)
        bounty_font = ImageFont.truetype("fonts/TrajanusRoman-6aEq.ttf", 36)

        bounty_formatted = f"{bounty:,}"

        draw.text((name_x, name_y), name.upper(), font=name_font, fill=(53, 38, 31))
        draw.text((140, 760), f"$ {bounty_formatted}", font=bounty_font, fill=(53, 38, 31))

        template_img.save(output_path)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating bounty poster: {str(e)}")
