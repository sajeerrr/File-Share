from django.shortcuts import render
from django.http import FileResponse
from .models import SharedFile
import random, string, zipfile, os
from django.conf import settings

def generate_code():
    return ''.join(random.choices(string.digits, k=5))

def home(request):
    return render(request, "home.html")

def upload_file(request):
    if request.method == "POST":
        files = request.FILES.getlist('files')
        code = generate_code()

        for f in files:
            SharedFile.objects.create(code=code, file=f)

        return render(request, "show_code.html", {"code": code})

    return render(request, "upload.html")

def receive_file(request):
    if request.method == "POST":
        code = request.POST.get("code")
        files = SharedFile.objects.filter(code=code)

        if not files.exists():
            return render(request, "receive.html", {"error": "Invalid Code"})

        return render(request, "download.html", {"code": code})

    return render(request, "receive.html")

def download_file(request, code):
    files = SharedFile.objects.filter(code=code)

    if len(files) == 1:
        file = files[0].file.path
        return FileResponse(open(file, 'rb'), as_attachment=True)

    zip_path = os.path.join(settings.MEDIA_ROOT, f"{code}.zip")
    zipf = zipfile.ZipFile(zip_path, 'w')

    for f in files:
        zipf.write(f.file.path, os.path.basename(f.file.path))
    zipf.close()

    return FileResponse(open(zip_path, 'rb'), as_attachment=True)
