from django.db import models


class Image(models.Model):
    """Model to store project images"""
    
    project = models.ForeignKey(
        'Project',
        on_delete=models.CASCADE,
        related_name='images',
        help_text="Project this image belongs to"
    )
    
    image_id = models.CharField(max_length=100, db_index=True)
    title = models.CharField(max_length=500, blank=True, null=True)
    image_url = models.URLField(max_length=500)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'images'
        ordering = ['-created_at']
        verbose_name = 'Image'
        verbose_name_plural = 'Images'
        indexes = [
            models.Index(fields=['image_id']),
            models.Index(fields=['project', '-created_at']),
        ]
        unique_together = [['project', 'image_id']]
    
    def __str__(self):
        return self.title or f"Image #{self.image_id}"

