# One Piece Bounty Generator

Generate a One Piece bounty poster for an original character based on user customization.

Enter a name, pirate group, desired bounty, and customize the character's appearance. Any of these options can also be skipped. Choose `Generate random bounty poster` to skip customization and generate a random character.

## About

The goal of this project was to explore the capabilities of Generative AI in a fun way. I wanted to get familiar with prompting and integrating generative models into a full-stack application. The project is live at [one-piece-bounty.onrender.com](one-piece-bounty.onrender.com). :tada:

The frontend is built with React in TypeScript, served by Vite.
- The app is a SPA with three views, two for entering customization options and one for displaying the final character with its poster.

The backend is built in Python with FastAPI. 
- Text generation is handled by OpenAI Chat Completions API using gpt 4o model.
- Image generation is handled by Stability AI Stable Diffusion model over Huggingface Inference API.
- Python Imaging Library is used to place the generated image into a poster template and style the name and bounty.

The app is hosted by Render.com using automatic deployments upon push for both the client and server side code.

## How to run

### Backend

```markdown
cd backend
python -m venv .venv

# On macOS/Linux:
source .venv/bin/activate

# On Windows:
.venv\Scripts\activate

pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend

```markdown
cd frontend
npm install
npm run dev
```
