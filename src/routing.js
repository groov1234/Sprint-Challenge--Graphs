/**
 * Edge class
 */
class Edge {
  constructor(destination, weight = 1) {
    this.destination = destination;
    this.weight = weight;
  }
}
/**
 * Vertex class*/
class Vertex {
  constructor(value = 'vertex') {
    this.value = value;
    this.edges = [];
  }
}
/**
 * Graph class
 */
class Graph {
  /**
   * Constructor
   */
  constructor() {
    this.vertexes = [];
  }
  /**
   * This function looks through all the vertexes in the graph and returns the
   * first one it finds that matches the value parameter.
   *
   * Used from the main code to look up the verts passed in on the command
   * line.
   *
   * @param {*} value The value of the Vertex to find
   *
   * @return null if not found.
   */
  findVertex(value) {
    for (let vertex of this.vertexes) {
      if (vertex.value === value) return vertex;
    }

    return null;
  }

  /**
   * Breadth-First search from a starting vertex. This should keep parent
   * pointers back from neighbors to their parent.
   *
   * @param {Vertex} start The starting vertex for the BFS
   */
  bfs(start) {
    const q = [];
    /**
    *  add visited and parent props to each vertex
    *  these props are deleted after finding output
    */
    for (let v of this.vertexes) {
      v.visited = false;
      v.parent = null;
    }

    start.visited = true;
    q.push(start);

    while (q.length > 0) {
      const vertex = q[0];

      for (let edge of vertex.edges) {
        const edgeV = edge.destination;

        if (!edgeV.visited) {
          edgeV.visited = true;
          edgeV.parent = vertex;
          q.push(edgeV);
        }
      }

      q.shift();
    }
  }
  /**
   * Print out the route from the start vert back along the parent
   * pointers (set in the previous BFS)
   *
   * @param {Vertex} start The starting vertex to follow parent
   *                       pointers from
   */
  outputRoute(start) {
    let output = '';

    let u = start;

    while (u.parent !== null) {
      output += `${u.value} --> `;

      u = u.parent;
    }

    /* vertex deletion */
    for (let v of this.vertexes) {
      delete v.visited;
      delete v.parent;
    }

    console.log(`${output}${u.value}`);
  }

  /**
   * Show the route from a starting vert to an ending vert.
   */
  route(start, end) {
    // Do BFS and build parent pointer tree
    this.bfs(end);

    // Show the route from the start
    this.outputRoute(start);
  }
}

/**
 * Helper function to add bidirectional edges
 */
function addEdge(v0, v1) {
  v0.edges.push(new Edge(v1));
  v1.edges.push(new Edge(v0));
}

/**
 * Main
 */

// Test for valid command line
const args = process.argv.slice(2);

if (args.length != 2) {
  console.error('usage: routing hostA hostB');
  process.exit(1);
}

// Build the entire Internet
// (it's only a model)
const graph = new Graph();
const vertA = new Vertex('HostA');
const vertB = new Vertex('HostB');
const vertC = new Vertex('HostC');
const vertD = new Vertex('HostD');
const vertE = new Vertex('HostE');
const vertF = new Vertex('HostF');
const vertG = new Vertex('HostG');
const vertH = new Vertex('HostH');

addEdge(vertA, vertB);
addEdge(vertB, vertD);
addEdge(vertA, vertC);
addEdge(vertC, vertD);
addEdge(vertC, vertF);
addEdge(vertG, vertF);
addEdge(vertE, vertF);
addEdge(vertH, vertF);
addEdge(vertH, vertE);

graph.vertexes.push(vertA);
graph.vertexes.push(vertB);
graph.vertexes.push(vertC);
graph.vertexes.push(vertD);
graph.vertexes.push(vertE);
graph.vertexes.push(vertF);
graph.vertexes.push(vertG);
graph.vertexes.push(vertH);

// Look up the hosts passed on the command line by name to see if we can
// find them.

const hostAVert = graph.findVertex(args[0]);

if (hostAVert === null) {
  console.error('routing: could not find host: ' + args[0]);
  process.exit(2);
}

const hostBVert = graph.findVertex(args[1]);

if (hostBVert === null) {
  console.error('routing: could not find host: ' + args[1]);
  process.exit(2);
}

// Show the route from one host to another

graph.route(hostAVert, hostBVert);
