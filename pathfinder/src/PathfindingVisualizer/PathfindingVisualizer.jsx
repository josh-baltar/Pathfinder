import React, { Component } from "react";
import logo from "./../images/logo.svg";
import github from "./../images/GitHub-Mark-Light-120px-plus.png";
import Node from "./Node/Node";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";
import { dfs } from "../algorithms/dfs";
import { bfs } from "../algorithms/bfs";
import "./PathfindingVisualizer.css";
import "./Buttons.css";

const START_NODE_ROW = 10;
const START_NODE_COL = 13;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 26;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      gridNeedsReset: false,
      isRunning: false,
      algorithm: "none",
      mouseIsPressed: false,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  componentDidUpdate() {
    console.log("Grid Updated");
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  animateAlgorithm(visitedNodesInOrder, path) {
    const hasSolution = !!visitedNodesInOrder
      ? visitedNodesInOrder.slice(-1)[0].isFinish
      : false;
    for (let i = 1; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animatePath(path, hasSolution);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];

        if (i === visitedNodesInOrder.length - 1 && hasSolution) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-finish node-visited";
        } else {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-visited";
        }
      }, 10 * i);
    }
  }

  animatePath(path, hasSolution) {
    for (let i = 1; i < path.length; i++) {
      setTimeout(() => {
        const node = path[i];
        if (i === path.length - 1 && hasSolution) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-finish node-shortest-path";
        } else {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-shortest-path";
        }
      }, 50 * i);
    }
  }

  visualizeDijkstra() {
    console.log("Visualize Dijkstra's");
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  visualizeDFS() {
    console.log("Visualize DFS");
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const { visitedNodesInOrder, path } = dfs(grid, startNode, finishNode);
    this.animateAlgorithm(visitedNodesInOrder, path);
  }

  visualizeBFS() {
    console.log("Visualize BFS");
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const { visitedNodesInOrder, path } = bfs(grid, startNode, finishNode);
    this.animateAlgorithm(visitedNodesInOrder, path);
  }

  visualize() {
    if (this.state.algorithm === "dijkstra") {
      this.visualizeDijkstra();
    } else if (this.state.algorithm === "dfs") {
      this.visualizeDFS();
    }
    // if (!this.state.gridNeedsReset) {
    //   this.visualizeDijkstra();
    //   this.setState({ gridNeedsReset: true });
    // } else {
    //   //clear the board
    //   const newGrid = clearGrid(this.state.grid);
    //   this.setState({ grid: newGrid, gridNeedsReset: false });
    // }
  }

  generateRand() {
    const newGrid = generateRandWalls(this.state.grid);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  render() {
    const { grid, mouseIsPressed } = this.state;
    return (
      <>
        <div className="box-1">
          <div
            className="btn btn-one"
            style={{
              backgroundColor:
                this.state.algorithm === "dfs"
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(255, 255, 255, 0)",
              textDecoration:
                this.state.algorithm === "dfs" ? "underline" : "none",
            }}
            onClick={() => this.setState({ algorithm: "dfs" })}
          >
            <span>DFS</span>
          </div>
          <div
            className="btn btn-one"
            style={{
              backgroundColor:
                this.state.algorithm === "dijkstra"
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(255, 255, 255, 0)",
              textDecoration:
                this.state.algorithm === "dijkstra" ? "underline" : "none",
            }}
            onClick={() => this.setState({ algorithm: "dijkstra" })}
          >
            <span>Dikjstra's Algorithm</span>
          </div>
          <div className="btn btn-two" onClick={() => this.visualize()}>
            <span>Start</span>
          </div>
          <div className="btn btn-one" onClick={() => this.generateRand()}>
            <span>Generate Maze</span>
          </div>

          <img src={logo} className="App-logo" alt="logo" />
          <a href="https://github.com/jnbaltar" target="_blank">
            <img src={github} className="github-logo" alt="logo" />
          </a>
        </div>
        <div className="instructions">
          <span>Pick an algorithm and hit Start!</span>
        </div>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, col, isFinish, isStart, isWall } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}
const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 40; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};
const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};
const getNewGridWithWallToggled = (grid, row, col) => {
  if (grid[row][col].isFinish === true) {
    return grid;
  }
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
const generateRandWalls = (grid) => {
  const newGrid = grid.slice();
  for (let row = 0; row < newGrid.length; row++) {
    for (let col = 0; col < newGrid[0].length; col++) {
      const makeWall = Math.round(Math.random() * 0.7);
      if (makeWall) {
        const node = newGrid[row][col];
        const newNode = {
          ...node,
          isWall: !node.isWall,
        };
        newGrid[row][col] = newNode;
      }
    }
  }
  return newGrid;
};
const clearGrid = (grid) => {
  //complete this
  const newGrid = grid.slice();
  //remove walls

  //make grid white

  return newGrid;
};
