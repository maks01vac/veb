const CONST = {
    POPULAR_COURSES_HTML_CONTAINER_SELECTOR: '#popular_kurs',
    NEW_COURSES_HTML_CONTAINER_SELECTOR:'#new_kurs',
    ALL_COURSES_HTML_CONTAINER_SELECTOR:'#all_kurs',
    BASE_URL: 'https://api.qa2.surdoclass.ru',
}

function createAllCourceBlocksSample(data) {
    var templateAllCources = document.querySelector('#sample_card_cource_all').innerHTML;
    var templateScript = Handlebars.compile(templateAllCources);
    var fillTemplateAllData = templateScript(data);
    var courceContainerALL = document.querySelector(CONST.ALL_COURSES_HTML_CONTAINER_SELECTOR);
    courceContainerALL.innerHTML = fillTemplateAllData;
}


async function addCourceBlocksAndFillsWithData() {
    var courceUrlAllBlocks = '/api/courses?populate[0]=author&populate[1]=cover_image_full&populate[2]=ui_tile_colour&populate[3]=categories&populate[4]=promo_page';
    var coursesUrl = CONST.BASE_URL + courceUrlAllBlocks;
    let response = await fetch(coursesUrl);
    let content = await response.json();
    console.log(content.data.slice(0,9));
    createAllCourceBlocksSample(content);
}

addCourceBlocksAndFillsWithData();

















// function createNewCourceBlocksSample(data){
//     var templateNewAndPopularCource = document.querySelector('#sample_card_cource_new_popular').innerHTML;
//     var templateScript = Handlebars.compile(templateNewAndPopularCource);
//     var fillTemplateNewData = templateScript(data);
//     var courceContainerNew = document.querySelector(CONST.NEW_COURSES_HTML_CONTAINER_SELECTOR);
//     courceContainerNew.innerHTML = fillTemplateNewData;
// }


// function createPopularCourceBlocksSample(data) {
//     var templateNewAndPopularCource = document.querySelector('#sample_card_cource_new_popular').innerHTML;
//     var templateScript = Handlebars.compile(templateNewAndPopularCource);
//     var fillTemplatePopularData = templateScript(data);
//     var courceContainerPopular = document.querySelector(CONST.POPULAR_COURSES_HTML_CONTAINER_SELECTOR);
//     courceContainerPopular.innerHTML = fillTemplatePopularData;
// }


// function addNewAndPopularBlocks(jsonData){
//     let jsonNew,
//         jsonPopular;
//     for (let i = 0; i < jsonData.data.length; i++) {
//         if (jsonData.data[i].attributes.promotionType == 'NEW') {
//             jsonNew = jsonData.data[i].attributes;
//             createNewCourceBlocksSample(jsonNew);

//         }
//         else if (jsonData.data[i].attributes.promotionType == 'POPULAR') {
//             jsonPopular = jsonData.data[i].attributes
//             createPopularCourceBlocksSample(jsonPopular)
//         }
//     }
// }



// async function addCourceBlocksAndFillsWithData() {
//     let courceUrlNewAndPopular = '/api/course-promotions/?populate%5B0%5D=courses.course&populate%5B1%5D=courses.course.author&populate%5B2%5D=courses.course.cover_image_full&populate%5B3%5D=courses.course.cover_image_half&populate%5B4%5D=courses.course.ui_tile_colour&populate%5B5%5D=courses.course.promo_page';
//     let UrlNewAndPopularCource = CONST.BASE_URL + courceUrlNewAndPopular;
//     let responseNewAndPopular = await fetch(UrlNewAndPopularCource);
//     let jsonNewAndPopular = await responseNewAndPopular.json();
//     addNewAndPopularBlocks(jsonNewAndPopular);
//     // let jsonNew,
//     //     jsonPopular;
//     // for (let i = 0; i < jsonNewAndPopular.data.length; i++) {
//     //     if (jsonNewAndPopular.data[i].attributes.promotionType == 'NEW') {
//     //         jsonNew = jsonNewAndPopular.data[i].attributes;
//     //         createNewCourceBlocksSample(jsonNew);

//     //     }
//     //     else if (jsonNewAndPopular.data[i].attributes.promotionType == 'POPULAR') {
//     //         jsonPopular = jsonNewAndPopular.data[i].attributes
//     //         createPopularCourceBlocksSample(jsonPopular)
//     //     }
//     // }
// }


//addCourceBlocksAndFillsWithData();

// let jsonNew,
//         jsonPopular;
//     for (let i = 0; i < jsonNewAndPopular.data.length; i++) {
//         if (jsonNewAndPopular.data[i].attributes.promotionType == 'NEW') {
//             jsonNew = jsonNewAndPopular.data[i].attributes;
//             createNewCourceBlocksSample(jsonNew);

//         }
//         else if (jsonNewAndPopular.data[i].attributes.promotionType == 'POPULAR') {
//             jsonPopular = jsonNewAndPopular.data[i].attributes
//             createPopularCourceBlocksSample(jsonPopular)
//         }
//     }