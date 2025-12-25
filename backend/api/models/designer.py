from django.db import models


class Designer(models.Model):
    """Model to store designer information"""
    
    # About Us Section
    about_us = models.TextField(blank=True, null=True)
    
    # Details Section
    services_provided = models.TextField(blank=True, null=True, help_text="Services Provided")
    areas_served = models.TextField(blank=True, null=True, help_text="Areas Served")
    professional_information = models.TextField(blank=True, null=True, help_text="Professional Information")
    category = models.CharField(max_length=255, blank=True, null=True, help_text="Category")
    
    # Business Details
    business_name = models.CharField(max_length=255, blank=True, null=True)
    phone_number = models.CharField(max_length=50, blank=True, null=True)
    website = models.CharField(max_length=255, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    additional_addresses = models.TextField(blank=True, null=True)
    typical_job_cost = models.CharField(max_length=255, blank=True, null=True)
    followers = models.CharField(max_length=100, blank=True, null=True)
    socials = models.TextField(blank=True, null=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'designers'
        ordering = ['-created_at']
        verbose_name = 'Designer'
        verbose_name_plural = 'Designers'
    
    def __str__(self):
        return self.business_name or f"Designer #{self.id}"

