function add() {
    var x = document.forms[0].elements[0].value;
    var y = document.forms[0].elements[1].value;
    var a = parseInt(x);
    var b = parseInt(y);
    var c = a + b;
    console.log(document.forms[0].elements[0].value);
    console.log(document.forms[0].elements[1].value);
    console.log(c);
    document.getElementById("para").innerHTML = c;
    document.getElementById("para").className = "answer";
}

function sub() {
    var x = document.forms[0].elements[0].value;
    var y = document.forms[0].elements[1].value;
    var a = parseInt(x);
    var b = parseInt(y);
    var c = a - b;
    console.log(document.forms[0].elements[0].value);
    console.log(document.forms[0].elements[1].value);
    console.log(c);
    document.getElementById("para").innerHTML = c;
    document.getElementById("para").className = "answer";
}

function mul() {
    var x = document.forms[0].elements[0].value;
    var y = document.forms[0].elements[1].value;
    var a = parseInt(x);
    var b = parseInt(y);
    var c = a * b;
    console.log(document.forms[0].elements[0].value);
    console.log(document.forms[0].elements[1].value);
    console.log(c);
    document.getElementById("para").innerHTML = c;
    document.getElementById("para").className = "answer";
}

function div() {
    var x = document.forms[0].elements[0].value;
    var y = document.forms[0].elements[1].value;
    var a = parseInt(x);
    var b = parseInt(y);
    var c = a / b;
    console.log(document.forms[0].elements[0].value);
    console.log(document.forms[0].elements[1].value);
    console.log(c);
    document.getElementById("para").innerHTML = c;
    document.getElementById("para").className = "answer";
}

function pow(){
    var x = document.forms[0].elements[0].value;
    var y = document.forms[0].elements[1].value;
    var a = parseInt(x);
    var b = parseInt(y);
    var c = Math.pow(a, b);
    console.log(document.forms[0].elements[0].value);
    console.log(document.forms[0].elements[1].value);
    console.log(c);
    document.getElementById("para").innerHTML = c;
    document.getElementById("para").className = "answer";
}

document.addEventListener("DOMContentLoaded", setup);

function setup() {
    var oneBox = document.forms[0];
    document.forms[0].addEventListener("keypress", isValid);
}

function isValid(x) {
    var num = "0123456789";
    console.log(num);
    console.log(x.key);
    console.log(document.forms[0].elements[0]);
}
