upstream backend {
    server fastapi-backend.web.svc.cluster.local:8000; # Kubernetes 서비스 이름
    keepalive 32;
    keepalive_requests 10000;
    keepalive_timeout 65;
}

server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;

    #access_log  /var/log/nginx/host.access.log  main;

    proxy_buffer_size 128k;
    proxy_buffers 4 256k;
    proxy_busy_buffers_size 256k;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
        try_files $uri $uri/ /index.html;  # React Router를 위한 설정
    }

    # FastAPI 백엔드로 프록시
    location /api {
        proxy_pass http://backend; 
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        # 타임아웃 설정
        proxy_connect_timeout 60s;
        proxy_send_timeout 120s;
        proxy_read_timeout 120s;

        # 에러 처리와 재시도
        proxy_next_upstream error timeout http_502;
        proxy_next_upstream_tries 3;
        
        # 버퍼 설정
        proxy_buffering on;
        proxy_buffer_size 128k;
        proxy_buffers 4 256k;
        proxy_busy_buffers_size 256k;
    }
}