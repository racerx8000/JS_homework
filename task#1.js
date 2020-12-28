//Відібрати парні цифри та вивести одним рядком.
//Очікуваний результат:
//2468

const data = '21345A67098';
const b = data.split('');
const a = b.map(value => Number(value));
const c = a.filter(value => Number.isInteger(value) && value > 0);
const d = c.filter(value => value % 2 == 0);
const e = d.join('');
console.log(e);