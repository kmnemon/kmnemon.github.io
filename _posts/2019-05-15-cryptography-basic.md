---
title: 密码学-加解密-基础
author: ke
layout: post
tags: cryptography
---


* 版本  
golang -- 1.12.4   
  
* golang协程同步  
  
1.channel - monitor goroutine  

```
var deposits = make(chan int) // send amount to deposit
var balances = make(chan int) // receive balance

func Deposit(amount int) { deposits <- amount }
func Balance() int       { return <-balances }

func teller() {
     var balance int // balance is confined to teller goroutine
     for {
         select {
         case amount := <-deposits:
              balance += amount
         case balances <- balance:
         }
      }
}
func init() {
     go teller() // start the monitor goroutine
}
```  
  

```




 