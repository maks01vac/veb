function infoCources(){
var a = [{
    img:"images/kurs_1.png",
    author:"автор: Александра Иванова",
    title:"Сделаем прекрасный домашний шоколад",
    price:0,
    background:"#FAD1DB",
},
{
    img:"images/kurs_2.png",
    author:"автор: Александра Иванова",
    title:"Сделаем прекрасный домашний шоколад",
    price:1800,
    background:"#E5E5E5",
},
{
    img:"images/kurs_3.png",
    author:"автор: Александра Иванова",
    title:"Медитация. Основы",
    price:1800,
    background:"#F6ECE3",
}];
return a;
}

function prepareCources (cource){
    console.log(cource.length);
 }
prepareCources(infoCources);



// {
//     
//     for (let i=0; i<cource.lenght;i++){
//         elementsCource[i]=cource;
//     }
//     console.log(elementsCource);
// }




// function dynamicHtml(){

//     var dataCources = infoCources();

//     var prepareCourcesHtml = prepareCources(dataCources);

//     var insertCourcesHtml = insertCources(prepareCourcesHtml);

//  }

// dynamicHtml();