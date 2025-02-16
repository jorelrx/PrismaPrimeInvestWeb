FROM node:20 AS builder
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

FROM node:20 AS runner
WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY package.json package-lock.json ./

RUN npm install --production --legacy-peer-deps

EXPOSE 3000

CMD ["npm", "run", "start"]
