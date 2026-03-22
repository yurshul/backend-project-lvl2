install:
	npm ci

gendiff:
	node bin/gendiff.js

status: lint
	git status

test:
	npx jest

lint: 
	npx eslint . --fix

publish:
	npm publish --dry-run