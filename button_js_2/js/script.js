const bodyElement = document.querySelector('body');
const newDiv = document.createElement('div');
newDiv.classList.add('main');
bodyElement.append(newDiv);
const newButton = [];
for (let i = 0; i < 10; i++) {
    newButton[i] = document.createElement('button');
    newButton[i].classList.add('active');
    newDiv.append(newButton[i]);
    newButton[i].append(i + 1);
}

const amount_button = document.getElementsByClassName('active').length
console.log(amount_button);

for (let i = 0; i < amount_button; i++) {
    newButton[i].onclick = function but() {
        alert('Это кнопка ' + (i + 1));
    };
}
