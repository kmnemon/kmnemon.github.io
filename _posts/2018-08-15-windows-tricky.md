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

* dual lan and wifi surf  
  
'''
route delete 0.0.0.0
route add 0.0.0.0 mask 0.0.0.0 192.168.1.1 #all the others go to the gateway 192.168.1.1
route add 192.168.0.0 mask 255.255.255.0 192.168.0.1 #use gateway 192.168.0.1 access net 192.168.0.0
'''
  


