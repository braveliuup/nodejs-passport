# 简介
Express结合Passport实现登陆认证。
登陆认证，是每个应用都需要的基础功能。但很多时候，却容易被忽略，不仅安全漏洞严重，而且代码紧耦合， 混乱不堪。

Passport项目，正是为了解决登陆认证的事情，让认证模块更透明，减少耦合。

# 目录
1. 什么是认证
2. Passport项目介绍
3. Express结合passport实现登陆认证

# 什么是登陆认证Authentication
认证又称“验证”， “鉴权”， 是指通过一定的手段，完成对用户身份的确认。身份验证的方法有很多，基本上可以分为： 基于共享密钥的身份验证、基于生物学特征的身份验证和基于公开密钥加密算法的身份验证。

登陆认证，是用户在访问应用或网站时， 通过事先注册的用户名和密码 告诉应用使用者的身份 从而获得访问权限的一种操作。

几乎所有的应用都需要登陆验证。

# passport
基于nodejs的认证中间件。目的只是为了登陆认证，因此，代码干净，易维护，可以方便地集成到其他的应用中。

web应用一般有2种登陆认证的形式：
用户名和密码认证登陆
OAuth认证登陆

passport可以根据应用程序的特点，配置不同的认证机制。

# 用户名、密码登陆认证
## 新建项目
express -e nodejs-passport
cd nodejs-passport && npm install
npm install passport
npm install passport-local

## 实现session的认证
启用connect的session中间件，依赖connect, cookieParser
配置passport中间件

## 定义认证策略
LocalStrategy策略。用于匹配本地环境的用户名和密码，可以扩展这个策略

## 路由控制的登陆认证
路由页面
/: 首页，用于登陆，为登陆用户只能访问首页
/login: 登陆请求，用户登陆时， post到登陆请求，认证成功跳转到用户页， 认证失败回到首页
/users： 用户页，用户通过登陆认证后，可以访问用户页
/logout： 登出请求，用户退出系统，get到登陆请求，页面自动跳回到首页。

完成代码：
app.js
index.ejs
user.js

通过passport中间件，就把登陆认证和应用程序分离了出来， 从而保证了更清晰代码结构。