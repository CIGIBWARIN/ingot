cat > project.godot <<'G'
config_version=5

[application]
config/name="Hopper"
run/main_scene="res://main.tscn"
config/features=PackedStringArray("4.3")
G
cat > player.gd <<'G'
extends CharacterBody2D

const SPEED = 200.0

func _physics_process(delta):
	var direction = Input.get_axis("ui_left", "ui_right")
	velocity.x = direction * SPEED
	if not is_on_floor():
		velocity += get_gravity() * delta
	move_and_slide()
G
