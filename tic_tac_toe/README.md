# 井字棋游戏

这是一个使用 React 构建的井字棋游戏，基于 [React 官方教程](https://zh-hans.react.dev/learn/tutorial-tic-tac-toe) 实现。

## 功能特性

- ✅ 完整的井字棋游戏逻辑
- ✅ 玩家轮流落子（X 和 O）
- ✅ 自动检测获胜者
- ✅ 游戏历史记录
- ✅ 时间旅行功能（可以回到之前的任何步骤）
- ✅ 响应式设计

## 技术栈

- React 18
- JavaScript (ES6+)
- CSS3

## 安装和运行

### 前提条件
确保你的系统已安装 Node.js (版本 14 或更高)

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm start
```

应用将在 [http://localhost:3000](http://localhost:3000) 打开。

### 构建生产版本
```bash
npm run build
```

## 游戏说明

1. 游戏开始时，X 玩家先手
2. 点击任意空格放置棋子
3. 三个相同棋子连成一线即获胜
4. 右侧的历史记录可以回到任何之前的步骤
5. 点击 "Go to game start" 重新开始游戏

## 项目结构

```
tic_tac_toe/
├── public/
│   └── index.html          # HTML 模板
├── src/
│   ├── App.js             # 主应用组件
│   ├── index.js           # 应用入口
│   └── index.css          # 样式文件
├── package.json           # 项目配置
└── README.md             # 项目说明
```

## 学习要点

这个项目涵盖了 React 的核心概念：

- **组件 (Components)**: Square, Board, Game
- **Props**: 组件间数据传递
- **State**: 使用 useState Hook 管理状态
- **事件处理**: onClick 事件
- **条件渲染**: 根据状态显示不同内容
- **列表渲染**: 渲染历史记录
- **状态提升**: 将状态提升到父组件

## 扩展练习

完成基础游戏后，可以尝试以下扩展功能：

1. 显示当前步骤的位置信息
2. 高亮显示获胜的三个格子
3. 添加平局检测
4. 优化历史记录的显示格式
5. 添加音效和动画

## 参考资源

- [React 官方文档](https://zh-hans.react.dev/)
- [React 教程：井字棋游戏](https://zh-hans.react.dev/learn/tutorial-tic-tac-toe)
