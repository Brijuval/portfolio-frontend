import json

from decouple import config
from django.conf import settings
from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

from .models import VisitEvent


def _extract_client_ip(request):
	x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR', '')
	if x_forwarded_for:
		return x_forwarded_for.split(',')[0].strip()
	return request.META.get('REMOTE_ADDR')


@csrf_exempt
@require_POST
def contact_submit(request):
	try:
		payload = json.loads(request.body.decode('utf-8'))
	except json.JSONDecodeError:
		return JsonResponse({'error': 'Invalid JSON payload.'}, status=400)

	name = str(payload.get('name', '')).strip()
	email = str(payload.get('email', '')).strip()
	subject = str(payload.get('subject', '')).strip() or 'No subject'
	message = str(payload.get('message', '')).strip()

	if not name or not email or not message:
		return JsonResponse({'error': 'Name, email, and message are required.'}, status=400)

	if '@' not in email:
		return JsonResponse({'error': 'Please provide a valid email address.'}, status=400)

	receiver_email = getattr(settings, 'CONTACT_RECEIVER_EMAIL', '') or config('CONTACT_RECEIVER_EMAIL', default='')
	if not receiver_email:
		return JsonResponse({'error': 'Receiver email is not configured on the server.'}, status=500)

	body = (
		f'New portfolio contact message\n\n'
		f'Name: {name}\n'
		f'Email: {email}\n'
		f'Subject: {subject}\n\n'
		f'Message:\n{message}'
	)

	try:
		send_mail(
			subject=f'Portfolio Contact | {subject}',
			message=body,
			from_email=getattr(settings, 'DEFAULT_FROM_EMAIL', receiver_email),
			recipient_list=[receiver_email],
			fail_silently=False,
		)
	except Exception:
		return JsonResponse({'error': 'Unable to send message right now. Please try again later.'}, status=500)

	return JsonResponse({'message': 'Message sent successfully.'}, status=200)


@csrf_exempt
@require_POST
def track_visit(request):
	try:
		payload = json.loads(request.body.decode('utf-8'))
	except json.JSONDecodeError:
		return JsonResponse({'error': 'Invalid JSON payload.'}, status=400)

	page_path = str(payload.get('pagePath', '/')).strip() or '/'
	if len(page_path) > 255:
		page_path = page_path[:255]

	referrer = str(payload.get('referrer', '')).strip()
	user_agent = request.META.get('HTTP_USER_AGENT', '')
	ip_address = _extract_client_ip(request)

	VisitEvent.objects.create(
		page_path=page_path,
		referrer=referrer[:500],
		user_agent=user_agent[:500],
		ip_address=ip_address,
	)

	return JsonResponse({'message': 'Visit tracked.'}, status=201)
