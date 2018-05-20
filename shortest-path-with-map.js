
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

    // initialize by adding first vertex to the queue
    queue.enqueue(startNode);
    path.set(startNode, null);
    visited.add(startNode);

    while (queue.items.length > 0){

      const vertex = queue.dequeue();

      // break condition - destination is reached
      if (vertex == endNode){
        break;
      }

      // process adjacent nodes
      g.AdjList.get(vertex).forEach(function(adj){
        // process each adjacent node that has not been visited or queued
        if (!visited.has(adj) && queue.items.indexOf(adj) == -1){
          // add to queue, mark as visited, record parent metadata
          visited.add(adj);
          queue.enqueue(adj);
          path.set(adj, vertex);

        }

      });

    }

    return path;

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

// traversing a linked list
function ShortestPath(map, node){
   const arr = [];

   while(node){
     arr.push(node);
     node = map.get(node);
  }
  return arr.reverse();
}

// processes all vertices in queue until a desination is reached
/*
function BFS(start, destination){


  while (queue.items.length > 0){

    const vertex = queue.dequeue();

    // break condition - destination is reached
    if (vertex == destination){
      break;
    }

    // process adjacent nodes
    g.AdjList.get(vertex).forEach(function(adj){
      // process each adjacent node that has not been visited or queued
      if (!visited.has(adj) && queue.items.indexOf(adj) == -1){
        // add to queue, mark as visited, record parent metadata
        visited.add(adj);
        queue.enqueue(adj);
        pathInfo.set(adj, vertex);

      }

    })

  }

  return path;

}
*/
// main
const g = new Graph();
const startNode = "A";
const endNode = "D";

g.addVertex("A", ["B","C"]);
g.addVertex("B", ["A", "D", "E", "F"]);
g.addVertex("C", ["A","G"]);
g.addVertex("D", ["B","E"]);
g.addVertex("E", ["B","D"]);
g.addVertex("F", ["B","H"]);
g.addVertex("G", ["C","I"]);
g.addVertex("H", ["F","J", "K"])
g.addVertex("I", ["G","K"]);
g.addVertex("J", ["H"]);
g.addVertex("K", ["H","I"]);


const path = g.BFS(startNode, endNode);

path.forEach((value, key) => {
  console.log("key: " + key + " value: " + value);
})

wp = ShortestPath(path, endNode);
console.log(wp);
