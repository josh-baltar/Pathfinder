import React, { Component } from "react";
import logo from "./../../images/logo.svg";
import github from "./../../images/GitHub-Mark-Light-120px-plus.png";
import "./Buttons.css";

class Buttons extends Component {
  render() {
    const algorithm = this.props.algorithm;
    const handleButtons = this.props.handleButtons;
    return (
      <div className="box-1">
        <div
          className="btn btn-one"
          style={{
            ...styles(algorithm, "dfs"),
          }}
          onClick={() => handleButtons("dfs")}
        >
          <span>DFS</span>
        </div>

        <div
          className="btn btn-one"
          style={{
            ...styles(algorithm, "bfs"),
          }}
          onClick={() => handleButtons("bfs")}
        >
          <span>BFS</span>
        </div>

        <div
          className="btn btn-one"
          style={{
            ...styles(algorithm, "dijkstra"),
          }}
          onClick={() => handleButtons("dijkstra")}
        >
          <span>Dikjstra's Algorithm</span>
        </div>

        <div
          className="btn btn-one"
          style={{
            ...styles(algorithm, "astar"),
          }}
          onClick={() => handleButtons("astar")}
        >
          <span>A* Search</span>
        </div>

        <div className="btn btn-two" onClick={() => handleButtons("start")}>
          <span>Start</span>
        </div>
        <div className="btn btn-one" onClick={() => handleButtons("mazeRand")}>
          <span>Generate Maze</span>
        </div>

        <img src={logo} className="App-logo" alt="logo" />
        <a
          href="https://github.com/jnbaltar"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img src={github} className="github-logo" alt="logo" />
        </a>
      </div>
    );
  }
}

const styles = (algorithm, buttonAlgorithm) => ({
  backgroundColor:
    algorithm === buttonAlgorithm
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(255, 255, 255, 0)",
  textDecoration: algorithm === buttonAlgorithm ? "underline" : "none",
});

export default Buttons;
