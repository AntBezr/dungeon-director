import uuid

from django.conf import settings

from django.db import models

from django.core.exceptions import ValidationError
from .validators import validate_players, validate_title

# Create your models here.
class Game(models.Model):
    
    class Status(models.TextChoices):
        DRAFT = 'draft', 'Draft'
        ACTIVE = 'active', 'Active'
        PAUSED = 'paused', 'Paused'
        COMPLETED = 'completed', 'Completed'
    
    id = models.UUIDField( default=uuid.uuid4, primary_key=True, editable=False)
    owner = models.ForeignKey( settings.AUTH_USER_MODEL, on_delete=models.CASCADE,related_name="games")
    title = models.CharField(max_length=150, validators=[validate_title])
    description = models.TextField( blank=True, default='')
    start_date = models.DateField( blank=True, null=True)
    status = models.CharField( max_length=20, choices=Status.choices, default=Status.DRAFT)
    players= models.JSONField(default=list, blank=True, validators=[validate_players])
    created_at = models.DateTimeField(auto_now_add=True )
    updated_at = models.DateTimeField(auto_now=True)
    
    def clean(self):
        super().clean()
        if not isinstance(self.players, list):
            raise ValidationError({'players': "Players must be a list. Empty list is allowed []."})

    def __str__(self):
        return self.title