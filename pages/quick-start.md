---
title: 快速开始
description: 选择聊天、图像生成、视频生成或素材管理接口，完成鉴权、首次请求和结果处理。
---

从一次最小请求开始。聊天可以先发送一条文本消息，图像生成可以先用一条提示词生成一张图，视频生成可以先创建一个文生视频任务，再用返回的任务 ID 查询结果。

## 选择接口

| 你要完成的工作 | 接口入口 |
| --- | --- |
| 兼容已有 Chat Completions 客户端，使用 `messages` 发送聊天消息 | [聊天 · Chat 格式](/chat/chat-format) |
| 使用 OpenAI Responses 的 `input`、多模态内容或工具调用 | [聊天 · OpenAI 格式](/chat/openai-format) |
| 使用 Claude Messages 的 `messages`、`system` 和内容块 | [聊天 · Claude 格式](/chat/claude-format) |
| 使用 Gemini 的 `contents` 和 `parts` 发送文本、图片或文件 | [聊天 · Gemini 格式](/chat/gemini-format) |
| 使用 GPT Image 按提示词生成图像 | [图像 · OpenAI 格式](/image/openai-format) |
| 使用豆包图像模型进行文生图、参考图生成或流式出图 | [图像 · 豆包格式](/image/doubao-format) |
| 使用豆包模型生成或查询视频 | [创建任务](/doubao-video/create-video-generation-task-api) · [查询任务](/doubao-video/get-video-generation-task-api) |
| 使用阿里万相模型生成或查询视频 | [创建任务](/ali-video/create-video-generation-task-api) · [查询任务](/ali-video/get-video-generation-task-api) |
| 使用 Kling 4.0 或 Kling 4.0 Flash 生成或查询视频 | [创建任务](/kling-video/create-video-generation-task-api) · [查询任务](/kling-video/get-video-generation-task-api) |
| 将图像、视频或音频登记为可复用的豆包素材 | [创建素材组](/doubao-assets/create-asset-group-api) · [创建素材](/doubao-assets/create-asset-api) · [查询素材](/doubao-assets/get-asset-api) |

## 准备鉴权凭证

打开所选接口的「鉴权」章节，确认凭证类型和获取方式。下表中的变量名与文档的 cURL 示例一致。使用兼容网关时，凭证由你实际调用的服务签发。

| 接口 | cURL 示例中的凭证变量 | 请求头 |
| --- | --- | --- |
| Chat 格式、OpenAI 聊天和 OpenAI 图像 | `OPENAI_API_KEY` | `Authorization: Bearer …` |
| Claude 聊天 | `ANTHROPIC_API_KEY` | `Authorization: Bearer …`。示例还带有 `anthropic-version` |
| Gemini 聊天 | `GEMINI_API_KEY` | `x-goog-api-key` |
| 豆包图像、豆包视频和豆包素材网关 | `ARK_API_KEY` | `Authorization: Bearer …` |
| 阿里视频 | `DASHSCOPE_API_KEY` | `Authorization: Bearer …` |
| 可灵视频 | `KLING_API_KEY` | `Authorization: Bearer …` |

在 Bash 或 Zsh 中，可以通过下面的命令输入密钥。输入时终端不会显示字符，执行后在同一个终端窗口运行 cURL。用其他接口时，将变量名换成该接口示例使用的名称。

```sh
printf '请输入 OpenAI API Key：'
read -rs OPENAI_API_KEY
printf '\n'
export OPENAI_API_KEY
```

