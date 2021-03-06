export {};

declare global {
  interface Array<T> {
    next(): Array<T>;
    prev(): Array<T>;
    current: number;
  }
}

Array.prototype.next = function () {
  if (!(this.current + 1 in this)) return false;
  return this[++this.current];
};

Array.prototype.prev = function () {
  if (!(this.current - 1 in this)) return false;
  return this[--this.current];
};
Array.prototype.current = 0;
