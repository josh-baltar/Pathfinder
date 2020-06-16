import React, { Component } from "react";
import "./PathfindingVisualizer.css";
import Node from "../Node/Node";
import Buttons from "../Buttons/Buttons";
import { dfs } from "../../algorithms/dfs";
import { bfs } from "../../algorithms/bfs";
import {
  dijkstra,
  getNodesInShortestPathOrder,
} from "../../algorithms/dijkstra";

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
      algorithm: "dijkstra",
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

  handleButtons = (event) => {
    switch (event) {
      case "dfs":
        this.setState({ algorithm: "dfs" });
        break;
      case "bfs":
        this.setState({ algorithm: "bfs" });
        break;
      case "dijkstra":
        this.setState({ algorithm: "dijkstra" });
        break;
      case "mazeRand":
        this.generateRand();
        break;
      case "start":
        if (!this.state.gridNeedsReset) {
          if (this.state.algorithm === "dijkstra") {
            this.visualizeDijkstra();
            this.setState({ gridNeedsReset: true });
          } else if (this.state.algorithm === "dfs") {
            this.visualizeDFS();
            this.setState({ gridNeedsReset: true });
          } else if (this.state.algorithm === "bfs") {
            this.visualizeBFS();
            this.setState({ gridNeedsReset: true });
          }
        } else {
          //clear the board
          const newGrid = clearGrid();
          this.setState({ grid: newGrid, gridNeedsReset: false });
        }
        break;
      default:
        console.warn("handle button has no such state: " + event);
        break;
    }
  };

  animateAlgorithm(visitedNodesInOrder, path) {
    const hasSolution = !!visitedNodesInOrder
      ? visitedNodesInOrder.slice(-1)[0].isFinish
      : false;
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animatePath(path, hasSolution);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        if (i === 0) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-start node-visited";
        } else if (i === visitedNodesInOrder.length - 1 && hasSolution) {
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
    for (let i = 0; i < path.length; i++) {
      setTimeout(() => {
        const node = path[i];
        if (i === 0) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-start node-shortest-path";
        } else if (i === path.length - 1 && hasSolution) {
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
    const visitedNodesInOrder = bfs(grid, startNode, finishNode);
    const path = getNodesInShortestPathOrder(finishNode);
    this.animateAlgorithm(visitedNodesInOrder, path);
  }

  generateRand() {
    const newGrid = generateRandWalls(this.state.grid);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  render() {
    const { grid, mouseIsPressed } = this.state;
    return (
      <>
        {/* Buttons */}
        <Buttons
          handleButtons={this.handleButtons}
          algorithm={this.state.algorithm}
        />

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
  if (grid[row][col].isFinish || grid[row][col].isStart) {
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
      if (makeWall && !grid[row][col].isFinish && !grid[row][col].isStart) {
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
const clearGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 40; col++) {
      const node = createNode(col, row);
      currentRow.push(node);
      if (node.isFinish) {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-finish";
      } else if (node.isStart) {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-start";
      } else {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node";
      }
    }
    grid.push(currentRow);
  }
  return grid;
};
