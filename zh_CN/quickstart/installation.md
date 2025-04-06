# 安装

## 服务器要求

- Golang >= 1.21

## 安装

### 使用 Goravel 安装程序

根据 [documentation](https://github.com/goravel/installer初始化安装程序，然后通过以下命令初始化一个
新的 Goravel 项目：

```shell
// 输入要安装项目
goravel新博客的目录
```

### 手动安装

```shell
// 下载框架
git 克隆--depth=1 https://github.com/goravel/goravel.git &rm -rf goravel/. 它*

// 安装依赖关系
cd goravel && go mod tidy

// 创建 . nv 环境配置文件
cp .env.example .env

// 生成应用程序密钥
然后运行. technologan key:greater
```

## 启动 HTTP 服务

### 在 Root 目录中以 .env 文件启动服务

```shell
开始运行 。
```

### 指定要开始服务的 .env 文件

```shell
开始运行。--env=./.env
```

### 使用环境变量启动服务

```shell
APP_ENV=production APP_DEBUG=true 运行.
```

### Live reload

安装 [cosmtrek/air] (https://github.com/cosmtrek/air), Goravel 有一个内置的配置文件，可以直接使用

```
空格
```

如果您正在使用 Windows 系统，您需要修改 `.air。 在根目录中的oml`文件，并将 `.exe`
后缀添加到以下两行：

```shell
[build]
  bin = "./storage/temp/main.exe"
  cmd = "go build-o ./storage/temp/main.exe ."
```

## 配置

### 配置文件

Goravel框架的所有配置文件都放置在`config`目录中。 所有配置项目都有
批注，您可以根据您的需要对它们进行调整。

### 生成应用程序密钥

你需要在本地安装Goravel后生成应用程序密钥。 运行下面的命令，将在 `.env` 文件中的 `APP_KEY` 中生成一个 32 位字符串
。 此密钥主要用于数据加密和解密。

```shell
开始运行。手工键：生成
```

### 生成 JWT 令牌

如果您使用 [Authentication](../security/authentication)，您需要生成 JWT 令牌。

```shell
去运行.个工匠jwt:secret
```
