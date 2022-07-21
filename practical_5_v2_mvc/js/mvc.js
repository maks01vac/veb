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


function renderTemplate(htmlTemplateContainerId, targetHtmlContainerId, data) {

    let templateCources = document.querySelector(htmlTemplateContainerId).innerHTML;

    let templateScript = Handlebars.compile(templateCources);
    let fillTemplateData = templateScript(data);

    let courceContainer = document.querySelector(targetHtmlContainerId);
    courceContainer.insertAdjacentHTML('beforeend', fillTemplateData);
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

var ViewButtonNext = {

    init: function (idTemplateContainer, targetHtmlContainerId) {

        this.idTemplateContainer = idTemplateContainer;
        this.targetHtmlContainerId = targetHtmlContainerId;
    },
    render: function () {

        renderTemplate(this.idTemplateContainer, this.targetHtmlContainerId);

    }

}

var ViewAllCourses = {
    init: function (idTemplateContainerAllcourses, idTargetContainerAllCourses) {

        this.idTemplateContainerAllcourses = idTemplateContainerAllcourses;
        this.idTargetContainerAllCourses = idTargetContainerAllCourses;

        this.buttonNextPage = Object.create(ViewButtonNext);
        this.buttonNextPage.init('#template_button', idTargetContainerAllCourses)

    },
    render: function (data) {
        renderTemplate(this.idTemplateContainerAllcourses, this.idTargetContainerAllCourses, data);
        this.buttonNextPage.render();

    },
    onClickButtonNextPage: function (func) {
        let btn = document.querySelector('#button');
        btn.addEventListener('click', function () {
            func();
        })
    }
}


var ViewPopularAndNewCourses = {
    init: function (idTemplateContainerNewcourses, targetHtmlContainerId) {
        
        this.idTemplateContainerNewcourses = idTemplateContainerNewcourses;
        this.targetHtmlContainerId = targetHtmlContainerId;
    },
    render: function (data) {
        renderTemplate(this.idTemplateContainerNewcourses, this.targetHtmlContainerId, data)
    }
}

var View = {
    init: function () {

        this.viewPopularCourses = Object.create(ViewPopularAndNewCourses);
        this.viewPopularCourses.init('#sample_card_cource_new_popular', '#popular_kurs');

        this.viewNewCourses = Object.create(ViewPopularAndNewCourses);
        this.viewNewCourses.init('#sample_card_cource_new_popular', '#new_kurs');

        this.viewAllCourses = Object.create(ViewAllCourses);
        this.viewAllCourses.init('#sample_card_cource_all', '#all_kurs');

    },
    render: function (data) {

        this.viewPopularCourses.render(data.specialCourses.popularCourses);

        this.viewNewCourses.render(data.specialCourses.newCourses);

        this.viewAllCourses.render(data.allCourses);

    }
}


var HomePageModel = {

    specialCourses: {
        newCourses: [],
        popularCourses: [],
    },
    allCourses: {},
};






var Service = {
    loadDataCourses: async function () {

        var response = await req(CONST.URL_NEW_AND_POPULAR_COURSES);
        let responseAllCourses = await req(CONST.URL_ALL_COURSES, CONST.CONDITION_ALL_COURSES);

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

}







var Controller = {
    init: function () {
        this.view = Object.create(View);

        this.model = Object.create(HomePageModel);

        this.service = Object.create(Service);
    },

    refreshView: function () {
        this.view.render(this.model);
    },

    updateDate: async function () {
        let response = await this.service.loadDataCourses();
        console.log(response);

        this.model.specialCourses.newCourses = response.specialCourses.newCourses;
        this.model.specialCourses.popularCourses = response.specialCourses.popularCourses;
        this.model.allCourses = response.allCourses;
        console.log(this.model);

        this.refreshView();
    }

}

let pageController = Object.create(Controller);
pageController.init();
pageController.updateDate();

