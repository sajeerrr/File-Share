from django.db import models
from django.utils import timezone
import os
from django.db.models.signals import post_delete
from django.dispatch import receiver

class SharedFile(models.Model):
    code = models.CharField(max_length=5, db_index=True)  # ❗ NO unique
    file = models.FileField(upload_to='uploads/')
    created_at = models.DateTimeField(auto_now_add=True)

    def is_expired(self):
        return timezone.now() > self.created_at + timezone.timedelta(minutes=5)

@receiver(post_delete, sender=SharedFile)
def delete_file_from_disk(sender, instance, **kwargs):
    if instance.file:
        try:
            if os.path.isfile(instance.file.path):
                os.remove(instance.file.path)
        except:
            pass
