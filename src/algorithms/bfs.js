// Performs Breadth First Search; returns *all* nodes in the order
// in which they were visited. Returns the shortest path.

export function bfs(grid, startNode, finishNode) {
  const visitedNodesInOrder = [startNode];
  const path = [];
  startNode.distance = 0;
  startNode.isVisited = true;
  path.push(startNode);

  while (!!path) {
    let node = path.shift();

    //check if node is defined
    if (!node) {
      return visitedNodesInOrder;
    }

    // check if we found the finish node
    if (node.isFinish) {
      node.isVisited = true;
      return visitedNodesInOrder;
    }

    // otherwise check neighboring cells
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    updateUnvisitedNeighbors(node, unvisitedNeighbors);
    for (const neighbor of unvisitedNeighbors) {
      path.push(neighbor);
      visitedNodesInOrder.push(neighbor);
      neighbor.isVisited = true;
    }
  }

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

function updateUnvisitedNeighbors(node, unvisitedNeighbors) {
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}
