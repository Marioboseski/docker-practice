## Development Setup

### 1. Configure environment variables

Create a `.env` file in the project root using `.env.example` as a template. Set your local database passwords.

### 2. Start the application

```bash
docker compose up -d --build
```

### 3. Seed the database

```bash
docker compose exec backend npx prisma db seed
```

### 4. Test the API

- Products: `http://localhost:5000/api/products`
- Categories: `http://localhost:5000/api/categories`