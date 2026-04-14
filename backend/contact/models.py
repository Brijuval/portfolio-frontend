from django.db import models


class VisitEvent(models.Model):
	page_path = models.CharField(max_length=255)
	referrer = models.CharField(max_length=500, blank=True)
	user_agent = models.CharField(max_length=500, blank=True)
	ip_address = models.GenericIPAddressField(null=True, blank=True)
	created_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		ordering = ('-created_at',)

	def __str__(self):
		return f'{self.page_path} @ {self.created_at:%Y-%m-%d %H:%M:%S}'
