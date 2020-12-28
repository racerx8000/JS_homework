//завдання вивести отакий порядок цифер: [ 1, 6, 2, 7, 3, 8, 4, 9, 5, 0 ]
//

const first = [1, 2, 3, 4, 5]; 
const second = [6, 7, 8, 9, 0]; 

const resultArray  = [];

second.forEach((number, index) => {
    resultArray.push(first[index], number)
})

console.log(resultArray);