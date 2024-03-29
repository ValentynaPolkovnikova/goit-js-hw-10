import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const inputText = document.querySelector(".label-form");

function delayText(event) {
    event.preventDefault();
    const delayValue = parseInt(inputText.value);
    const inputDelay = document.querySelector('input[name="state"]:checked');

    if (!inputDelay) {
        return;
    }
    
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (inputDelay.value === 'fulfilled') {
                resolve(delayValue);
            } else {
                reject(delayValue);
            }
        }, delayValue);
    });
    promise.then(handlerSuccess).catch(handlerError);
    inputText.value = '';
    const radioButtons = document.querySelectorAll('input[name="state"]');
    radioButtons.forEach(button => {
        button.checked = false;
    });
}
form.addEventListener('submit', delayText);

function handlerSuccess(delay) {
    iziToast.show({
        titleColor: '#fff',
        messageColor: '#fff',
        message: `✅ Fulfilled promise in ${delay}ms`,
        closeOnEscape: true,
        position: 'topRight',
        backgroundColor: '#59a10d',
    });
}

function handlerError(delay) {
    iziToast.show({
        titleColor: '#fff',
        messageColor: '#fff',
        message: `❌ Rejected promise in ${delay}ms`,
        closeOnEscape: true,
        position: 'topRight',
        backgroundColor: '#ef4040',
    });
}