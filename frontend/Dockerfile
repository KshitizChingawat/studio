FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ENV PORT=3000
ENV API_BASE_URL=http://backend:4000
ENV NEXT_PUBLIC_API_URL=http://localhost:4000

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
