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


function renderTemplate(htmlTemplateContainerId, targetHtmlContainerId, data, createContainer = null) {

    let templateCources = document.querySelector(htmlTemplateContainerId).innerHTML;
    let templateScript = Handlebars.compile(templateCources);
    let fillTemplateData = templateScript(data);

    if (createContainer != null) {


        createContainer.innerHTML = fillTemplateData;
    }
    else {
        createContainer = document.createElement('div');

        createContainer.innerHTML = fillTemplateData;

        let courceContainer = document.querySelector(targetHtmlContainerId);

        courceContainer.append(createContainer);
    }

    return createContainer;
}

var LoaderView = {
    init: function (idTemplateContainer, targetHtmlContainerId) {
        this.idTemplateContainer = idTemplateContainer;
        this.targetHtmlContainerId = targetHtmlContainerId;
    },
    render: function () {
        renderTemplate(this.idTemplateContainer, this.targetHtmlContainerId);
    },
}

// var ViewButtonNext = {

//     init: function (idTemplateContainer, targetHtmlContainerId) {

//         this.idTemplateContainer = idTemplateContainer;
//         this.targetHtmlContainerId = targetHtmlContainerId;
//     },
//     render: function () {

//         renderTemplate(this.idTemplateContainer, this.targetHtmlContainerId);

//     },

// }

var ViewAllCourses = {
    init: function (idTemplateContainerAllcourses, idTargetContainerAllCourses) {
        this.loaderAllCourses = Object.create(LoaderView);
        this.loaderAllCourses.init(CONST.LOADER_SAMPLE, idTargetContainerAllCourses);

        this.idTemplateContainerAllcourses = idTemplateContainerAllcourses;
        this.idTargetContainerAllCourses = idTargetContainerAllCourses;

        this.containerAllCourses = document.createElement('div');
        this.wasRendered = false;

    },

    render2: function (data) {
        let templateCources = document.querySelector(this.idTemplateContainerAllcourses).innerHTML;
        let templateScript = Handlebars.compile(templateCources);
        let fillTemplateData = templateScript(data);
        this.containerAllCourses.innerHTML = fillTemplateData;

        if (this.wasRendered === false) {
            let courceContainer = document.querySelector(this.idTargetContainerAllCourses);
            courceContainer.append(this.containerAllCourses);
            this.wasRendered = true;
        }
    },
    render: function (data) {

        this.containerAllCourses = renderTemplate(this.idTemplateContainerAllcourses, this.idTargetContainerAllCourses, data, this.containerAllCourses);

    },

    onClickButtonNextPage: async function (func) {
        this.containerAllCourses.addEventListener('click', async function (event) {
            if (event.target.className == 'button')
                await func()
        })
    }
}


var ViewPopularAndNewCourses = {
    init: function (idTemplateContainerNewcourses, targetHtmlContainerId) {
        this.loaderNewAndPopularCourses = Object.create(LoaderView);
        this.loaderNewAndPopularCourses.init(CONST.LOADER_SAMPLE, targetHtmlContainerId);

        this.idTemplateContainerNewcourses = idTemplateContainerNewcourses;
        this.targetHtmlContainerId = targetHtmlContainerId;
    },
    render: function (data) {

        this.containerNewAndPopularCourses = renderTemplate(this.idTemplateContainerNewcourses, this.targetHtmlContainerId, data, this.containerNewAndPopularCourses);
    }
}

var View = {
    init: async function (onClick) {

        this.viewPopularCourses = Object.create(ViewPopularAndNewCourses);
        this.viewPopularCourses.init('#sample_card_cource_new_popular', '#popular_kurs');

        this.viewNewCourses = Object.create(ViewPopularAndNewCourses);
        this.viewNewCourses.init('#sample_card_cource_new_popular', '#new_kurs');

        this.viewAllCourses = Object.create(ViewAllCourses);
        this.viewAllCourses.init('#sample_card_cource_all', '#all_kurs');
        this.viewAllCourses.onClickButtonNextPage(onClick);


    },
    render: function (data) {

        this.viewPopularCourses.render(data.specialCourses.popularCourses);

        this.viewNewCourses.render(data.specialCourses.newCourses);

        this.viewAllCourses.render2(data.allCourses);

    },
}



var HomePageModel = {

    specialCourses: {
        newCourses: [],
        popularCourses: [],
    },
    allCourses: {
        courseData: {}
    },
};






var Service = {
    loadDataNewAndPopularCourses: async function () {
        var response = await req(CONST.URL_NEW_AND_POPULAR_COURSES);

        var popularCourses = response.data.find(d => d.attributes.promotionType === 'POPULAR');
        var newCourses = response.data.find(d => d.attributes.promotionType === 'NEW');
        var relatedCourses = response.data.find(d => d.attributes.promotionType === 'RELATED');


        return {
            specialCourses: {
                popularCourses: popularCourses.attributes.courses,
                newCourses: newCourses.attributes.courses,
                relatedCourses: relatedCourses.attributes.courses
            }
        }

    },
    loadDataAllCourses: async function (conditionAllCourses) {

        let responseAllCourses = await req(CONST.URL_ALL_COURSES, conditionAllCourses);

        return {
            allCourses: {
                courseData: responseAllCourses,
                pageNumber: responseAllCourses.meta.pagination.page,
                pageCount: responseAllCourses.meta.pagination.pageCount,
                hasMoreData: responseAllCourses.meta.pagination.page < responseAllCourses.meta.pagination.pageCount ? true : false,
            }

        }

    }

}







var Controller = {
    init: function () {
        this.model = Object.create(HomePageModel);

        this.service = Object.create(Service);

        this.view = Object.create(View);
        this.view.init(this.loadAllCoursesNextPages.bind(this));

    },

    updateData: async function () {

        let responseNewAndPopular = await this.service.loadDataNewAndPopularCourses();
        let responseAllCourses = await this.service.loadDataAllCourses(CONST.CONDITION_ALL_COURSES);

        this.model.specialCourses.newCourses = responseNewAndPopular.specialCourses.newCourses;
        this.model.specialCourses.popularCourses = responseNewAndPopular.specialCourses.popularCourses;

        this.model.allCourses.courseData = responseAllCourses.allCourses.courseData;
        this.model.allCourses.pageCount = responseAllCourses.allCourses.pageCount;
        this.model.allCourses.pageNumber = Number(responseAllCourses.allCourses.pageNumber);
        this.model.allCourses.hasMoreData = responseAllCourses.allCourses.hasMoreData;

        this.view.render(this.model);


    },
    loadAllCoursesNextPages: async function () {
        CONST.CONDITION_ALL_COURSES++;

        let responseAllCourses = await this.service.loadDataAllCourses(CONST.CONDITION_ALL_COURSES);

        this.model.allCourses.courseData.data.push.apply(this.model.allCourses.courseData.data, responseAllCourses.allCourses.courseData.data);
        this.model.allCourses.pageNumber = responseAllCourses.allCourses.pageNumber;
        this.model.allCourses.hasMoreData = responseAllCourses.allCourses.hasMoreData;

        this.view.render(this.model);

    }
}

let pageController = Object.create(Controller);
pageController.init();
pageController.updateData();

