// iOS 开发者视角：这是一个井字棋（Tic-Tac-Toe）示例。
// 由三个层级组成：Square(单个格子) → Board(棋盘) → Game(顶层，含历史时间旅行)

import { useState } from 'react';

type SquareValue = 'X' | 'O' | null;

// Square 组件：渲染一个按钮，表示棋盘的一个格子。
// props:
// - value: 当前格子里显示的内容（'X' / 'O' / null）
// - onSquareClick: 点击该格子时触发的回调（由父组件传入）
function Square({ value, onSquareClick }: { value: SquareValue; onSquareClick: () => void }) {
  return (
    // 注意：在 React 中用 className 而不是 class
    // onClick 接受一个函数，当用户点击按钮时调用
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// Board 组件：负责渲染 3x3 的棋盘，并在用户点击时计算下一步。
// props:
// - xIsNext: 布尔值，表示是否轮到 'X'
// - squares: 长度为 9 的数组，存储每个格子的内容
// - onPlay: 当产生新的棋盘状态时，通知父组件（Game）
function Board({ xIsNext, squares, onPlay }: { xIsNext: boolean; squares: SquareValue[]; onPlay: (next: SquareValue[]) => void }) {
  // 处理某个格子被点击
  function handleClick(i: number) {
    // 如果已经有赢家，或被点击的格子非空，则忽略（不允许覆盖）
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // 复制一份数组，而不是直接修改原数组（保持不可变数据的原则）
    const nextSquares = squares.slice();
    // 根据当前轮次落子
    nextSquares[i] = xIsNext ? 'X' : 'O';
    // 把新的棋盘状态交给父组件，让父组件更新历史与当前步
    onPlay(nextSquares);
  }

  // 每次渲染时基于当前棋盘计算赢家与状态提示
  const winner = calculateWinner(squares);
  let status: string;
  if (winner) {
    status = 'Winner: ' + winner; // 有赢家
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O'); // 轮到谁
  }

  return (
    <>
      {/* 状态提示区域 */}
      <div className="status">{status}</div>

      {/* 三行，每行三个格子 */}
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

// Game 组件：顶层容器，管理"历史记录"和"当前步数"，实现时间旅行。
export default function Game() {
  // history：一个数组，记录每一步的棋盘（长度为 9 的数组）
  // 初始值是 [Array(9).fill(null)] —— 表示从一个空棋盘开始
  const [history, setHistory] = useState<SquareValue[][]>([Array(9).fill(null)]);
  // currentMove：当前所在的步数索引（用于时间旅行）
  const [currentMove, setCurrentMove] = useState<number>(0);
  // 偶数步（0、2、4…）轮到 X；奇数步轮到 O
  const xIsNext = currentMove % 2 === 0;
  // 当前要渲染的棋盘
  const currentSquares = history[currentMove];

  // 当棋盘产生新状态时被调用（来自 Board）
  function handlePlay(nextSquares: SquareValue[]) {
    // 如果在"历史中间"走子，需要先截断未来，再把新一步拼到末尾
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    // 当前步变为新历史的最后一步
    setCurrentMove(nextHistory.length - 1);
  }

  // 跳转到历史中的某一步（时间旅行）
  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  // 把历史记录映射为"跳转按钮"列表
  const moves = history.map((squares, move) => {
    const description = move > 0 ? 'Go to move #' + move : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        {/* 向 Board 传入：当前是否轮到 X、当前棋盘、以及当走子后的回调 */}
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        {/* 历史时间旅行按钮 */}
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// 胜负判定：遍历所有可能的连线，只要出现相同且非空即有赢家
function calculateWinner(squares: SquareValue[]): SquareValue {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // 返回 'X' 或 'O'
    }
  }
  return null; // 没有赢家
}
