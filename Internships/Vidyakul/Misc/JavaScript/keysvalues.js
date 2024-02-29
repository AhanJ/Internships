var data = {

    "id": 7,
    "name": "Ahan7",
    "address": "Delhi7",
    "email": "abc7@gmail.com",
    "phone": 7777777777
}

let key = Object.keys(data)
let val = Object.values(data)
let sval = JSON.stringify(val)

console.log(Object.keys(key))
console.log(sval)

console.log(Object.values(val))

var keyval = []

for(i = 1; i < key.length; i++)

{
    keyval [i-1] = key[i] + " = " + JSON.stringify(val[i])
}

console.log(keyval)