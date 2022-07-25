const button = document.querySelectorAll('.button');
const amount_button = document.getElementsByClassName('button').length
console.log(amount_button);
for (let i = 0; i < amount_button; i++) {
    button[i].onclick = function but() {
        alert('Это кнопка ' + (i + 1));
    };
}
