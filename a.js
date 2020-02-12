A = function () {
    this.d = 10;
}
A.prototype.b = 3
const a = new A()
console.log(a, a.d, a.b, A.prototype, A)
