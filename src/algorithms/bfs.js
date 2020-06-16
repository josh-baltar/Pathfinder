// Performs Breadth First Search; returns *all* nodes in the order
// in which they were visited. Returns the shortest path.

export function bfs(grid, startNode, finishNode) {
  const visitedNodesInOrder = [startNode];
  const path = [];
  startNode.distance = 0;
  let node = startNode;
  while (!node.isFinish) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    updateUnvisitedNeighbors(node, grid);
    node.isVisited = true;
    for (let i = 0; i < unvisitedNeighbors.length; i++) {
      if (!unvisitedNeighbors[i].isVisited) {
        path.push(unvisitedNeighbors[i]);
        visitedNodesInOrder.push(unvisitedNeighbors[i]);
      }
      unvisitedNeighbors[i].isVisited = true;
    }
    if (unvisitedNeighbors.length === 0) {
      if (path.length === 0) {
        break;
      }
      node = path.shift();
    }
    node = path.shift();
  }
  //push finish node
  visitedNodesInOrder.push(node);
  path.push(node);
  return visitedNodesInOrder;
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]); // up
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); //right
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // down
  if (col > 0) neighbors.push(grid[row][col - 1]); // left
  return neighbors.filter(
    (neighbor) => !neighbor.isVisited && !neighbor.isWall
  );
}

function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}
