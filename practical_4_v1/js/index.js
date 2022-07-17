const CONST = {
    POPULAR_COURSES_HTML_CONTAINER_SELECTOR: '.complication_kurs',
    BASE_URL: 'https://api.qa2.surdoclass.ru',
}

function createCourceBlocksSample(data) {
    var template = document.querySelector('#handlebars-demo').innerHTML;
    console.log(template);
    var templateScript = Handlebars.compile(template);
    var html = templateScript(data);
    console.log(html);
    var courceContainer = document.querySelector(CONST.POPULAR_COURSES_HTML_CONTAINER_SELECTOR);
    courceContainer.innerHTML = html;
}

async function addCourceBlocksAndFillsWithData() {
    var coursesUrl = CONST.BASE_URL + '/api/courses?populate[0]=author&populate[1]=cover_image_full&populate[2]=ui_tile_colour&populate[3]=categories&populate[4]=promo_page';
    let response = await fetch(coursesUrl);
    let content = await response.json();
    console.log(content);
    createCourceBlocksSample(content);
}

addCourceBlocksAndFillsWithData();
