---
title: linux tricky
author: ke
layout: post
tags: tricky
---
* How to recover the flash disk from the ubuntu boot disk  

prepare: win 10 system

```
1.use command line "diskpart" to startup the disk tools
2."list disk"->"select disk x" (x is the disk u want to recover)->"clean"->"create partition primary"->"active"->"format fs=fat32 quick"
```

done :)

* find the listen port  
lsof -i:8000
ps aux | grep xxx

* transfer file  
SCP local.py root@192.168.0.1:/home/ke/tornado

* MongoDB  
```
  service mongod start
  chkconfig mongod on
```

log: /var/log/mongodb/mongod.log  
config file: /etc/mongod.conf  
	net: bindIpAll: true  

* nginx  
location: `/usr/local/nginx/sbin`  
start: `./nginx`  
stop: `./nginx -s stop`  
reload: `./nginx -s reload`  

* jenkins  
location: `/etc/init.d`  
start: `./jenkins start`  

* nohub the python  
nohup python3 webanalysis.py &  

