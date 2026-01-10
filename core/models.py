from django.db import models

class SharedFile(models.Model):
    code = models.CharField(max_length=5, unique=True)
    file = models.FileField(upload_to="uploads/")
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.code