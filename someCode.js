function divide(a, b) {
    if (b == 0) {
        throw new Error('0 is not acceptable!')
    }

    return a / b;
}

function multiply(a, b) {
    return a * b;
}
function calculate(a, b, c) {
    let mulitplyRes = multiply(a, b);
    return divide(mulitplyRes, c);
}
