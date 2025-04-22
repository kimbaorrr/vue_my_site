# Sử dụng Node Alpine nhẹ
FROM node:lts-alpine AS build-stage

# Đặt thư mục làm việc
WORKDIR /app

# Copy file package.json và package-lock.json nếu có
COPY package*.json ./

# Cài đặt dependency
RUN npm install

# Copy source code vào container
COPY . .

# Build ứng dụng cho production
RUN npm run build

# Stage thứ hai chỉ dùng để serve file tĩnh
FROM node:lts-alpine AS production-stage

# Cài http-server
RUN npm install -g http-server

# Tạo thư mục app
WORKDIR /app

# Copy thư mục dist từ stage build
COPY --from=build-stage /app/dist ./dist

# Mở port 8080
EXPOSE 8080

# Dùng http-server với fallback để hỗ trợ history mode
CMD [ "http-server", "dist", "--port", "8080", "--spa" ]
