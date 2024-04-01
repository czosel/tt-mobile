SHELL:=/bin/sh

include .env

.DEFAULT_GOAL := help

.PHONY: help
help: ## Show the help messages
        @grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort -k 1,1 | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'


.PHONY: dump
dump:
	docker-compose exec db mysqldump --password=$(DB_PASSWORD) db > dump.sql

.PHONY: load
load:
	cat dump.sql | docker exec -i tt-mobile_db_1 mysql --password=$(DB_PASSWORD) db

.PHONY: dbshell-mysql
dbshell-mysql:
	docker-compose exec db mysql -u ttmobile --password=$(DB_PASSWORD) db

.PHONY: dbshell
dbshell: ## Start an interactive psql shell
	@docker compose exec postgres psql -Uadmin postgres
