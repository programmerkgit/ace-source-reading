class A {
    a = () => {
        console.log(this);
    };
}

const l = new A();
[1, 2, 3].forEach(l.a);
