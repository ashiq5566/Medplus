from django.contrib import admin
from .models import Payment

class PaymentAdmin(admin.ModelAdmin):
    list_display = ('amount', 'payment_status','currency')
    search_fields = ('amount', 'payment_status')
admin.site.register(Payment, PaymentAdmin)
