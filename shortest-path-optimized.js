// vertex has alphabetic key
// holds a reference to all adjacent nodes
class Vertex{
  constructor(key, nodes = []){
    this.key = key;
    this.adjacent = nodes;
  }
}

// queued vertex has a Vertex as key
// references the key of the node that was walked before reaching this node
class QueuedVertex{
    constructor(vertex, parent = null){
        this.key = vertex;
        this.parent = parent;
    }
}

// Queue holds the list of QueuedVertices to be examined
// When a Vertex is queued it is converted to a QueuedVertex
class Queue{
  constructor(){
    this.items = [];
  }
  add(item){
    this.items.push(item);
  }
  next(){
      return this.items.shift();
  }
}

function GetVertex(graph, letter){
  return graph.find(vertex => vertex.key === letter);
}

function GetVisitedVertex(vertexArr, letter){
  return vertexArr.find(qv => qv.key.key === letter);
}

function getShortestPath(arr){
  let shortest = [];
  let first = visited[0].key.key;
  return WalkPath(visited, first, shortest);
}

function WalkPath(arr, seed, shortest){

  let item = GetVisitedVertex(arr, seed);
  shortest.push(item.key);
  if (item.parent === null){
    return shortest;
  }
   return WalkPath(arr, item.parent, shortest);

}


// add this QueuedVertex to visited and queue all child nodes
function ProcessNode(qv, target){

  const nodeVisitedFilterFunction = (n => !target.includes(n));
  const queueNodesFilterFunction = (n => QueueNode(GetVertex(graph, n), qv.key.key));

  target.push(qv);

 // push all adjacent nodes to the queue if they have not already been visited
  qv.key.adjacent.filter(nodeVisitedFilterFunction).forEach(queueNodesFilterFunction);

}

// convert node to QueuedVertex (ties parent to vertex) and add to the queue
function QueueNode(node, parent = null){
  const nodeToQueue = new QueuedVertex(node, parent);
  myQueue.add(nodeToQueue);
}

function ProcessQueue(queue, target){
  while (myQueue.items.length > 0){

    const qv = myQueue.next();
    if (qv.key.key === destination){
      target.push(qv);
      break;
    }
    ProcessNode(qv, target);
  }
}


// main
const graph = [];
const visited = [];
const startNode = "A";
const destination = "K";
const myQueue = new Queue();

// create graph
graph.push(new Vertex("A", ["B","C"]));
graph.push(new Vertex("B", ["D","E","F"]));
graph.push(new Vertex("C",["G"]));
graph.push(new Vertex("D", ["E"]));
graph.push(new Vertex("E"));
graph.push(new Vertex("F",["H"]));
graph.push(new Vertex("G",["I"]));
graph.push(new Vertex("H",["J"]));
graph.push(new Vertex("I",["K"]));
graph.push(new Vertex("J"));
graph.push(new Vertex("K"));

// initialize by adding first vertex to the queue
QueueNode(graph.shift());
ProcessQueue(myQueue, visited);

// return shortest path
let short = getShortestPath(visited.reverse());
console.log(`path: ${short.reverse().map(v => v.key)} length: ${short.length - 1}`);
