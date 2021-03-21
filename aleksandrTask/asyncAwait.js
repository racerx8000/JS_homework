// Написати функцію timeout, яка приймає 1 аргумент - кількість мілісекунд.
// timeout має повертати "resolved" за допомогою async/await, через задану
//  кількість мілісекунд.

async function timeout(msec) {
  const promise = new Promise((resolve) => {
    setTimeout(() => resolve('resolved'), msec);
  })
  return promise
}

const result = await timeout(1000)

console.log(result);
