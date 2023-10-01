.DEFAULT_GOAL := help
.PHONY: help
SHELL := /bin/bash

COLOR_OFF=\033[0m
COLOR_DANGER=\033[0;31m
COLOR_SUCCESS=\033[0;32m
COLOR_WARNING=\033[0;33m

DOCKER_COMPOSE_CMD := @docker compose
CMD_WEB_SERVICE := @docker compose exec node

help:
	@printf "Available commands of the service:\n"
	@grep -E '^[a-zA-Z-]+:[a-zA-Z -]*##.*$$' Makefile | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "${COLOR_SUCCESS}%-30s${COLOR_OFF} %s\n", $$1, $$2}'

run: ## [r] Run project
	@printf "${COLOR_WARNING}Starting services...${COLOR_OFF}\n"
	$(DOCKER_COMPOSE_CMD) up -d --build
r: run
up: run

logs: ## [l] Show service logs
	$(DOCKER_COMPOSE_CMD) logs -f
l: logs

console: ## [c] Open environment console
	$(CMD_WEB_SERVICE)  bash
c: console

down: ## [d] Stop project
	@printf "${COLOR_WARNING}Stopping services...${COLOR_OFF}\n"
	$(DOCKER_COMPOSE_CMD) down
d: down

generate-schema-migration: ## [gsm] Generate migration based on schema changes (e.g. "make gsm name=MigrationName")
	@printf "${COLOR_WARNING}Generating migration based on schema changes...${COLOR_OFF}\n"
	$(CMD_WEB_SERVICE) npm run typeorm:ts migration:generate src/Database/Migration/${name}
gsm: generate-schema-migration

run-migrations: ## [m] Run migrations
	@printf "${COLOR_WARNING}Running migrations...${COLOR_OFF}\n"
	$(CMD_WEB_SERVICE) npm run typeorm:ts migration:run
m: run-migrations
