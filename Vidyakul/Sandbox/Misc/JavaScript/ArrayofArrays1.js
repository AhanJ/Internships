let myList = [[1,2,3],[4,5,6],[7,8,9]]

let i = 0
let j = 0
let flag = 0

let x = 5

s: for(i = 0; i < myList.length; i++)

{
    for(j = 0; j < myList[i].length; j++)

    {
        if(myList[i][j] == x)

        {
            flag = 1
            break s        }
    }
}

if(flag == 1)

{
    console.log(x + ' Found at Index ' + j + ' of Array ' + i)
}

else

{
    console.log(x + ' Not Found')
}