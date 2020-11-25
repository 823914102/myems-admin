# MyEMS Admin

## Introduction
MyEMS 系统管理面板，用于项目配置和系统管理
Providing admin panel  for MyEMS system administration and configuration

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/f4c68eda47ba45948809f3f42ce8d82e)](https://app.codacy.com/gh/myems/myems-admin?utm_source=github.com&utm_medium=referral&utm_content=myems/myems-admin&utm_campaign=Badge_Grade)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/myems/myems-admin/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/myems/myems-admin/?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/4ece07b4f1e10b578277/maintainability)](https://codeclimate.com/github/myems/myems-admin/maintainability)

## Prerequisites
nginx-1.18.0 or later


## Installation

* Install NGINX  Server

refer to http://nginx.org/en/docs/install.html

* Configure NGINX
```
    $ sudo nano /etc/nginx/nginx.conf
```
-- Add another new 'server' section, add values as below:
    server {
        listen                 8001;
        server_name     myems-admin;
        location / {
            root    /var/www/html/admin;
            index index.html index.htm;
        }
        -- to avoid CORS issue, use Nginx to proxy myems-api to path /api with the same ip and port as myems-web
        -- Add another location /api in 'server ' to proxy requests to myems-api, replace the example address http://127.0.0.1:8000/ with actual url  of myems-api:
        location /api {
            proxy_pass http://127.0.0.1:8000/;
            proxy_connect_timeout 75;
            proxy_read_timeout 600;
            send_timeout 600;
        }
    }

* Install myems-admin :
```
  $ cd ~/myems-admin
  $ sudo cp -r .  /var/www/html/admin
  $ sudo chmod 0755 -R /var/www/html/admin
```
  Check the config file and change it if necessary:
```
  $ sudo nano /var/www/html/admin/app/api.js
```

## NOTE:
The 'upload' folder is for user uploaded files. DO NOT delete/move/overwrite the 'upload' folder when you upgraded myems-admin.
```
 /var/www/html/admin/upload
```
