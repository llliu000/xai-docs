import type { ZudokuConfig } from "zudoku";
import "./pages/doubao-video/api-reference.css";

const config = {
  site: {
    title: "视频 API 文档",
  },
  docs: {
    defaultOptions: {
      showLastModified: false,
      disablePager: true,
    },
  },
  navigation: [
    {
      type: "category",
      label: "文档",
      display: "hide",
      items: [
        { type: "doc", file: "quick-start", path: "/", icon: "rocket" },
        {
          type: "category",
          label: "聊天",
          icon: "message-square",
          collapsible: true,
          collapsed: false,
          items: [
            "chat/chat-format",
            "chat/openai-format",
            "chat/claude-format",
            "chat/gemini-format",
          ],
        },
        {
          type: "category",
          label: "图像",
          icon: "images",
          collapsible: true,
          collapsed: false,
          items: ["image/openai-format", "image/doubao-format"],
        },
        {
          type: "category",
          label: "豆包视频",
          icon: "video",
          collapsible: true,
          collapsed: false,
          items: [
            "doubao-video/create-video-generation-task-api",
            "doubao-video/get-video-generation-task-api",
          ],
        },
        {
          type: "category",
          label: "豆包素材",
          icon: "images",
          collapsible: true,
          collapsed: false,
          items: [
            "doubao-assets/create-asset-group-api",
            "doubao-assets/create-asset-api",
            "doubao-assets/list-asset-groups-api",
            "doubao-assets/list-assets-api",
            "doubao-assets/get-asset-api",
            "doubao-assets/get-asset-group-api",
            "doubao-assets/update-asset-group-api",
            "doubao-assets/update-asset-api",
            "doubao-assets/delete-asset-api",
            "doubao-assets/delete-asset-group-api",
          ],
        },
        {
          type: "category",
          label: "阿里视频",
          icon: "video",
          collapsible: true,
          collapsed: false,
          items: [
            "ali-video/create-video-generation-task-api",
            "ali-video/get-video-generation-task-api",
          ],
        },
        {
          type: "category",
          label: "可灵视频",
          icon: "video",
          collapsible: true,
          collapsed: false,
          items: [
            "kling-video/create-video-generation-task-api",
            "kling-video/get-video-generation-task-api",
          ],
        },
      ],
    },
  ],
} satisfies ZudokuConfig;

export default config;
