from django.db import models
import uuid


class BaseModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False )
    auto_id = models.PositiveIntegerField(db_index=True,unique=True, null=True, blank=True)
    date_added = models.DateTimeField(db_index=True,auto_now_add=True)
    date_updated = models.DateTimeField(auto_now_add=True)
    is_deleted = models.BooleanField(default=False)
    creator = models.IntegerField(null=True, blank=True)
    updater = models.IntegerField(null=True, blank=True)
    class Meta:
        abstract = True