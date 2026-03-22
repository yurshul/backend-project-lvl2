install:
	npm ci

gendiff:
	node bin/gendiff.js -h

review: lint-fix test
	git status

test:
	npx jest

test-coverage:
	npx jest --coverage

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

publish:
	npm publish --dry-run