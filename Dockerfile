# Chọn thư viện NodeJS để chạy dự án trên môi trường internet
FROM node:22.9.0

# thiết lập thư mục trên production để làm việc
WORKDIR /home/cyber_app

# Copy các file package.json và package-lock.json vào image
COPY package.json package-lock.json ./

# Tải các thư viện Nodemodule trong dự án về
RUN npm install --timeout=300000
# 5p * 60s * 1000ms = 300000

# Sao chép các file code còn lại vào image
COPY . .

# Khởi tạo lại các object từ prisma
RUN npx prisma generate

#Mở cổng 3069
EXPOSE 3069

# Chạy ứng dụng
CMD [ "npm", "run", "start" ]