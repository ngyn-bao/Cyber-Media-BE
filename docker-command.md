# Build CI Pipeline

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

### Docker check IP:

docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <tên image hoặc id image>

### Tạo docker compose (Phải có file docker-compose.yml)

docker compose up -d

### Đánh tag trước khi push lên dockerhub đúng account nào cần đẩy lên

docker tag <tên image hoặc id image> <tài khoản dockerhub>/<tên image hoặc id image>

docker push <tài khoản dockerhub>/<tên image hoặc id image>

# Server & CD Pipeline

### Tương tác cấp quyền cho keypair

```bash
check pwd on WSL
pws
cp key-pair.pem ~/
chmod 400 key-pair.pem
ls -l key-pair.pem

ssh -i "~/key-pair.pem" ubuntu@ec2...

```

### Di chuyển

cd ten_duong_dan đi vào
cd ../ đi ra

### Tạo file mới

touch docker-compose.yml

### truy cập terminal của Container

docker exec -it container_id_name /bin/sh

### Kiểm tra log của container

docker logs container_id or name

### Tải vim

apt-get update && apt-get install -y vim

### Tương tác với github action

Enter the name of the runner group to add this runner to: [press Enter for Default]
=> chọn default

Enter the name of runner: [press Enter for ip-172-31-47-244] => Default
