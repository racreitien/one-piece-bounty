# One Piece Bounty Generator

Generate a One Piece bounty poster for an original character based on user customization.

Enter a name, pirate group, desired bounty, and customize the character's appearance. Any of these options can also be skipped. Choose `Generate random bounty poster` to skip customization and generate a random character.

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
uvicorn asgi:application --reload
```

### Frontend

```markdown
cd frontend
npm install
npm run dev
```
