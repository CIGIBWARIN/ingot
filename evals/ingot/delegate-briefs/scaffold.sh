g() { git -c user.name=t -c user.email=t@t "$@"; }
# Three real-sized projects, so splitting the work is worth it.
for p in shop blog notes; do
  mkdir -p $p/src
  for m in text money dates users store export; do
    cat > $p/src/$m.py <<P
"""$p: $m helpers."""

def ${m}_normalize(value):
    return str(value).strip().lower()

def ${m}_split(value, sep=","):
    return [v.strip() for v in str(value).split(sep) if v.strip()]

def ${m}_limit(items, n=10):
    return list(items)[:n]

def ${m}_key(value):
    return ${m}_normalize(value).replace(" ", "-")
P
  done
  echo "# $p" > $p/README.md
  (cd $p && git init -q -b main && g add -A && g commit -qm init)
done
# Another session's work in progress in blog, not committed yet.
cat >> blog/src/text.py <<'P'

def excerpt(text, n=40):
    return text[:n]
P
