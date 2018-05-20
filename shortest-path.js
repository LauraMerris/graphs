// main
const graph = [];
const visited = [];
const destination = "K";

// shortest path
class Vertex{
  constructor(key, nodes = []){
    this.key = key;
    this.children = nodes;
  }
}

class QueuedVertex{
    constructor(vertex, parent = null){
        this.key = vertex;
        this.parent = parent;
    }
}

// queue to hold vertex list
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

function SeedQueue(seedNode){
  QueueNode(seedNode);
}

function GetVertex(letter){
  return graph.find(vertex => vertex.key === letter);
}

function GetVisitedVertex(letter){
  return visited.find(qv => qv.key.key === letter);
}

function getShortestPath(arr){
  let shortest = [];
  let first = visited[0].key.key;
  return WalkPath(visited, first, shortest);
}

function WalkPath(arr, seed, shortest){

  let item = GetVisitedVertex(seed);
  shortest.push(item.key);
  if (item.parent === null){
    return shortest;
  }
   return WalkPath(arr, item.parent, shortest);

}


// add this QueuedVertex to visited and queue all child nodes
function ProcessNode(qv){

  const nodeVisitedFilterFunction = (n => !visited.includes(n));
  const queueNodesFilterFunction = (n => QueueNode(GetVertex(n), qv.key.key));

  visited.push(qv);

 // push all children of the node to the queue if they have not already been visited
  qv.key.children.filter(nodeVisitedFilterFunction).forEach(queueNodesFilterFunction);

}

// convert node to QueuedVertex (ties parent to vertex) and add to the queue
function QueueNode(node, parent = null){
  const nodeToQueue = new QueuedVertex(node, parent);
  myQueue.add(nodeToQueue);
}

function ProcessQueue(queue){
  while (myQueue.items.length > 0){

    const qv = myQueue.next();
    if (qv.key.key === destination){
      visited.push(qv);
      break;
    }
    ProcessNode(qv);
  }
}

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
SeedQueue(graph.shift());
ProcessQueue(myQueue);

// return shortest path
let short = getShortestPath(visited.reverse());
console.log(short.reverse().map(v => v.key));
