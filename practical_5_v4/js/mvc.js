let CONST = {
    CONDITION_ALL_COURSES: 1,
    POPULAR_COURSES_HTML_CONTAINER_SELECTOR: '#popular_kurs',
    NEW_COURSES_HTML_CONTAINER_SELECTOR: '#new_kurs',
    ALL_COURSES_HTML_CONTAINER_SELECTOR: '#all_kurs',
    ALL_COURSES_SAMPLE_CONTAINER: '#sample_card_cource_all',
    NEW_AND_POPULAR_COURSES_SAMPLE_CONTAINER: '#sample_card_cource_new_popular',
    LOADER_SAMPLE: '#sample_loader',
    BASE_URL: 'https://api.qa2.surdoclass.ru',
    URL_ALL_COURSES: '/api/courses?populate[0]=author&populate[1]=cover_image_full&populate[2]=ui_tile_colour&populate[3]=categories&populate[4]=promo_page&pagination[pageSize]=9&pagination[page]=',
    URL_NEW_AND_POPULAR_COURSES: '/api/course-promotions/?populate%5B0%5D=courses.course&populate%5B1%5D=courses.course.author&populate%5B2%5D=courses.course.cover_image_full&populate%5B3%5D=courses.course.cover_image_half&populate%5B4%5D=courses.course.ui_tile_colour&populate%5B5%5D=courses.course.promo_page',
}

async function req(path) {
    let url = CONST.BASE_URL + path;
    let response = await fetch(url);

    return await response.json();
}


let HomePageModel = {

    specialCourses: {
        newCourses    : [],
        popularCourses: [],
    },
    allCourses:{},
};



let Service = {

    loadSpecialCourses: async function () {
        let responseNewAndPopularCourses = await req(CONST.URL_NEW_AND_POPULAR_COURSES);
        let responseAllCourses = await req(CONST.URL_NEW_AND_POPULAR_COURSES + CONDITION_ALL_COURSES);

        // transform response
        let popularCourses = responseNewAndPopularCourses.data.find(d => d.attributes.promotionType === 'POPULAR');
        let newCourses = responseNewAndPopularCourses.data.find(d => d.attributes.promotionType === 'NEW');

        return {
            specialCourses: {
                popularCourses: popularCourses.attributes.courses,
                newCourses: newCourses.attributes.courses,
                relatedCourses: relatedCourses.attributes.courses
            },
            allCources: responseAllCourses,
        };
    }

};



let view = {
    init: function (containerSelector) {
        this.containerSelector = containerSelector;
    },
    renderCourseBlocks: function (htmlTemplateContainerId, data) {
        let templateCources = document.querySelector(htmlTemplateContainerId).innerHTML;

        let templateScript = Handlebars.compile(templateCources);
        let fillTemplateData = templateScript(data);

        let courceContainer = document.querySelector(targetHtmlContainerId);
        courceContainer.insertAdjacentHTML('beforeend', fillTemplateData);
    }
    renderAll: function ()
};



let PageController = {

    init: function (containerSelector) {
        this.model = Object.create(HomePageModel);

        this.view = Object.create(View);
        this.view.init(containerSelector);

        this.courseService = Object.create(Service);
    },

    refreshView: function () {
        console.log('refreshView')
        this.view.render(this.model);
    },

    loadSpecialCourses: async function () {

        let response = await this.courseService.loadSpecialCourses();

        this.model.specialCourses.newCourses = response.specialCourses.newCourses;
        this.model.specialCourses.popularCourses = response.specialCourses.popularCourses;
        this.model.specialCourses.newCourses = response.allCourses;

        this.refreshView();

    }

};