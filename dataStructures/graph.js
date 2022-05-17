// Adjacency List Graph
// unlike Adjacency Matrix, Adjacency List Graph is not a square matrix
// witch saves space, matrix have O(n^2) space complexity
// all operations have average O(1) time/space complexity
// graph is common data structure for many apps
// such as web crawlers, social networks, maps, transportation systems, etc.

// here is a very base simple graph representation
class Graph {
  // initialize graph nodes, we will use Map to store nodes
  nodes = new Map();

  // adding node is simple, just add it to the nodes Map
  addNode(node) {
    this.nodes.set(node, []);
  }

  // our graph is undirected, so we need to add edge in both directions
  addEdge(source, destination) {
    const { nodes } = this;
    if (!nodes.get(source) || !nodes.get(destination)) return;

    if (!nodes.get(source).includes(destination)) {
      nodes.get(source).push(destination);
    }

    if (!nodes.get(destination).includes(source)) {
      nodes.get(destination).push(source);
    }
  }

  // breadth first search, we will use queue to store nodes
  // and go level by level to find the destination
  bfs(source, destination) {
    if (!source || !destination) return false;

    const queue = [source];
    const visited = {};

    while (queue.length) {
      const current = queue.shift();
      if (current === destination) return true;
      if (visited[current]) continue;

      visited[current] = true;
      const neighbors = this.getNeighbors(current);

      neighbors.forEach((neighbor) => queue.push(neighbor));
    }

    return false;
  }

  // depth first search, we will use common recursive approach
  // script thanks to the recursion stack starts from the deepest level of graph
  // going upper until we find the destination
  dfs(source, destination, visited = {}) {
    if (!source || !destination) return false;
    if (visited[source]) return false;

    if (source === destination) return true;

    visited[source] = true;
    const neighbors = this.getNeighbors(source);

    return neighbors.reduce((acc, neighbor) => {
      if (acc) return acc;
      return this.dfs(neighbor, destination, visited) ? true : false;
    }, false);
  }

  getNeighbors(node) {
    return this.nodes.get(node);
  }
}

const graph = new Graph();

// test
// graph.addNode("Tim");
// graph.addNode("Jim");
// graph.addNode("John");
// graph.addNode("Tom");
// graph.addNode("Elsa");
// graph.addNode("Anna");
// graph.addEdge("Tim", "Tom");
// graph.addEdge("Elsa", "Anna");
// graph.addEdge("Tom", "Elsa");
// console.log(graph);
// console.log(graph.bfs("Tim", "Anna"));
// console.log(graph.dfs("Tom", "Elsa"));
