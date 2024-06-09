class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(request, priority) {
    this.queue.push({ request, priority });
    this.queue.sort((a, b) => b.priority - a.priority);
  }

  //   dequeue() {
  //     return this.queue.shift().request;
  //   }
  dequeue() {
    if (this.queue.length > 0) {
      return this.queue.shift().request;
    } else {
      return null; // or throw an error, depending on your application logic
    }
  }

  size() {
    return this.queue.length;
  }
}

module.exports = PriorityQueue;
