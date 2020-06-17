import React from "react";
import { Helmet } from "react-helmet";
import "./App.css";
import PathfindingVisualizer from "./Components/PathfindingVisualizer/PathfindingVisualizer";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

// Create a new theme using Nunito Sans
const theme = createMuiTheme({
  typography: {
    fontFamily: "Open Sans Condensed, sans-serif",
  },
});

const TITLE = "Josh's Pathfinder";

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>

      <MuiThemeProvider theme={theme}>
        <PathfindingVisualizer></PathfindingVisualizer>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
