const bus = {
  _events: {},
  $on(event, handler) {
    if (!this._events[event]) this._events[event] = [];
    this._events[event].push(handler);
  },
  $off(event, handler) {
    if (!this._events[event]) return;
    this._events[event] = this._events[event].filter(h => h !== handler);
  },
  $emit(event, ...args) {
    if (!this._events[event]) return;
    this._events[event].forEach(h => h(...args));
  }
};

export { bus as default };