# YT-GENAI

React frontend and Express/MongoDB backend. Authentication currently supports registration, login, profile and logout.

## Local setup

1. Install Node.js 24 and MongoDB.
2. Run `npm ci --prefix Backend` and `npm ci --prefix Frontend`.
3. Copy `Backend/.env.example` to `Backend/.env`. Set your MongoDB URI and a new random JWT secret of at least 32 characters; never commit this file.
4. In separate terminals run `npm run dev --prefix Backend` and `npm run dev --prefix Frontend`.

## Production

Build with `npm run build --prefix Frontend` and start with `npm start --prefix Backend`. The backend serves the frontend build and API on the same origin. The included Render blueprint is a deployment configuration, not a live deployment. Supply a dedicated MongoDB URI through your hosting provider's secret settings. Rotate any credentials previously committed to Git history.

## Testing

GitHub Actions uses a separate MongoDB service. To run the integration test locally, set MONGO_TEST_URI to a dedicated local test MongoDB instance and run `npm test --prefix Backend`. The test creates and removes a randomly named test database.
