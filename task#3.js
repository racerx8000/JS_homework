// Дано 2 масиви, Овочі та Фрукти:
// Зробити за допомогою   if  без використання циклів 
// пошук до якого масиву належить значення 'cucumber',
// вивівши в консоль назву масиву.

const vegetables = ['potato', 'tomato', 'cucumber'];
const fruits = ['apple', 'pineapple', 'banana'];


const abc = (a) => {
    if (vegetables.includes(a)) {
        return 'vegetables';
    } else if (fruits.includes(a)) {
        return 'fruits'
    }
    return ('unknown')
}

let result = abc('cucuber')

console.log(result);