# Unite Backend (TypeScript)

- Node.js + TypeScript, Express, MongoDB (Mongoose)
- JWT auth and RBAC
- Leads CRUD with duplicate prevention
- Call tasks with idempotency
- CSV worker (Bull + Redis) for imports
- S3 presigned upload stub and notifier stubs (SNS/Twilio)
- Dockerfile + docker-compose with app, mongo, redis, worker, seed

How to run:
1. `docker compose up --build`
2. The `seed` service will run once to populate sample data.
3. App dev server available at http://localhost:4000 (hot reload with ts-node-dev).


## Running tests inside Docker Compose

To run the test suite using the real MongoDB instance in docker-compose:

1. Build and start services (this will not run tests yet):
   docker compose up --build -d mongo redis

2. Run the test service (it depends on mongo being healthy):
   docker compose run --rm test

Or run both build and test in one command:
   docker compose up --build --abort-on-container-exit test

The test service runs `npm run build && npm run dev` and exits with the test result code.
for frontend run `serve frontend` on another terminal

NOTE:
Use login id: test@example.com
password: Password123!