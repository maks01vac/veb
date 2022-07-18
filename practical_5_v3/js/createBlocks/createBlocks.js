const CONST = {
    POPULAR_COURSES_HTML_CONTAINER_SELECTOR: '#popular_kurs',
    NEW_COURSES_HTML_CONTAINER_SELECTOR:'#new_kurs',
    ALL_COURSES_HTML_CONTAINER_SELECTOR:'#all_kurs',
    ALL_COURSES_SAMPLE_CONTAINER:'#sample_card_cource_all',
    NEW_AND_POPULAR_COURSES_SAMPLE_CONTAINER:'#sample_card_cource_new_popular',
    LOADER_SAMPLE:'#sample_loader',
    BASE_URL: 'https://api.qa2.surdoclass.ru',
    URL_ALL_COURSES:'/api/courses?populate[0]=author&populate[1]=cover_image_full&populate[2]=ui_tile_colour&populate[3]=categories&populate[4]=promo_page&pagination[pageSize]=9&pagination[page]=',
    URL_NEW_AND_POPULAR_COURSES:'/api/course-promotions/?populate%5B0%5D=courses.course&populate%5B1%5D=courses.course.author&populate%5B2%5D=courses.course.cover_image_full&populate%5B3%5D=courses.course.cover_image_half&populate%5B4%5D=courses.course.ui_tile_colour&populate%5B5%5D=courses.course.promo_page',
}

function createCourceBlocksSample(idSampleContainer,data,idContainerHtml) {
    let templateCources = document.querySelector(idSampleContainer).innerHTML;
    let templateScript = Handlebars.compile(templateCources);
    let fillTemplateData = templateScript(data);
    let courceContainer = document.querySelector(idContainerHtml);
    courceContainer.insertAdjacentHTML ('beforeend',fillTemplateData);
}

function createNewAndPopularBlocks(dataCourses){
        let dataNewCourses,
            dataPopularCourses;
        for (let i = 0; i < dataCourses.data.length; i++) {
            if (dataCourses.data[i].attributes.promotionType == 'NEW') {
                dataNewCourses = dataCourses.data[i].attributes;
                createCourceBlocksSample(CONST.NEW_AND_POPULAR_COURSES_SAMPLE_CONTAINER,dataNewCourses,CONST.NEW_COURSES_HTML_CONTAINER_SELECTOR);
    
            }
            else if (dataCourses.data[i].attributes.promotionType == 'POPULAR') {
                dataPopularCourses = dataCourses.data[i].attributes
                createCourceBlocksSample(CONST.NEW_AND_POPULAR_COURSES_SAMPLE_CONTAINER,dataPopularCourses,CONST.POPULAR_COURSES_HTML_CONTAINER_SELECTOR);
            }
        } 
    }
    