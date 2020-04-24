# MyEMS Admin

## Introduction
MyEMS 系统管理面板，用于项目配置和系统管理
Providing admin panel  for MyEMS system administration and configuration


## Prerequisites
nginx-1.18.0 or later


## Installation

* Install NGINX  Server

refer to http://nginx.org/en/docs/install.html

* Install myems-admin :
```
  $ cd ~/myems-admin
  $ sudo cp -r .  /usr/share/nginx/html/
  $ sudo chmod 0755 -R /usr/share/nginx/html/
```
  Check and change the config file if necessary:
```
  $ sudo nano /usr/share/nginx/html/app/api.js
```

## NOTE:
The 'upload' folder is for user uploaded files. DO NOT delete/move/overwrite the 'upload' folder when you upgraded myems-admin.
```
/usr/share/nginx/html/upload
```
