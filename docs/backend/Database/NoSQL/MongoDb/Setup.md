# MongoDb 安装与启动

:bulb: 可以下载开源的社区版数据库服务器软件 [MongoDB Community Server](https://www.mongodb.com/try/download/community) 安装在本地，也可以直接使用在线云数据库 [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)（有[免费额度](https://www.mongodb.com/pricing)）。

## MongoDB Community Server
1. [下载](https://www.mongodb.com/try/download/community)与系统相符的软件安装包到本地并安装，具体安装步骤可以参考[官方文档](https://docs.mongodb.com/manual/administration/install-community/)。
    * 安装时选择 `Custom` 可以修改该软件安装路径。
    * 勾选 `Install MongoD as a Service` 将 MongoDB 安装并配置为 Windows 服务，这样就可以直接在命令行中执行数据库的相关操作。
    * 安装时可以修改  `Data Directory` 指定数据库存储的目录（默认是在软件安装路径的 `data` 文件夹中）；可以修改 `Log Directory` 指定日志存储的目录（默认是在软件安装路径的 `log` 文件夹中）。也可以在命令行界面分别[配置 `--dbpath` 和 `--logpath` 参数](https://www.mongodb.org.cn/tutorial/59.html)。

2. 可以通过 MongoDB 安装的 GUI 界面 [MongoDB Compass](https://www.mongodb.com/products/compass) 来启动并操作数据库；但推荐使用命令行界面来操作数据库， 在安装 MongDB 数据库服务器时，会安装一个交互式的 JavaScript 命令行工具 [mongo shell](https://docs.mongodb.com/manual/mongo/)，（Windows 系统）可以在安装目录下的 `bin` 子文件夹中双击 `mongo.exe` 开启它（也可以将该应用的目录添加到系统的 PATH 环境，然后可以直接在 Windows 的命令行工具中调用 mongo shell）

3. 打开 mongo shell 或在系统自带的 Terminal 中输入以下命令连接本地的 MongoDB 实例

```bash
mongo
```

:bulb: MongDB 实例运行在本地端 `localhost` 默认端口为 `27017`，也可以指定连接的端口：

```bash
mongo --port 28015
```

:bulb: 连接一个远程的 MongoDB 实例，需要显性地指明**主机名**和端口号（如果需要可以提供验证信息）

```bash
mongo "mongodb://mongodb0.example.com:28015"

# mongo --host mongodb0.example.com:28015
# mongo --host mongodb0.example.com --port 28015
# mongo "mongodb://alice@mongodb0.examples.com:28015/?authSource=admin"
# mongo --username alice --password --authenticationDatabase admin --host mongodb0.examples.com --port 28015
```

