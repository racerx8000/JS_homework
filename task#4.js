// Дано 2 масиви, Овочі та Фрукти:
// Зробити за допомогою   switch / case  без використання циклів 
// пошук до якого масиву належить значення 'cucumber',
// вивівши в консоль назву масиву.

const vegetables = ['potato', 'tomato', 'cucumber'];
const fruits = ['apple', 'pineapple', 'banana'];

const func = (a) => {
    if (vegetables.includes(a)) {
        return (true);
    } else if (fruits.includes(a)) {
        return (false);
    }
}
let check = func('cucumber');

switch (check) {
    case true:
        console.log('vegetables');
        break;
    default: console.log('unknown');
}