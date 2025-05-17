const calculator = {
    add,
    subtract,
    multiply,
    divide
}

function handleSubmit(event){
    event.preventDefault()
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const action = event.submitter.dataset.action;
    const regexValidator = /^[0-9]*\.?[0-9]+$/;
    let validationResult = null;
    if(!regexValidator.test(data.num1) || !regexValidator.test(data.num2)){
        validationResult = 'Please enter valid numbers'
    } else if(+data.num2 === 0 && action == 'divide'){
        validationResult = "Can't divide by 0";
    }
    if(validationResult){
        const message = document.querySelector('.message');
        message.textContent = validationResult;
        if(message.classList.contains('message-error')) return;
        message.classList.add('message-error');
        return;
    }else{
        const message = document.querySelector('.message');
        message.textContent = '';
        message.classList.remove('message-error');
    }
    const result = calculator[action](+data.num1, +data.num2);
    const message = document.querySelector('#result');
    message.textContent = result;
}


function add(num1, num2){
    return num1 + num2;
}

function subtract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    return num1 / num2;
}