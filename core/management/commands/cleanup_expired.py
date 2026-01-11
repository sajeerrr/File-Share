from django.core.management.base import BaseCommand
from core.models import SharedFile

class Command(BaseCommand):
    help = "Delete expired shared files"

    def handle(self, *args, **kwargs):
        expired = []
        for f in SharedFile.objects.all():
            if f.is_expired():
                expired.append(f.id)

        SharedFile.objects.filter(id__in=expired).delete()
        self.stdout.write(f"Deleted {len(expired)} expired files")
