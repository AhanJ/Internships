let myList = [[1,2,3],[4,5,6],[7,8,9]]

let i = 0
let j = 0
let x = 6

// using no for loop

myList.forEach(() => {

    myList[i].forEach(() => {

        if(myList[i][j] == x)

        {
            console.log(x + ' Found at Index ' + j + ' of Array ' + i)
        }

        j++
    })

    j = 0

    i++
})

// using inner for loop

// myList.forEach(() => {

//     for(j = 0; j < myList[i].length; j++)
    
//     {   
//         if(myList[i][j] == x)

//         {
//             console.log(x + ' Found at Index ' + j + ' of Array ' + i)
//         }
//     }

//     i++
// })

// using outer for loop

// for(i = 0; i < myList.length; i++)

// {
//     myList[i].forEach(() => {


//         if(myList[i][j] == x)

//         {
//             console.log(x + ' Found at Index ' + j + ' of Array ' + i)
//         }

//         j++  
//     })

//     j = 0;
// }