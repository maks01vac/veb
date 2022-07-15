
//----------------------------------------------------------------
// JSO
function addSampleHTML(data) {
    var template = document.querySelector('#handlebars-demo').innerHTML;
    console.log(template);
    var templateScript = Handlebars.compile(template);
    var html = templateScript(data);
    console.log(html);
    document.body.innerHTML = html;
}

async function getDataCources() {
    let response = await fetch('https://api.qa2.surdoclass.ru/api/courses?populate[0]=author&populate[1]=cover_image_full&populate[2]=ui_tile_colour&populate[3]=categories&populate[4]=promo_page');
    let content = await response.json();
    console.log(content);
    addSampleHTML(content); 
}
getDataCources();

// var dataInfo = getDataCources();
// console.log(dataInfo);
// //----------------------------------------------------------------

// // // Добавление в body
// document.body.innerHTML = html;