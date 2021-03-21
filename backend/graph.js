const PriorityQueue = require("./queue");

class Graph {

    constructor() {
        this.nodes = [];
        this.adjacencyList = {};
    }

    addNode(node) {
        this.nodes.push(node); 
        this.adjacencyList[node] = [];
    }

    addEdge(node1, node2, duration, cost, mode) {
        this.adjacencyList[node1].push({node:node2, duration: duration, cost:cost, mode:mode});
    }

    findFastestPathWithDijkstra(startNode, endNode) {

        let times = {};
        let backtrace = [];
        let pq = new PriorityQueue();

        times[startNode] = 0;

        this.nodes.forEach(node => {
            if (node !== startNode) {
            times[node] = Infinity
            }
        });

        pq.enqueue([startNode, 0]);

        while (!pq.isEmpty()) {
            let shortestStep = pq.dequeue();
            let currentNode = shortestStep[0];
            //console.log(times);
            this.adjacencyList[currentNode].forEach(neighbor => {
                let time = times[currentNode] + neighbor.duration;
                if (time < times[neighbor.node]) {
                    times[neighbor.node] = time;
                    let city = {};
                    city.node=currentNode;
                    city.mode=neighbor.mode;
                    backtrace[neighbor.node] = city;
                    pq.enqueue([neighbor.node, time]);
                }
            });
        }

        let path = []
        let lastStep = endNode;
        while(lastStep !== startNode) {
            let city = {};
            city.city=backtrace[lastStep].node;
            city.mode=backtrace[lastStep].mode;
            city.to=lastStep;
            path.unshift(city);
            lastStep = backtrace[lastStep].node
        }
        
        const time=times[endNode];
        const h = String(Math.floor(time/60));
        const m = String(time%60);
        const duration = {h, m};
        return {path, duration};
    }

    findCheapestPathWithDijkstra(startNode, endNode) {

        let times = {};
        let backtrace = [];
        let pq = new PriorityQueue();

        times[startNode] = 0;

        this.nodes.forEach(node => {
            if (node !== startNode) {
            times[node] = Infinity
            }
        });

        pq.enqueue([startNode, 0]);

        while (!pq.isEmpty()) {
            let shortestStep = pq.dequeue();
            let currentNode = shortestStep[0];
            //console.log(times);
            this.adjacencyList[currentNode].forEach(neighbor => {
                let time = times[currentNode] + neighbor.cost;
                if (time < times[neighbor.node]) {
                    times[neighbor.node] = time;
                    let city = {};
                    city.node=currentNode;
                    city.mode=neighbor.mode;
                    backtrace[neighbor.node] = city;
                    pq.enqueue([neighbor.node, time]);
                }
            });
        }

        let path = []
        let lastStep = endNode;
        while(lastStep !== startNode) {
            let city = {};
            city.city=backtrace[lastStep].node;
            city.mode=backtrace[lastStep].mode;
            city.to=lastStep;
            path.unshift(city);
            lastStep = backtrace[lastStep].node
        }
        
        //console.log(`Path is ${path} and time is ${times[endNode]}`)
        const cost=times[endNode];
        return {path, cost};
    }

}

module.exports = Graph;