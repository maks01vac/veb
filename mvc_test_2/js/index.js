var CONST = {
    BASE_URL: 'https://api.qa2.surdoclass.ru',
    // URL_ALL_COURSES:'/api/courses?populate[0]=author&populate[1]=cover_image_full&populate[2]=ui_tile_colour&populate[3]=categories&populate[4]=promo_page&pagination[pageSize]=9&pagination[page]=',
    URL_NEW_AND_POPULAR_COURSES             : '/api/course-promotions/?populate%5B0%5D=courses.course&populate%5B1%5D=courses.course.author&populate%5B2%5D=courses.course.cover_image_full&populate%5B3%5D=courses.course.cover_image_half&populate%5B4%5D=courses.course.ui_tile_colour&populate%5B5%5D=courses.course.promo_page',
    NEW_AND_POPULAR_COURSES_SAMPLE_CONTAINER: '#sample_card_cource_new_popular',
};

async function req(path) {
    let url = CONST.BASE_URL + path;
    let response = await fetch(url);

    return await response.json();
}

var View = {

    init: function (containerSelector) {
        this.containerSelector = containerSelector;
    },

    render: function (data) {
        let template = document.querySelector(CONST.NEW_AND_POPULAR_COURSES_SAMPLE_CONTAINER).innerHTML;
        let renderTemplate = Handlebars.compile(template);

        let newCoursesHtml = renderTemplate(data.specialCourses.newCourses);

        let popularCoursesHtml = renderTemplate(data.specialCourses.popularCourses);

        var newCourseEl = document.createElement('div');
        var popularCourseEl = document.createElement('div');

        newCourseEl.innerHTML = newCoursesHtml;
        popularCourseEl.innerHTML = popularCoursesHtml;

        var targetHtml = document.querySelector(this.containerSelector);
        targetHtml.prepend(newCourseEl)
        targetHtml.prepend(popularCourseEl)
    }
};

var HomePageModel = {

    specialCourses: {
        newCourses    : [],
        popularCourses: [],
    },
};

var Service = {

    loadSpecialCourses: async function () {
        var response = await req(CONST.URL_NEW_AND_POPULAR_COURSES);
        // TODO: handle NO data

        // transform response
        var popularCourses = response.data.find(d => d.attributes.promotionType === 'POPULAR');
        var newCourses = response.data.find(d => d.attributes.promotionType === 'NEW');
        var relatedCourses = response.data.find(d => d.attributes.promotionType === 'RELATED');

        return {
            popularCourses: popularCourses.attributes.courses,
            newCourses    : newCourses.attributes.courses,
            relatedCourses: relatedCourses.attributes.courses
        }
    }

};

var PageController = {

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

        var response = await this.courseService.loadSpecialCourses();

        this.model.specialCourses.newCourses = response.newCourses;
        this.model.specialCourses.popularCourses = response.popularCourses;

        this.refreshView();

        // var response = await req(CONST.URL_NEW_AND_POPULAR_COURSES);
        // // TODO: handle NO data
        //
        // // transform response
        // var popularCourses = response.data.find(d => d.attributes.promotionType === 'POPULAR');
        // var newCourses = response.data.find(d => d.attributes.promotionType === 'NEW');
        //
        // // fill data
        // this.model.specialCourses.newCourses = newCourses.attributes.courses;
        // this.model.specialCourses.popularCourses = popularCourses.attributes.courses;

    }

};

var pageController1 = Object.create(PageController);
pageController1.init('.container1');
pageController1.loadSpecialCourses();
// pageController1.refreshView();