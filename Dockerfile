FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

# Prisma Client生成
RUN npx prisma generate

COPY . .

CMD ["npm", "run", "dev"]
