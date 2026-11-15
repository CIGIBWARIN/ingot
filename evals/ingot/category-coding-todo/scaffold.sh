mkdir -p .claude && echo '{"env":{"INGOT_CATEGORY":"coding"}}' > .claude/settings.json
git init -q && git config user.email dev@example.com && git config user.name Dev
printf '# TODO\n- [ ] Add a footer with the copyright year to index.html\n- [ ] Add an about page\n' > TODO.md
printf '<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><title>Home</title></head>\n<body><h1>Welcome</h1></body></html>\n' > index.html
git add -A && git commit -qm "first version"
