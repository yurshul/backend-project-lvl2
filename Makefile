install:
	npm ci

gendiff:
	node bin/gendiff.js

status: lint
	git status

lint: 
	npx eslint . --fix

publish:
	npm publish --dry-run