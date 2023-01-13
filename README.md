# **本软件完全原创。禁止一切对源代码的改编、商用和搬运，如有发现将视为违法行为。此链接仅在本人论文投稿期间可用（后续会开放其他repository）。相关方法已作为专利发表。**

# **This software is completely original. All adaptations, commercialization, and carry of the source code are prohibited and will be considered illegal. This link is only available during my thesis submission (Another repository may be opened later). The related method has been published as a patent.**



# STPam



## 介绍

这是一个基于多源大数据的时空过程智能分析挖掘软件

前端：Vue，Axios，ElementPlus

后台：SpringCloud, SpringBoot, SpringSecurity

## 下载源码使用

1.准备3个及以上的GPU工作节点

2.配置HDFS

3.环境配置（JDK必须为1.8，其他环境可以选择更高版本）

| Function                 | Name                  |    Version    |
| ------------------------ | --------------------- | :-----------: |
| Distributed  File System | HDFS                  |    2.10.1     |
| Microservice             | Spring  Cloud Alibaba | 2.1.2.RELEASE |
| Java                     | JDK                   |   1.8.0_333   |
| Python                   | python                |      3.8      |
| Virtual  Environment     | Anaconda              |       3       |
| GPU  Parallel Computing  | Cuda                  |     11.3      |

4.将源码部署到服务器上

5.下载并启动nacos、sentinel、zipkin、seata（“启动命令”）

6.依照服务器地址访问：http://服务器地址:8070/

7.首先进入游客页面，以管理员身份登录后可使用全部功能

## 功能清单

- 登录注册
- 基于jwt+SpringSecurity的安全认证和授权
- 多源大数据上传、查看、分析、下载（修改中）
- 动态配置和切换数据库和HDFS（修改中）
- 深度学习模型上传
- 模型在线编辑（修改中）
- 深度学习模型发布为Web服务（修改中）
- 使用深度学习模型服务
- 分布式计算框架集成与管理
- 基于Ring All-Reduce的GPU通信方式（修改中）
- GPU监控（修改中）
- 时空过程分布式分析挖掘
- 时空过程产品展示
- 时空过程产品分析
- 用户管理

## 软件功能仍在不断修改完善中

## 联系我们

E-mail: phw1220@cug.edu.cn
