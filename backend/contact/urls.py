from django.urls import path

from .views import contact_submit, track_visit

urlpatterns = [
    path('', contact_submit, name='contact-submit'),
    path('track-visit/', track_visit, name='track-visit'),
]
