from django.db import models
from general.models import BaseModel


class Payment(BaseModel):
    session_id = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_status = models.CharField(max_length=255)
    currency = models.CharField()

    def __str__(self):
        return f"Payment for session ID: {self.payment_status}"
