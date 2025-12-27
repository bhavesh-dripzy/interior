from django.db import models


class Project(models.Model):
    """Model to store project information"""
    
    designer = models.ForeignKey(
        'Designer',
        on_delete=models.CASCADE,
        related_name='projects',
        help_text="Designer who created this project"
    )
    
    # Project Basic Info
    project_id = models.CharField(max_length=100, unique=True, db_index=True)
    url = models.URLField(max_length=500, blank=True, null=True)
    image = models.URLField(max_length=500, blank=True, null=True, help_text="Project thumbnail image")
    title = models.CharField(max_length=255, blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    photos = models.CharField(max_length=50, blank=True, null=True, help_text="Number of photos as string")
    
    # Project Details
    project_title = models.CharField(max_length=255, blank=True, null=True)
    project_cost = models.CharField(max_length=255, blank=True, null=True)
    image_count = models.IntegerField(default=0, help_text="Total number of images in this project")
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'projects'
        ordering = ['-created_at']
        verbose_name = 'Project'
        verbose_name_plural = 'Projects'
        indexes = [
            models.Index(fields=['project_id']),
            models.Index(fields=['designer', '-created_at']),
        ]
    
    def __str__(self):
        return self.project_title or self.title or f"Project #{self.project_id}"

