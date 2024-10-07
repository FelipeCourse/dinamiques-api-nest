FROM node:18-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

COPY src/shared/infrastructure/database/prisma/schema.prisma ./prisma/schema.prisma
COPY src/shared/infrastructure/database/prisma/migrations ./prisma/migrations
COPY src/shared/infrastructure/database/prisma/seeds/seed.mjs ./prisma/seeds/seed.mjs

RUN npx prisma generate --schema=./prisma/schema.prisma

RUN npm run build

FROM node:18-alpine AS runner

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/prisma ./prisma
COPY entrypoint.sh .

ENV NODE_ENV=production

EXPOSE 3000

USER appuser

CMD ["sh", "-c", "./entrypoint.sh && node dist/main.js"]
