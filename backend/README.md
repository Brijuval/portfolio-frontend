# Backend Setup Guide

This folder contains the Django backend for the portfolio contact API.

## Tech Stack
- Python 3.10+
- Django 5.2
- Django REST Framework
- django-cors-headers
- python-decouple
- Gunicorn (for deployment)

## Project Structure
- `manage.py` - Django CLI entry point
- `portfolio_backend/settings.py` - app settings, CORS/CSRF, email config
- `portfolio_backend/urls.py` - root URL routes
- `contact/` - contact form API endpoint

## 1. Create and Activate Virtual Environment

Windows PowerShell:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

## 2. Install Dependencies

```powershell
pip install -r requirements.txt
```

## 3. Configure Environment Variables

Create `.env` in this folder by copying `.env.example`.

Required values:

```env
SECRET_KEY=replace-with-a-random-secret
DEBUG=True
ALLOWED_HOSTS=127.0.0.1,localhost

CORS_ALLOWED_ORIGINS=http://127.0.0.1:5500,http://localhost:5500,https://valmeeki.netlify.app,https://celadon-cajeta-d8bbc9.netlify.app
CSRF_TRUSTED_ORIGINS=http://127.0.0.1:5500,http://localhost:5500,https://valmeeki.netlify.app,https://celadon-cajeta-d8bbc9.netlify.app

# Local dev: use console backend so messages print in the terminal.
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
DEFAULT_FROM_EMAIL=your-email@gmail.com
CONTACT_RECEIVER_EMAIL=your-email@gmail.com
```

Notes:
- If frontend domain changes, update both `CORS_ALLOWED_ORIGINS` and `CSRF_TRUSTED_ORIGINS`.
- For deployed backend (Render/Railway), set the same variables in dashboard environment settings and redeploy.

## 4. Run Migrations

```powershell
python manage.py migrate
```

## 5. Start Development Server

```powershell
python manage.py runserver
```

Backend runs at `http://127.0.0.1:8000` by default.

## Available Routes
- `GET /` - API home response
- `GET /health/` - health check (`{"status":"ok"}`)
- `POST /api/contact/` - contact form submit

## Contact API Request Example

```bash
curl -X POST http://127.0.0.1:8000/api/contact/ \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Valmeeki",
    "email":"test@example.com",
    "subject":"Hello",
    "message":"Testing contact API"
  }'
```

Success response:

```json
{"message": "Message sent successfully."}
```

Common error responses:
- `400` invalid JSON
- `400` missing required fields (`name`, `email`, `message`)
- `400` invalid email format
- `500` receiver email not configured
- `500` mail send failure

For local development, the console email backend prints the message to the terminal instead of sending a real email. For production, switch `EMAIL_BACKEND` back to SMTP and set real mail credentials.

## Frontend Integration

In frontend code, send requests to:
- Local: `http://127.0.0.1:8000/api/contact/`
- Production: your deployed backend domain + `/api/contact/`

If browser shows CORS/CSRF errors after domain changes:
1. Update backend env vars
2. Redeploy backend
3. Retry request from frontend

## Deployment Command (Gunicorn)

```bash
gunicorn portfolio_backend.wsgi:application --bind 0.0.0.0:$PORT
```

## Quick Troubleshooting
- Server not starting: confirm virtual environment is active and dependencies are installed.
- Contact API fails with 403/blocked: verify CORS/CSRF origin values include current frontend domain.
- Contact API returns 500: verify `CONTACT_RECEIVER_EMAIL`, `EMAIL_USER`, and `EMAIL_PASS`.
- No email received: check spam folder and backend logs.
