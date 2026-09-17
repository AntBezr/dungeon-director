from django.test import TestCase
from django.core.exceptions import ValidationError
from django.test import SimpleTestCase
from .validators import validate_players

from django.contrib.auth import get_user_model
from .models import Game

class GameModelTests(TestCase):
    #Before each test, create a user to be the owner of the game
    def setUp(self):
        # Get the custom user model
        User = get_user_model()
        # Create a test user for testing purposes 
        self.owner = User.objects.create_user(username='testuser')
    
    def test_full_clean_rejects_number_in_players(self):
        game = Game(owner=self.owner, title='Test Game', players=["Anna", 3])
        with self.assertRaises(ValidationError) as error:
            game.full_clean()  # Call full_clean() to trigger model validation
        self.assertIn('players', error.exception.message_dict)
    
    def test_full_clean_rejects_empty_dictionary(self):
        # Create a Game instance with an empty dictionary for players
        game = Game(owner=self.owner, title='Test Game', players={})
        #Expect a ValidationError to be raised when calling full_clean() because players is not a list
        with self.assertRaises(ValidationError) as error:
            # Call full_clean() to trigger model validation
            game.full_clean() 
        # Make sure the error message contains the expected message about players needing to be a list
        self.assertIn('players', error.exception.message_dict)
        
    # Test that a valid Game instance can be saved successfully
    def test_saves_valid_game(self):
        game = Game(owner=self.owner, title="Trial", players=["Anna"])
        game.full_clean() # Should not raise ValidationError
        game.save()
        saved_game = Game.objects.get(pk=game.id)
        self.assertEqual(saved_game.players, ["Anna"])
        self.assertEqual(saved_game.owner_id, self.owner.pk)
        
    def test_saves_different_uuid_for_each_game(self):
        game1=Game(owner=self.owner, title="Trial", players=["Anna"])
        game2=Game(owner=self.owner, title="Trial2", players=["Bob"])
        game1.full_clean()
        game2.full_clean()
        game1.save()
        game2.save()
        self.assertNotEqual(game1.id, game2.id)
        
    def test_add_player_to_game(self):
        game1=Game(owner=self.owner, title="Trial", players=["Anna"])
        game2=Game(owner=self.owner, title="Trial2", players=["Bob"])
        game1.full_clean()
        game2.full_clean()
        game1.save()
        game2.save()
        # Add a new player to game1
        game1.players.append("Charlie")
        game1.full_clean()  # Validate the updated game1 instance
        game1.save()  # Save the updated game1 instance
        # Retrieve the updated game1 instance from the database
        updated_game1 = Game.objects.get(pk=game1.id)
        self.assertEqual(updated_game1.players, ["Anna", "Charlie"])
        game2.refresh_from_db()
        self.assertEqual(game2.players, ["Bob"])  # Ensure game2 remains unchanged
        
    def test_default_players_list_are_independent(self):
        game1=Game(owner=self.owner, title="Trial1")
        game2=Game(owner=self.owner, title="Trial2")
        game1.full_clean()
        game2.full_clean()
        self.assertIsNot(game1.players, game2.players)  # Ensure they are different list objects
        game1.players.append("Anna")
        self.assertEqual(game1.players, ["Anna"])
        self.assertEqual(game2.players, [])  # Ensure game2's players list remains unchanged
        
    def test_space_title_rejected(self):
        game = Game(owner=self.owner, title="            ", players=["Anna"])
        with self.assertRaises(ValidationError) as error:
            game.full_clean()
            self.assertIn("title", error.exception.message_dict)
        
# Collect all the tests for the players validator in one class
class PlayersValidatorTests(SimpleTestCase):
    
    def test_rejects_numbers_in_players_list(self):
        with self.assertRaises(ValidationError):
            validate_players(["Anna", 3])  # List of numbers instead of strings
    def test_rejects_empty_string_in_players_list(self):
        with self.assertRaises(ValidationError):
            validate_players(["Anna", ""])  # Empty string in the list
    def test_rejects_long_names_in_players_list(self):
        with self.assertRaises(ValidationError):
            validate_players(["Anna", "A" * 81])  # Name longer than 80 characters
    def test_rejects_non_list_input(self):
        with self.assertRaises(ValidationError):
            validate_players("Anna, Bob")  # Not a list
    def test_rejects_too_many_players(self):
        with self.assertRaises(ValidationError):
            validate_players(["Player" + str(i) for i in range(21)])  # More than 20 players
    def test_accepts_valid_players_20_players_list(self):
            validate_players(["Player" + str(i) for i in range(20)])  # Valid list of player names
    def test_accepts_valid_players_list(self):
            validate_players(["Anna", "Bob", "Charlie"])  # Valid list of player names
    def test_accepts_empty_list(self):
        try:
            validate_players([])  # Empty list
        except ValidationError:
            self.fail("validate_players() raised ValidationError unexpectedly!")
