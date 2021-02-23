// Написати функцію timeout, яка приймає 1 аргумент - кількість мілісекунд.
// timeout має повертати "resolved" за допомогою callback функції, 
// через задану кількість мілісекунд.


const timeout = function (msec, callback) {
  const result = setTimeout(() => {
  console.log('resloved');
  }, msec);
  callback(result);
};

timeout(3 * 1000, function() {
  return;
});
