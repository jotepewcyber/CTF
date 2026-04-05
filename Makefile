# =========================
# Docker Shortcuts
# =========================

up:
	docker compose up

build:
	docker compose build

build-no-cache:
	docker compose build --no-cache

down:
	docker compose down

down-v:
	docker compose down -v

restart:
	docker compose down
	docker compose up --build

logs:
	docker compose logs -f

ps:
	docker compose ps


# =========================
# Django Commands
# =========================

migrate:
	docker compose exec backend python manage.py migrate

makemigrations:
	docker compose exec backend python manage.py makemigrations

superuser:
	docker compose exec backend python manage.py createsuperuser

shell:
	docker compose exec backend python manage.py shell

backend-bash:
	docker compose exec backend bash

db-bash:
	docker compose exec db bash

frontend-bash:
	docker compose exec frontend sh


# =========================
# Clean Everything
# =========================

clean:
	docker compose down -v
	docker builder prune -af