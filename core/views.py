from django.shortcuts import render
from django.http import FileResponse
from .models import SharedFile
import random, string, zipfile, os
from django.conf import settings

def generate_unique_code():
    while True:
        code = ''.join(random.choices(string.digits, k=5))
        if not SharedFile.objects.filter(code=code).exists():
            return code

def home(request):
    return render(request, "home.html")

def upload_file(request):
    if request.method == "POST":
        files = request.FILES.getlist('files')
        code = generate_unique_code()

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

        if files.first().is_expired():
            files.delete()
            return render(request, "receive.html", {"error": "Code expired"})

        return render(request, "download.html", {"code": code})

    return render(request, "receive.html")

def download_file(request, code):
    files = SharedFile.objects.filter(code=code)

    if not files.exists():
        return render(request, "receive.html", {"error": "Invalid or expired code"})

    if files.first().is_expired():
        files.delete()
        return render(request, "receive.html", {"error": "Code expired"})

    # Single file
    if len(files) == 1:
        file_path = files[0].file.path
        response = FileResponse(open(file_path, 'rb'), as_attachment=True)
        files.delete()  # deletes DB + disk
        return response

    # Multiple → zip
    zip_path = os.path.join(settings.MEDIA_ROOT, f"{code}.zip")
    with zipfile.ZipFile(zip_path, 'w') as zipf:
        for f in files:
            zipf.write(f.file.path, os.path.basename(f.file.path))

    response = FileResponse(open(zip_path, 'rb'), as_attachment=True)

    files.delete()  # delete originals

    return response
