async function fetchData(URL_COURSES, pageNumber = '') {
    let coursesUrl = CONST.BASE_URL + URL_COURSES + pageNumber;

    let response = await fetch(coursesUrl);
    let content = await response.json();

    return content;
}

async function addAllCourceBlocks() {
    let pageNumberAllCourses = 1;
    let buttonShowMore = document.getElementById('button');

    createAndInsertResultHtmlWithTemplatedData(CONST.LOADER_SAMPLE, '', CONST.ALL_COURSES_HTML_CONTAINER_SELECTOR);
    let dataAllCourses = await fetchData(CONST.URL_ALL_COURSES, pageNumberAllCourses);

    createAndInsertResultHtmlWithTemplatedData(CONST.ALL_COURSES_SAMPLE_CONTAINER, dataAllCourses, CONST.ALL_COURSES_HTML_CONTAINER_SELECTOR);
    let CountPageCoursesData = Math.floor(dataAllCourses.meta.pagination.pageCount);

    async function buttonClick() {
        pageNumberAllCourses++;
        buttonShowMore.classList.add('none');

        createAndInsertResultHtmlWithTemplatedData(CONST.LOADER_SAMPLE, '', CONST.ALL_COURSES_HTML_CONTAINER_SELECTOR);
        let dataAllCourses = await fetchData(CONST.URL_ALL_COURSES, pageNumberAllCourses);
        createAndInsertResultHtmlWithTemplatedData(CONST.ALL_COURSES_SAMPLE_CONTAINER, dataAllCourses, CONST.ALL_COURSES_HTML_CONTAINER_SELECTOR);

        buttonShowMore.classList.remove('none');
        document.querySelector('.loader').remove();

        if (pageNumberAllCourses >= CountPageCoursesData) {
            buttonShowMore.classList.add('none');
        };

    }

    buttonShowMore.addEventListener('click', buttonClick);
}


async function addNewAndPopularCourceBlocks() {
    createAndInsertResultHtmlWithTemplatedData(CONST.LOADER_SAMPLE, '', CONST.POPULAR_COURSES_HTML_CONTAINER_SELECTOR);
    createAndInsertResultHtmlWithTemplatedData(CONST.LOADER_SAMPLE, '', CONST.NEW_COURSES_HTML_CONTAINER_SELECTOR);

    let dataNewAndPopularCourses = await fetchData(CONST.URL_NEW_AND_POPULAR_COURSES);
    createNewAndPopularBlocks(dataNewAndPopularCourses);

    let loader = document.querySelectorAll('.loader')

    for (let i = 0; i < loader.length; i++) {
        loader[i].remove();
    }
}

