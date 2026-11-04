cat > index.html <<'H'
<!doctype html>
<html><head><title>Acme</title><link rel="stylesheet" href="style.css"></head>
<body><h1>Acme Tools</h1><p>Hand-made tools since 1952.</p><a href="contact.html">Contact us</a></body></html>
H
cat > style.css <<'C'
body { font-family: Arial; background: #fff; color: #000; }
C
cat > app.py <<'P'
def total(prices):
    return sum(prices)
P
git init -q -b main && git -c user.name=t -c user.email=t@t add -A && git -c user.name=t -c user.email=t@t commit -qm init
# Another session's work in progress, not committed yet.
cat >> app.py <<'P'

def total_with_tax(prices, rate):
    return total(prices) * (1 + rate)
P
