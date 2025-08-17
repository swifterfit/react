// 入口文件：在浏览器中把 React 应用挂载到 DOM。
// 可类比 iOS 中把根视图控制器挂载到窗口。

import React from 'react';
import ReactDOM from 'react-dom/client';
// 引入全局样式（CSS 将影响整个文档）
import './index.css';
// 引入根组件（App 是我们应用的 UI 根）
import App from './App';

// 通过 React 18 的 createRoot API 挂载到 public/index.html 里的 #root 节点
const container = document.getElementById('root');
if (!container) throw new Error('Root container #root not found');
const root = ReactDOM.createRoot(container as HTMLElement);
root.render(
  // StrictMode 只在开发环境做额外检查，以帮助你发现潜在问题；生产构建不会启用
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
