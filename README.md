# 视频 API 文档

## 本地运行

需要 Node.js 22.22.0 或更新版本。

```sh
npm ci
npm run dev
```

打开 [本地文档站](http://localhost:3000)。运行 `npm run build` 生成 `dist/`，运行 `npm run preview` 可预览构建结果。

## Docker 部署

将项目放到已安装 Docker 和 Compose 的服务器上。在项目根目录创建 `.env.local`，填入下方的 API 基础地址配置，然后执行以下命令。

```sh
docker compose --env-file .env.local up -d --build
docker compose --env-file .env.local ps
```

启动后访问服务器的 `8080` 端口。直接从外部访问时，在服务器防火墙或云安全组放行 `8080`。如果由服务器上的反向代理提供 HTTPS，将 `docker-compose.yaml` 中的端口映射改为 `127.0.0.1:8080:80`，让代理转发到 `http://127.0.0.1:8080`。

更新文档或 API 基础地址后，再执行 `docker compose --env-file .env.local up -d --build`。基础地址在构建时写入页面和 cURL 示例，`.env.local` 由 Compose 读取并通过构建参数传递地址。

## 配置 API 基础地址

在项目根目录的 `.env.local` 中设置网关基础地址。接口路径由各文档追加，例如 `/v1/responses`。

```dotenv
ZUDOKU_PUBLIC_API_BASE_URL=https://api.example.com
```

重新运行 `npm run build` 或重启开发服务后，页首请求地址和 cURL 示例会直接显示配置后的完整地址。留空时，有默认地址的示例会使用各平台的地址，阿里视频和豆包素材示例分别使用 `DASHSCOPE_BASE_URL` 和 `ARK_ASSET_BASE_URL`。

## 维护文档

首页内容位于 `pages/quick-start.md`。新增文档时，在 `pages/` 下的对应目录创建 Markdown 文件，并将文件路径加入 `zudoku.config.ts` 中该目录的 `items` 列表。路径相对于 `pages/`，可省略 `.md` 后缀。

导航配置中的「文档」容器通过 `display: "hide"` 隐藏顶部入口，其子项显示在侧栏中。
