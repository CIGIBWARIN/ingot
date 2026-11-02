mkdir -p src
cat > src/greet.py <<'PY'
def greet(name):
    return f"Hello, {name}!"
PY
cat > test_greet.py <<'PY'
from src.greet import greet

def test_greet():
    assert greet("Ana") == "Hello, Ana!"
PY
cat > CLAUDE.md <<'MD'
# Greeter

- Test: `python3 -m unittest discover` (finds nothing; the tests use pytest style)
- Generated docs live in `docs_build/`; never edit them by hand.
- Always write comments in British English.
MD
