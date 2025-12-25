from django.contrib import admin
from .models import Designer, Project, Image


@admin.register(Designer)
class DesignerAdmin(admin.ModelAdmin):
    list_display = ['id', 'business_name', 'category', 'phone_number', 'website', 'created_at']
    list_filter = ['category', 'created_at']
    search_fields = ['business_name', 'phone_number', 'website', 'address']
    readonly_fields = ['created_at', 'updated_at']
    fieldsets = (
        ('Basic Information', {
            'fields': ('business_name', 'category', 'phone_number', 'website')
        }),
        ('Address', {
            'fields': ('address', 'additional_addresses')
        }),
        ('About', {
            'fields': ('about_us', 'professional_information')
        }),
        ('Details', {
            'fields': ('services_provided', 'areas_served', 'typical_job_cost', 'followers', 'socials')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


class ImageInline(admin.TabularInline):
    model = Image
    extra = 0
    readonly_fields = ['image_id', 'title', 'image_url', 'created_at']
    fields = ['image_id', 'title', 'image_url']
    can_delete = True


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['project_id', 'project_title', 'title', 'designer', 'location', 'image_count', 'created_at']
    list_filter = ['designer', 'created_at', 'location']
    search_fields = ['project_id', 'project_title', 'title', 'location']
    readonly_fields = ['created_at', 'updated_at']
    raw_id_fields = ['designer']
    inlines = [ImageInline]
    fieldsets = (
        ('Project Information', {
            'fields': ('designer', 'project_id', 'project_title', 'title', 'location')
        }),
        ('Project Details', {
            'fields': ('url', 'image', 'photos', 'project_cost', 'image_count')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    list_display = ['image_id', 'title', 'project', 'created_at']
    list_filter = ['project', 'created_at']
    search_fields = ['image_id', 'title', 'image_url']
    readonly_fields = ['created_at', 'updated_at']
    raw_id_fields = ['project']
    fieldsets = (
        ('Image Information', {
            'fields': ('project', 'image_id', 'title', 'image_url')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
