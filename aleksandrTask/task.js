// Написати функцію, що огортає setTimeout() в Promise.
// При виклику вона приймає один параметр - кількість мілісекунд.
// Функція повертає Promise, що має перейти в стан resolved через задану
// кількість мілісекунд.

function timeout(msec) {
  return new Promise((resolve) => {
    setTimeout(() => resolve("resolved"), msec);
  })
}

timeout(2000).then((result) => console.log(result));