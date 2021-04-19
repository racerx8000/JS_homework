process = require('process');
rdl = require('readline');



function time() {
    let run = setInterval(() => {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        rdl.cursorTo(process.stdout, 0, 6);
        process.stdout.write(`${hours}:${minutes}:${seconds}`);
    }, 1000)

    setTimeout(() => {clearInterval(run)}, 60 * 1000) 
}
time();
