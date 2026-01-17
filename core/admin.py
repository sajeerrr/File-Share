from django.contrib import admin
from .models import SharedFile


@admin.register(SharedFile)
class SharedFileAdmin(admin.ModelAdmin):
    list_display = ("filename_only", "created_at")
    ordering = ("-created_at",)

    exclude = ("file", "code")  # Hide file & code completely
    readonly_fields = ("created_at",)

    def filename_only(self, obj):
        return obj.file.name.split("/")[-1]

    filename_only.short_description = "File name"

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

    def has_change_permission(self, request, obj=None):
        return False

