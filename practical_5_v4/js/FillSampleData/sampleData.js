async function fetchData(URL_COURSES, pageNumber = '') {
    let coursesUrl = CONST.BASE_URL + URL_COURSES + pageNumber;

    let response = await fetch(coursesUrl);
    let content = await response.json();

    return content;
}

let pageNumberAllCourses = 1;

async function addAllCourceBlocks() {
    let buttonShowMore = document.getElementById('button');

    createAndInsertResultHtmlWithTemplatedData(CONST.LOADER_SAMPLE, '', CONST.ALL_COURSES_HTML_CONTAINER_SELECTOR);
    let dataAllCourses = await fetchData(CONST.URL_ALL_COURSES, pageNumberAllCourses);
    console.log(dataAllCourses);

    createAndInsertResultHtmlWithTemplatedData(CONST.ALL_COURSES_SAMPLE_CONTAINER, dataAllCourses, CONST.ALL_COURSES_HTML_CONTAINER_SELECTOR);

    buttonShowMore.addEventListener('click', buttonClick);
}

async function buttonClick() {
    let buttonShowMore = document.getElementById('button');

    pageNumberAllCourses++;
    buttonShowMore.classList.add('none');

    createAndInsertResultHtmlWithTemplatedData(CONST.LOADER_SAMPLE, '', CONST.ALL_COURSES_HTML_CONTAINER_SELECTOR);
    let dataAllCourses = await fetchData(CONST.URL_ALL_COURSES, pageNumberAllCourses);
    createAndInsertResultHtmlWithTemplatedData(CONST.ALL_COURSES_SAMPLE_CONTAINER, dataAllCourses, CONST.ALL_COURSES_HTML_CONTAINER_SELECTOR);

    buttonShowMore.classList.remove('none');
    document.querySelector('.loader').remove();

    if (pageNumberAllCourses >= dataAllCourses.meta.pagination.pageCount) {
        buttonShowMore.classList.add('none');
    };

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

