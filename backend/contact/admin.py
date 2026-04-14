from django.contrib import admin
from .models import VisitEvent


@admin.register(VisitEvent)
class VisitEventAdmin(admin.ModelAdmin):
	list_display = ('created_at', 'page_path', 'ip_address', 'referrer_short')
	list_filter = ('created_at', 'page_path')
	search_fields = ('page_path', 'ip_address', 'referrer', 'user_agent')
	readonly_fields = ('created_at', 'page_path', 'referrer', 'user_agent', 'ip_address')

	def has_add_permission(self, request):
		return False

	def referrer_short(self, obj):
		return (obj.referrer[:70] + '...') if len(obj.referrer) > 70 else obj.referrer

	referrer_short.short_description = 'referrer'
