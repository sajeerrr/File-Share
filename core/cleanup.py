import threading
import time
from django.utils import timezone
from .models import SharedFile

def background_cleaner():
    while True:
        expired_files = SharedFile.objects.filter(
            created_at__lt=timezone.now() - timezone.timedelta(minutes=5)
        )

        for f in expired_files:
            f.delete()  # also deletes file from disk via signal

        time.sleep(60)  # run every 1 minute


def start_background_cleaner():
    thread = threading.Thread(target=background_cleaner, daemon=True)
    thread.start()
