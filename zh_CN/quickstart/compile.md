# 编译

## 编译命令

Goravel项目可以通过以下命令进行编译：

```
// 选择要编译
的系统运行。手工构建一个

// 指定要编译
运行的系统。 手工构建--os=linux
转运行。手工构建-o=linux

// 静态编译
转运行. 手工构建--static
转运行。手工构建-s

// 指定输出文件名
转运行. 艺人建筑 --name=goravel
运行。手工建筑-n=goravel
```

## 手动编译

### 定期汇编

```shell
去构建...
```

#### 部署服务器

以下文件和文件夹需要在部署过程中上传到服务器：

```
./main // 编译由此产生的二进制文件
.env
./data
./public
./storage
./resources
```

### 静态编译

定期编纂的一揽子计划还需要依靠部署环境的支助。 静态
编译的文件可以在没有环境配置的情况下在指定的平台上免费运行。

```shell
去build--ldflags "-extldflags -static" -o main
```

### 交叉编译

编译按平台进行区分，您需要根据部署
的情况选择匹配的编译方法。

```shell
/ Compile Linux 环境
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build.

// Compile Windows 环境
CGO_ENABLED=0 GOOS=winds GOARCH=amd64 go building.

// 编译Mac 环境
CGO_ENABLED=0 GOOS=darwin GOARCH=amd64 go build。
```

## 停靠栏

Goravel has a default `Dockerfile` and `docker-compose.yml` file, you can use it directly, note that `APP_HOST` should
be `0.0.0.0` at this time.

```shell
停靠构建。
```

### Docker 配置

您也可以通过以下命令快速启动服务：

```shell
docker-compose building
docker-compose up
```

> 注意：如果您需要外部访问，您需要将 APP_HOST 更改为 0.0.0.0

## 减少软件包大小

评论`config/app.go:providers`中未使用的 `ServiceProvider` 将有效地减少包装体积。
