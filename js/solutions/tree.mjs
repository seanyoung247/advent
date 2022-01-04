
class Node {
    constructor(value) {
        this._value = value;
        this._children = [];
        this._parent = null;
    }

    get children() { return this._children; }
    get parent() { return this._parent; }
    get value() { return this._value; }
    set value(val) { this._value = val; }
    
}