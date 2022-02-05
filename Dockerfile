FROM node:10.13-alpine
ENV NODE_ENV production
WORKDIR /app
COPY . /app
COPY package.json /app
RUN npm install --production --silent && mv node_modules ../
COPY . /app
EXPOSE 3000
CMD npm start