
FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

# Generate the Prisma Client before compiling TypeScript.
RUN DATABASE_URL="mysql://build:build@localhost:3306/build_db" npx prisma generate

EXPOSE 5000

CMD ["npm", "start"]
