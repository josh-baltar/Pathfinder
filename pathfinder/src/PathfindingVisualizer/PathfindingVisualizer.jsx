import React, { Component } from "react";
import { Select } from '@material-ui/core';
// import { Button } from '@material-ui/core';
import logo from "./../logo.svg";
import Node from "./Node/Node";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";
import "./PathfindingVisualizer.css";
import "./Buttons.css"



const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      algHasRan: false,
      mouseIsPressed: false,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
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

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }
  }

  visualizeDijkstra() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  visualize() {
    if (!this.state.algHasRan) {
      this.visualizeDijkstra();
      this.setState({ algHasRan: true })
    } else {
      //clear the board
      const newGrid = clearGrid(this.state.grid);
      this.setState({ grid: newGrid, algHasRan: false })
    }
  }

  generateRand() {
    const newGrid = generateRandWalls(this.state.grid);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  render() {
    const { grid, mouseIsPressed } = this.state;

    return (
      <>

        <div class="box-1">
          <div class="btn btn-one btn-one">
            <span>Dijkstra's Algorithm</span>
          </div>
          <div class="btn btn-two" onClick={() => this.visualizeDijkstra()}>
            <span>Start</span>
          </div>
          <div class="btn btn-one" onClick={() => this.generateRand()}>
            <span>Generate Maze</span>
          </div>

          <img src={logo} className="App-logo" alt="logo" />
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
    for (let col = 0; col < 50; col++) {
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
      const makeWall = Math.round(Math.random() * .7)
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
const clearGrid = (grid) => { //complete this
  const newGrid = grid.slice();
  //remove walls

  //make grid white

  return newGrid;
};