豆包素材页的 cURL 使用 Bearer 网关鉴权。直连火山方舟官方素材接口使用 AK/SK 签名，详情见对应接口的鉴权章节。[豆包素材鉴权](/doubao-assets/create-asset-api#鉴权)

## 发送第一次请求

1. 打开接口页，在「输入示例」中选择最简单的文本、单图或文生视频示例。先跑通普通请求，再尝试流式输出、多素材或工具调用。
2. 复制整段 cURL 到已设置凭证变量的终端。替换示例中的模型名、提示词、任务 ID 或媒体 URL。模型名应与你的账号或网关已开通的模型一致。
3. 根据「请求参数」填入必填字段，尤其是嵌套对象里的必填项。参考图、视频或音频应满足接口文档中的格式要求，并确保服务端能够读取相应 URL。
4. 发送请求后对照「输出示例」。先确认 HTTP 响应，再检查业务状态和结果字段。图像和视频链接也应实际打开或下载一次。

JSON 请求通常带有 `Content-Type: application/json`。复制示例时保留请求头、引号和续行符。手动编辑请求体时，确认字段名大小写正确，字符串使用双引号，对象和数组末尾没有多余的逗号。

## 读取聊天和图像结果

| 接口 | 从哪里读取结果 |
| --- | --- |
| Chat 格式 | 普通文本在 `choices[].message.content`。同时查看 `finish_reason`，判断正常结束、长度截断或工具调用。 |
| OpenAI Responses | 遍历 `output[]`，在消息的 `content[]` 中找 `type` 为 `output_text` 的块，再读取 `text`。 |
| Claude Messages | 遍历 `content[]`，读取 `type` 为 `text` 的块，并查看 `stop_reason`。开启工具时也可能收到 `tool_use` 内容块。 |
| Gemini | 从 `candidates[].content.parts[]` 中读取文本，查看 `finishReason`。缺少候选内容时检查 `promptFeedback`。 |
| OpenAI 图像 | 普通请求从 `data[].b64_json` 读取图像，将 Base64 解码为图片文件。 |
| 豆包图像 | 按 `response_format` 从 `data[].url` 下载，或对 `data[].b64_json` 解码。文档示例中的图像链接有效期为生成后 24 小时。 |

流式响应会分多次返回数据。按相应文档的「输出示例」处理 SSE 事件，逐步拼接文本增量或接收单张图片，并在收到结束事件后结束读取。图片接口可能推送预览或部分结果，保存最终产物时应以对应接口的完成事件为准。

## 完成一个视频任务

视频生成分为提交和查询两步。创建请求返回任务 ID 后，把它和业务订单或会话标识一起保存。后续使用同平台的查询接口查询进度。

| 平台 | 创建响应中的任务 ID | 查询时的参数 | 成功时的结果 |
| --- | --- | --- | --- |
| 豆包视频 | `id` | 路径中的 `{id}` | `status` 为 `succeeded`，视频地址在 `content.video_url`。 |
| 阿里视频 | `output.task_id` | 路径中的 `{task_id}` | `output.task_status` 为 `SUCCEEDED`，视频地址在 `output.video_url`。 |
| 可灵视频 | `data.id` | 查询参数 `task_ids` | 结果项的 `status` 为 `succeeded`，从 `data[].outputs[]` 中找到 `type` 为 `video` 的产物并读取 `url`。 |

1. **提交任务。** 打开对应的「创建视频生成任务」示例，选择文生视频、首帧图生视频或参考素材等模式。可灵 4.0 Flash 使用创建页上的 Flash 示例。阿里视频异步创建示例带有 `X-DashScope-Async: enable`。
2. **按 ID 查询。** 将实际返回的 ID 填入查询示例中的 `TASK_ID`。使用可灵自定义任务 ID 时，对应的查询参数是 `external_task_ids`。
3. **处理任务状态。** 等待或运行中时，间隔一段时间再查询。收到成功状态后下载视频。收到失败、取消或过期等终止状态时，结束轮询并记录响应里的原因。
4. **保存产物。** 视频链接的有效期以各接口的查询文档为准。需要长期引用时，在有效期内下载并保存到自己的存储中。业务侧也可以设置轮询超时，避免任务状态异常时无限查询。

查询失败时，先检查任务 ID、平台、凭证以及任务是否超出可查询的时限。遇到创建请求超时且无法确认是否已提交时，先核对现有任务，再决定是否重新创建，避免产生重复任务。

## 登记并复用豆包素材

1. 创建素材组，保存响应中的素材组 ID。已有可用素材组时可以直接使用。[创建素材资产组合](/doubao-assets/create-asset-group-api)
2. 向素材组登记素材。按示例填写 `GroupId`、`AssetType` 和服务端可读取的 `URL`，项目归属应与素材组一致。保存响应里的 `Result.Id`。[创建素材资产](/doubao-assets/create-asset-api)
3. 用素材 ID 查询状态。`Processing` 表示正在预处理，`Active` 表示可以使用，`Failed` 时查看 `Error`。[查询素材资产信息](/doubao-assets/get-asset-api)
4. 将可用素材按视频创建页对应模式的示例填入参考素材字段。管理已有记录时，可以使用列表接口按条件查找。[豆包视频创建任务](/doubao-video/create-video-generation-task-api) · [查询素材资产列表](/doubao-assets/list-assets-api)

## 排查常见问题

| 现象 | 优先检查 |
| --- | --- |
| `400` 或参数校验失败 | 检查 JSON 是否有效，字段类型、必填项和枚举值是否正确，以及输入素材是否满足模型限制。 |
| `401` 或 `403` | 检查终端中的凭证变量是否已设置、请求头名称是否正确，以及凭证是否有对应服务或模型的权限。 |
| `404` 或找不到任务 | 检查请求路径、任务 ID 以及查询接口是否与创建平台一致。对有查询时限的任务，确认任务尚未过期。 |
| `429` 或请求过于频繁 | 降低并发和轮询频率。如果响应带有 `Retry-After`，按服务端提示等待后再试。 |
| `5xx` 或网络超时 | 记录调用时间、HTTP 状态和服务返回的请求 ID。重试生成类请求前，先判断原请求是否已被接收。 |
| 视频或图片链接无法打开 | 检查产物是否已生成、链接是否仍有效，以及访问方式是否符合接口的下载要求。 |

提交排查信息时，可以提供接口名称、调用时间、HTTP 状态、业务错误码、请求 ID 或任务 ID，并附上脱敏的请求和响应。分享前移除 API Key、签名、私有素材链接和用户数据。
