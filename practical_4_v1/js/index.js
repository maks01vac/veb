async function getDataCources() {
    let response = await fetch('https://api.qa2.surdoclass.ru/api/courses?populate[0]=author&populate[1]=cover_image_full&populate[2]=ui_tile_colour&populate[3]=categories&populate[4]=promo_page');
    let content = await response.json();
    let contentData = content.data
    console.log(content.data);
    return contentData;
}

function innerDataInHtml(data) {
    let mainCourceBlock = document.querySelector('.complication_kurs');
    mainCourceBlock.innerHTML = data;
}
innerDataInHtml(getDataCources());