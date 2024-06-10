# 베이스 이미지 선택
FROM node:20 AS build-stage

# 앱 디렉토리 생성
WORKDIR /usr/src/app

# 패키지 파일 복사 및 종속성 설치
COPY package*.json ./
RUN yarn

# 애플리케이션 소스 복사
COPY . .

# 빌드 명령어
RUN yarn build

# nginx 설치 및 설정 파일 복사
FROM nginx:alpine
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
