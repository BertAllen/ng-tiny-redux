function Emitter () {
  this.listeners = {}
}

Emitter.prototype.on = function (message, callback) {
  this.listeners[message] = this.listeners[message] || []
  this.listeners[message].push(callback)
}

Emitter.prototype.off = function (message, callback) {
  if (!this.listeners[message]) { return }
  let i = this.listeners[message].indexOf(callback)
  this.listeners[message].splice(i, 1)
}

Emitter.prototype.CHANGE = function (message, payload) {
  this.emit(message, payload)
}

Emitter.prototype.emit = function (message, payload) {
  for (var f in this.listeners[message]) {
    if (typeof this.listeners[message][f] == 'function') {
      this.listeners[message][f](payload)
    }
  }
}
