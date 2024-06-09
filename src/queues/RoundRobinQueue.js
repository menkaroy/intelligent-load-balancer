class RoundRobinQueue {
  constructor() {
    this.queues = {};
    this.keys = [];
    this.currentKeyIndex = 0;
  }

  addQueue(key) {
    if (!this.queues[key]) {
      this.queues[key] = [];
      this.keys.push(key);
    }
  }

  //   enqueue(key, request) {
  //     if (this.queues[key]) {
  //       this.queues[key].push(request);
  //     }
  //   }
  enqueue(request) {
    const currentKey = this.keys[this.currentKeyIndex];
    this.queues[currentKey].push(request);
    this.currentKeyIndex = (this.currentKeyIndex + 1) % this.keys.length;
  }

  //   dequeue() {
  //     if (this.keys.length === 0) return null;
  //     const currentKey = this.keys[this.currentKeyIndex];
  //     const request = this.queues[currentKey].shift();
  //     this.currentKeyIndex = (this.currentKeyIndex + 1) % this.keys.length;
  //     return request;
  //   }
  dequeue() {
    const currentKey = this.keys[this.currentKeyIndex];
    const request = this.queues[currentKey].shift();
    this.currentKeyIndex = (this.currentKeyIndex + 1) % this.keys.length;
    return request;
  }

  size() {
    return this.keys.reduce((total, key) => total + this.queues[key].length, 0);
  }
}

module.exports = RoundRobinQueue;
