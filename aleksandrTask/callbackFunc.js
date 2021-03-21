// Написати функцію timeout, яка приймає 1 аргумент - кількість мілісекунд.
// timeout має повертати "resolved" за допомогою callback функції, 
// через задану кількість мілісекунд.


const timeout = function (msec, callback) {
  setTimeout(() => {
    callback('resolved')
  }, msec);

};

timeout(3 * 1000, (result) => console.log(result));
