import React, { Component } from "react";
import logo from "./../../images/logo.svg";
import github from "./../../images/GitHub-Mark-Light-120px-plus.png";
import "./Buttons.css";

class Buttons extends Component {
  render() {
    return (
      <div className="box-1">
        <div
          className="btn btn-one"
          style={{
            backgroundColor:
              this.props.algorithm === "dfs"
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(255, 255, 255, 0)",
            textDecoration:
              this.props.algorithm === "dfs" ? "underline" : "none",
          }}
          onClick={() => this.props.handleButtons("dfs")}
        >
          <span>DFS</span>
        </div>
        <div
          className="btn btn-one"
          style={{
            backgroundColor:
              this.props.algorithm === "bfs"
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(255, 255, 255, 0)",
            textDecoration:
              this.props.algorithm === "bfs" ? "underline" : "none",
          }}
          onClick={() => this.props.handleButtons("bfs")}
        >
          <span>BFS</span>
        </div>
        <div
          className="btn btn-one"
          style={{
            backgroundColor:
              this.props.algorithm === "dijkstra"
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(255, 255, 255, 0)",
            textDecoration:
              this.props.algorithm === "dijkstra" ? "underline" : "none",
          }}
          onClick={() => this.props.handleButtons("dijkstra")}
        >
          <span>Dikjstra's Algorithm</span>
        </div>
        <div
          className="btn btn-two"
          onClick={() => this.props.handleButtons("start")}
        >
          <span>Start</span>
        </div>
        <div
          className="btn btn-one"
          onClick={() => this.props.handleButtons("mazeRand")}
        >
          <span>Generate Maze</span>
        </div>

        <img src={logo} className="App-logo" alt="logo" />
        <a href="https://github.com/jnbaltar" target="_blank">
          <img src={github} className="github-logo" alt="logo" />
        </a>
      </div>
    );
  }
}

export default Buttons;
