from django.core.exceptions import ValidationError

def validate_players(value):
    # Check if the value is a list
    if not isinstance(value, list):
        raise ValidationError("Players must be a list.")
    if len(value) > 20: 
        raise ValidationError("Players list cannot contain more than 20 items.")
    for name in value:
        if not isinstance(name, str):
            raise ValidationError("Each player name must be a string.")
        
        trimmed_name = name.strip()
        if len(trimmed_name)< 1 or len(trimmed_name) > 80:
            raise ValidationError("Each player name must be between 1 and 80 characters long.")
        
def validate_title(value):
    if len(value.strip())< 1:
        raise ValidationError("Title must be at least 1 character long.")