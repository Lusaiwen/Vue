var data = {
    arr: [1,2,3],
    obj: {
        name: 'lusaiwen',
        age: 18,
        lu: {
            name: 'dsa',
            age: 20
        }
    },
    name: 'lusaiwen'
}

var arrPRo = Array.prototype;
var arrayMethods = Object.create(arrPRo);
['push', 'pop','unshift', 'shift', 'sort', 'splice', 'reverse'].forEach(method => {
    arrayMethods[method] = function (){
        arrPRo[method].call(this, ...arguments);
        render();
    }
})

function defineReactive(data, key, value) {
    obsever(value);
    Object.defineProperty(data, key, {
        get(){
            console.log('du');
            return value;
        },
        set(newVal) {
            console.log('xie');
            if(value = newVal) {
                return ;
            }
            value = newVal;
            render();
        }
    })
}

function render(){
    console.log('页面渲染了');
}

function obsever(data){
    if(Array.isArray(data)){
        data.__proto__ = arrayMethods;
        return;
    }
    if(typeof data === 'object'){
        for (const key in data) {
            defineReactive(data, key, data[key]);
        }
    }
}

function $set(data, key, value) {
    if(Array.isArray(data)){
        data.splice(key, 1, value);
        return value;
    }
    defineReactive(data, key, value);
    render();
    return value;
}

function $delete(data, key) {
    if(Array.isArray(data)){
        data.splice(key, 1);
        return;
    }
    delete data[key];
    render();
    
}

obsever(data);

