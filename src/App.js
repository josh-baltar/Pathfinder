import React from "react";
import { Helmet } from "react-helmet";
import "./App.css";
import PathfindingVisualizer from "./Components/PathfindingVisualizer/PathfindingVisualizer";

const TITLE = "Josh's Pathfinder";

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <PathfindingVisualizer></PathfindingVisualizer>
    </div>
  );
}

export default App;
