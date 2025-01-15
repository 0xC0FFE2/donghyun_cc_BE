#Build Stage
FROM node:20-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

#Prod Stage
FROM node:20-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist /usr/src/app/dist
COPY --from=builder /usr/src/app/node_modules /usr/src/app/node_modules
COPY --from=builder /usr/src/app/package.json /usr/src/app/package.json
COPY --from=builder /usr/src/app/package-lock.json /usr/src/app/package-lock.json


CMD ["npm", "start"]
EXPOSE 3000
