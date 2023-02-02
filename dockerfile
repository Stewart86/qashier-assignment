FROM node:latest as builder

WORKDIR /vue-ui

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build


FROM nginx:alpine as production-build
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /vue-ui/dist /usr/share/nginx/html

EXPOSE 8000
ENTRYPOINT ["nginx", "-g", "daemon off;"]