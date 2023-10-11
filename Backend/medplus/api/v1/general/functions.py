from django.conf import settings
import random
import string
from random import randint
# from accounts.models import User


def get_auto_id(model_class):
    last_activity = model_class.objects.order_by('-auto_id').first()
    return 1 if not last_activity else last_activity.auto_id + 1