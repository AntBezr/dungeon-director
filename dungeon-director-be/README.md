# D&D Interactive Map Backend

## What does the app do?

This backend powers an app designed to enhance in-person D&D sessions with immersive visuals and atmosphere. It helps game masters organise campaigns and sessions and prepare scenes featuring maps and NPCs for each session.

The backend uses Django to provide an API and an admin interface. The frontend is a separate React application.

## Python version

This project is developed using Python 3.14.2.

## Local setup

Run the following commands from the project root. The activation command below is for macOS and Linux.

```bash
# Create a virtual environment.
python3 -m venv .venv

# Activate the virtual environment in the current terminal.
source .venv/bin/activate

# Install the project dependencies.
python -m pip install -r requirements.txt
```

### Configure the secret key

Create `config/local_settings.py` locally and define your own `SECRET_KEY` there. Use a randomly generated value, not a memorable password.

You can generate a key with this command:

```bash
# Generate a secret key to save in your local settings file.
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

Save the generated value as the `SECRET_KEY` variable in `config/local_settings.py`. Make sure `config/settings.py` imports it.
Keep this file excluded from Git through `.gitignore`. Do not put the key in this README or commit it to the repository.

### Check the configuration

```bash
# Check that the installed dependencies are compatible.
python -m pip check

# Check the Django project configuration for common problems.
python manage.py check
```

### Run the development server

```bash
# Start the local Django development server.
python manage.py runserver
```

The server will be available at [localhost:8000](http://127.0.0.1:8000/).

Press `Ctrl+C` in the terminal to stop it.

## Database migrations: current learning stage

The initial migrations are applied.

