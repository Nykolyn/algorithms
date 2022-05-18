const Graph = require("../dataStructures/graph");

// Dijkstra's algorithm for finding the shortest path
// its complexity is O(V2) - V is the number of nodes(vertices) in the graph
// it works by starting to count path weight from the start node to its neighbors
// all others node paths are set to infinity
// then we find the node with the lowest path weight and set it as the current node
// after we are calculating path from the start node to the neighbor nodes, by adding the weight of the current node to the neighbor node
// if new path weight is less than the previous one, we update the path weight
// we repeat this process until we process all connected nodes

// needed to find node with the lowest path weight to begin next calculation,
// we are passing visited nodes to avoid infinite loop
const findLowestCostNode = (costs, visited) => {
  // set maximum value to initial lowest cost
  let lowestCost = Infinity;
  let lowestCostNode;

  Object.keys(costs).forEach((node) => {
    // if node is not visited and has the least path weight - we will rewrite lowestCostNode
    if (costs[node] < lowestCost && !visited.includes(node)) {
      lowestCostNode = node;
      lowestCost = costs[node];
    }
  });

  return lowestCostNode;
};

const findShortestPath = (graph, start, end) => {
  // we need to store costs of all nodes - it will store calculated closest paths from the start node to all other connected nodes
  const costs = {};
  // after processing each node we will push it to visited array
  const visited = [];

  // begin the calculations with initial set of path weights from start node to its neighbors
  [...graph.keys()].forEach((node) => {
    if (node === start) return;

    const value = graph.get(start)?.[node] ?? Infinity;
    costs[node] = value;
  });

  // find node with least path weight and start processing all connected nodes, until we process them all
  let node = findLowestCostNode(costs, visited);

  while (node) {
    const neighbors = graph.get(node);
    const cost = costs[node];

    // process all neighbors of the current node
    Object.keys(neighbors).forEach((neighbor) => {
      // if path from node to its neighbor is less than the previous calculated path - we will update the path weight
      const newCost = cost + neighbors[neighbor];
      if (newCost < costs[neighbor]) {
        costs[neighbor] = newCost;
      }
    });

    // push node to the list of visited and rewrite node so we can repeat loop iteration
    visited.push(node);
    node = findLowestCostNode(costs, visited);
  }

  // closest paths were calculated - repeat path weight from the start node to end node
  return costs[end];
};

// tests
// const graph = new Graph();
// graph.addNode("a");
// graph.addNode("b");
// graph.addNode("c");
// graph.addNode("d");
// graph.addNode("e");
// graph.addNode("f");
// graph.addNode("g");
// graph.addEdge("a", "b", 2);
// graph.addEdge("a", "c", 1);
// graph.addEdge("b", "f", 7);
// graph.addEdge("c", "d", 5);
// graph.addEdge("c", "e", 2);
// graph.addEdge("d", "f", 2);
// graph.addEdge("e", "f", 1);
// graph.addEdge("f", "g", 1);
// findShortestPath(graph.nodes, "a", "f");
