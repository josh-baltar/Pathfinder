// Performs Breadth First Search; returns *all* nodes in the order
// in which they were visited. Returns the shortest path.

export function bfs(grid, startNode, finishNode) {
  const visitedNodesInOrder = [startNode];
  const path = [];
  startNode.distance = 0;
  let node = startNode;
  while (!node.isFinish) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    updateUnvisitedNeighbors(node, unvisitedNeighbors);
    node.isVisited = true;
    for (const neighbor of unvisitedNeighbors) {
      if (!neighbor.isQueued) {
        path.push(neighbor);
        visitedNodesInOrder.push(neighbor);
      }
      neighbor.isQueued = true;
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
  node.isVisited = true;
  return visitedNodesInOrder;
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]); // up
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // down
  if (col > 0) neighbors.push(grid[row][col - 1]); // left
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); //right
  return neighbors.filter(
    (neighbor) => !neighbor.isVisited && !neighbor.isWall
  );
}

function updateUnvisitedNeighbors(node, unvisitedNeighbors) {
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}
