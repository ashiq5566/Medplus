from django.contrib import admin
from .models import Payment

class PaymentAdmin(admin.ModelAdmin):
    list_display = ('session_id', 'amount', 'payment_status')
    search_fields = ('amount', 'payment_status')
admin.site.register(Payment, PaymentAdmin)
