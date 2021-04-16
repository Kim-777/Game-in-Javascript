'use strict'

function test1() {
    const x = 22222;

    test2();
}


function test2() {
    console.log(x);
}


test1();