from django.contrib import admin

from games.models import Game

# Register your models here.
class GameAdmin(admin.ModelAdmin):
    list_display = ('title', 'owner', 'status', 'created_at', 'updated_at')
    search_fields = ('title', 'owner__username', 'status')
    list_filter = ('status',)
    
admin.site.register(Game, GameAdmin)