const button=document.querySelectorAll('.button');
for(let i=0; i<10; i++){
    button[i].onclick =function but(){
    alert('Это кнопка '+(i+1));
};
}