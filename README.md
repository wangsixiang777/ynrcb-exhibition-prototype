# 云南农商银行 · 展陈交互原型（需求核对）

高保真 HTML 交互原型，用于与甲方核对展陈大屏 / 电子屏 / 笑脸墙的信息架构、交互逻辑与每页数据字段。

三维沙盘以示意图替代，重点把逻辑与展示内容讲清楚。

## 本地预览

```bash
npm install
npm run dev
```

构建：

```bash
npm run build
npm run preview
```

## 页面

| 路由 | 内容 |
|---|---|
| `#/` | 总览 |
| `#/screen-a` | 行内数据大屏 3584×1408 |
| `#/screen-b` | 金融服务互动大屏 3584×2048 |
| `#/screen-c` | 三大点位 + 笑脸墙 |
| `#/screen-d` | 一楼电子屏公示 |

右上角「待确认」可展开核对问题清单。

## 部署

使用相对路径 `base: './'`，可发布到 GitHub Pages。建议开启 Pages 的 GitHub Actions 或把 `dist/` 推到 `gh-pages` 分支。
