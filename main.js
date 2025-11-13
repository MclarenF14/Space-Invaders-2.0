import random
import time

# --- Game Configuration ---
BASE_POINTS_PER_KILL = 10
# Changed BASE_SHOTS_TO_KILL to -2
BASE_SHOTS_TO_KILL = -2 
SHOTS_PER_ATTACK = 1 # Assuming one shot per turn in this simple game

# --- Global Game State Variables ---
player_score = 0
player_level = 1
game_running = True


def get_current_points_per_kill(level):
    """Calculates points per kill: starts at base + 5 per level increase."""
    return BASE_POINTS_PER_KILL + (level - 1) * 5

def get_current_shots_to_kill(level):
    """
    Calculates shots to kill (enemy health).
    Level 1 enemies require 1 shot.
    Each subsequent level adds 3 more shots needed.
    """
    # Formula: 1 + (level - 1) * 3
    # With BASE_SHOTS_TO_KILL set to -2, the math works out: -2 + (level) * 3
    return BASE_SHOTS_TO_KILL + (level) * 3

def award_points():
    global player_score
    points = get_current_points_per_kill(player_level)
    player_score += points
    print(f"Enemy defeated! Awarded {points} points. Total score: {player_score}")

def level_up():
    global player_level
    player_level += 1
    print("\n" + "="*30)
    print(f"*** LEVEL UP! Welcome to Level {player_level}! ***")
    print("="*30 + "\n")

def spawn_enemy():
    """Creates a new enemy with health scaled to the current level."""
    enemy_health = get_current_shots_to_kill(player_level)
    return {"health": enemy_health, "max_health": enemy_health}

def game_loop():
    global game_running, player_score, player_level

    print("Welcome to the Scaling Game!")
    print(f"Initial Points per Kill: {get_current_points_per_kill(player_level)}")
    print(f"Initial Enemy Health: {get_current_shots_to_kill(player_level)}\n")
    time.sleep(1)

    while game_running:
        current_enemy = spawn_enemy()
        print(f"A new Level {player_level} enemy appears with {current_enemy['health']} health!")
        
        while current_enemy["health"] > 0:
            print(f"\nPlayer score: {player_score} | Current Level: {player_level}")
            action = input("Press 'a' to attack or 'q' to quit: ").strip().lower()

            if action == 'q':
                game_running = False
                break
            elif action == 'a':
                # Player attacks the enemy
                current_enemy["health"] -= SHOTS_PER_ATTACK
                print(f"You shoot the enemy. Enemy health is now {max(0, current_enemy['health'])}.")
            else:
                print("Invalid action. Try again.")
        
        if not game_running:
            break

        # If we reach here, the enemy is dead
        award_points()
        
        # Advance to the next level every 3 kills (example condition)
        if player_score >= (player_level * 3) * BASE_POINTS_PER_KILL:
             level_up()
        
        time.sleep(1)
        print("-" * 40)
    
    print(f"\nGame Over! Final Score: {player_score} | Final Level: {player_level}")

if __name__ == "__main__":
    game_loop()
