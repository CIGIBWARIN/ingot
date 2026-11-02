cat > greet.py <<'PY'
def greet(name):
    return f"Hello, {name}!"


if __name__ == "__main__":
    print(greet("Ana"))
PY
mkdir -p .claude
echo '{"env": {"INGOT_COACH": "light"}}' > .claude/settings.json
