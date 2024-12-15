### Lệnh build image docker

docker build -t <tên image> <đường dẫn tới dockerfile> // . nếu ở cùng folder

### Tạo container

docker run -d -p 3070:3069 --name cyber_media cyber_media:latest

### Kiểm tra image list

docker images hoặc docker image ls

### Stop container

docker container stop <tên container hoặc id container>

### Xóa container

docker container remove <tên image hoặc id image>

### Xóa image cũ

docker image remove <tên image hoặc id image>
alias: docker rmi <tên image hoặc id image>

### Kiểm tra container đang chạy

docker ps

### Kiểm tra thư mục

ls -la

### Docker:

docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' id_name_container

### Tạo docker compose (Phải có file docker-compose.yml)

docker compose up -d

### Đánh tag trước khi push lên dockerhub đúng account nào cần đẩy lên

docker tag cyber_media ngynbao/cyber_media

docker push ngynbao/cyber_media
