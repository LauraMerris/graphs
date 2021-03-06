
class Graph{
  constructor(count){
    this.AdjList = new Map();
  }
  addVertex(vertex, edges){
    this.AdjList.set(vertex, edges);
  }

  BFS(startNode, endNode){

    const visited = new Set();
    const queue = new Queue();
    const path = new Map();
    let breakout = false;  //immediate breakout if endNode is found

    // initialize by adding first vertex to the queue
    queue.enqueue(startNode);
    path.set(startNode, null);
    visited.add(startNode);


    while (queue.items.length > 0 & !breakout){

      const vertex = queue.dequeue();

      // process adjacent nodes
      this.AdjList.get(vertex).some(function(adj){

        // process each adjacent node that has not been visited or queued
        if (!visited.has(adj) && queue.items.indexOf(adj) == -1){

          // add to queue, mark as visited, record parent metadata
          visited.add(adj);
          queue.enqueue(adj);
          path.set(adj, vertex);

          // breakout if destination node is adjacent
          if (adj == endNode){
            breakout = true;
          }
          return (adj === endNode);

        }

      });

    }

    return path;

  }



}

function DFSRecursive(graph, startNode, endNode){
  const visited = new Set();

  stackEmRecursive(graph, startNode, endNode, visited);

}

function stackEmRecursive(graph, node, endNode, visited){
  // take node and add to stack
  visited.add(node);
  console.log(node + " ");

  // examine adjacent nodes
    let n = graph.AdjList.get(node);

    n.forEach(i =>
      {
        if (!visited.has(i)){

          stackEmRecursive(graph, i, endNode, visited);
          
        }

      });

}

function DFSIterative(graph, startNode, endNode){

  const visited = new Set();
  const stack = new Stack();
  stack.push(startNode);

// this is the end condition
  while (stack.items.length){

      let node = stack.pop();

      if (!visited.has(node)){
        console.log(node + "");
        visited.add(node);
        if (node == endNode){
          break;
        }
        graph.AdjList.get(node).forEach(i => stack.push(i));
      }

  }

}


// Queue holds the list of vertices to be examined
class Queue{
  constructor(){
    this.items = [];
  }
  enqueue(item){
    this.items.push(item);
  }
  dequeue(){
      return this.items.shift();
  }
}

class Stack{
  constructor(){
    this.items = [];
  }
  push(item){
    this.items.push(item);
  }
  pop(){
    return this.items.pop();
  }
}

// traversing a linked list
function ShortestPath(map, node){
   const arr = [];

   while(node){
     arr.push(node);
     node = map.get(node);
  }
  return arr.reverse();
}


// main
const g = new Graph();
const startNode = "A";
const endNode = "H";

g.addVertex("A", ["B","C"]);
g.addVertex("B", ["A", "D", "E", "F"]);
g.addVertex("C", ["A","G"]);
g.addVertex("D", ["B","E"]);
g.addVertex("E", ["B","D"]);
g.addVertex("F", ["B","H"]);
g.addVertex("G", ["C","I"]);
g.addVertex("H", ["F","J", "K"])
g.addVertex("I", ["G"]);
g.addVertex("J", ["H"]);
g.addVertex("K", ["H","I"]);


const path = g.BFS(startNode, endNode);

/*
path.forEach((value, key) => {
  console.log("key: " + key + " value: " + value);
})
*/
wp = ShortestPath(path, endNode);
console.log("BFS: " + wp);

DFSRecursive(g, startNode, endNode);
DFSIterative(g, startNode, endNode);
