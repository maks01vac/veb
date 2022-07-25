let CONST = {
    CONDITION_ALL_COURSES: 1,
    POPULAR_COURSES_HTML_CONTAINER_SELECTOR: '#popular_kurs',
    NEW_COURSES_HTML_CONTAINER_SELECTOR: '#new_kurs',
    ALL_COURSES_HTML_CONTAINER_SELECTOR: '#all_kurs',
    ALL_COURSES_SAMPLE_CONTAINER: '#sample_card_cource_all',
    NEW_AND_POPULAR_COURSES_SAMPLE_CONTAINER: '#sample_card_cource_new_popular',
    LOADER_SAMPLE: '#sample_loader',
    LOADER_CLASS_NAME: '.loader',
    BASE_URL: 'https://api.qa2.surdoclass.ru',
    URL_ALL_COURSES: '/api/courses?populate[0]=author&populate[1]=cover_image_full&populate[2]=ui_tile_colour&populate[3]=categories&populate[4]=promo_page&pagination[pageSize]=9&pagination[page]=',
    URL_NEW_AND_POPULAR_COURSES: '/api/course-promotions/?populate%5B0%5D=courses.course&populate%5B1%5D=courses.course.author&populate%5B2%5D=courses.course.cover_image_full&populate%5B3%5D=courses.course.cover_image_half&populate%5B4%5D=courses.course.ui_tile_colour&populate%5B5%5D=courses.course.promo_page',
}

async function req(path, pageNumber) {
    let url = CONST.BASE_URL + path + pageNumber;
    let response = await fetch(url);

    return await response.json();
}


var View = {
    renderTemplate: function (htmlTemplateContainerId, targetHtmlContainerId, data) {

        let templateCources = document.querySelector(htmlTemplateContainerId).innerHTML;

        let templateScript = Handlebars.compile(templateCources);
        let fillTemplateData = templateScript(data);

        let courceContainer = document.querySelector(targetHtmlContainerId);
        courceContainer.insertAdjacentHTML('beforeend', fillTemplateData);
    },
    onClickButtonAllCourses: async function (func) {
        let btn = document.querySelector('.button');

        btn.addEventListener('click', async function () {
            btn.classList.add('none');
            let br = await func();
            btn.classList.remove('none');

        })

    },
    render: function (data) {
        this.renderTemplate(CONST.NEW_AND_POPULAR_COURSES_SAMPLE_CONTAINER, CONST.NEW_COURSES_HTML_CONTAINER_SELECTOR, data.specialCourses.newCourses);
        this.renderTemplate(CONST.NEW_AND_POPULAR_COURSES_SAMPLE_CONTAINER, CONST.POPULAR_COURSES_HTML_CONTAINER_SELECTOR, data.specialCourses.popularCourses);
        this.renderTemplate(CONST.ALL_COURSES_SAMPLE_CONTAINER, CONST.ALL_COURSES_HTML_CONTAINER_SELECTOR, data.allCourses);
    },

};

var HomePageModel = {

    specialCourses: {
        newCourses: [],
        popularCourses: [],
    },
    allCourses: {},
};

var Service = {

    loadCourses: async function () {

        var response = await req(CONST.URL_NEW_AND_POPULAR_COURSES);
        let responseAllCourses = await req(CONST.URL_ALL_COURSES, CONST.CONDITION_ALL_COURSES);
        // TODO: handle NO data

        // transform response
        var popularCourses = response.data.find(d => d.attributes.promotionType === 'POPULAR');
        var newCourses = response.data.find(d => d.attributes.promotionType === 'NEW');
        var relatedCourses = response.data.find(d => d.attributes.promotionType === 'RELATED');

        return {
            specialCourses: {
                popularCourses: popularCourses.attributes.courses,
                newCourses: newCourses.attributes.courses,
                relatedCourses: relatedCourses.attributes.courses
            },
            allCourses: responseAllCourses,
        }

    }

};

var PageController = {

    init: function () {
        this.model = Object.create(HomePageModel);

        this.view = Object.create(View);

        this.courseService = Object.create(Service);

    },

    refreshView: function () {
        this.view.render(this.model);
    },

    loadCourses: async function () {
        let that = this;

        this.view.renderTemplate(CONST.LOADER_SAMPLE, CONST.POPULAR_COURSES_HTML_CONTAINER_SELECTOR);
        this.view.renderTemplate(CONST.LOADER_SAMPLE, CONST.NEW_COURSES_HTML_CONTAINER_SELECTOR);
        this.view.renderTemplate(CONST.LOADER_SAMPLE, CONST.ALL_COURSES_HTML_CONTAINER_SELECTOR);

        var response = await this.courseService.loadCourses();

        this.model.specialCourses.newCourses = response.specialCourses.newCourses;
        this.model.specialCourses.popularCourses = response.specialCourses.popularCourses;
        this.model.allCourses = response.allCourses

        this.refreshView();

        let loader = document.querySelectorAll(CONST.LOADER_CLASS_NAME);
        loader.forEach(loaderNumber => loaderNumber.remove());

        this.view.onClickButtonAllCourses(async function () {

            

            try {
                CONST.CONDITION_ALL_COURSES++;

                that.view.renderTemplate(CONST.LOADER_SAMPLE, CONST.ALL_COURSES_HTML_CONTAINER_SELECTOR);

                let pageNextResponseAllCourses = await req(CONST.URL_ALL_COURSES, CONST.CONDITION_ALL_COURSES);

                that.view.renderTemplate(CONST.ALL_COURSES_SAMPLE_CONTAINER, CONST.ALL_COURSES_HTML_CONTAINER_SELECTOR, pageNextResponseAllCourses);

                document.querySelector(CONST.LOADER_CLASS_NAME).remove();

                if (CONST.CONDITION_ALL_COURSES >= pageNextResponseAllCourses.meta.pagination.pageCount) document.querySelector('#button').remove();
            } catch {
                alert('ошибка, попробуйте еще')
            }


        });
    },
};


var pageController1 = Object.create(PageController);
pageController1.init();
pageController1.loadCourses();

// var pageController2 = Object.create(PageController);
// pageController2.init('#popular_kurs');
// pageController2.loadSpecialCourses();