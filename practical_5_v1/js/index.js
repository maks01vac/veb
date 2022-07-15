async function addAllCourceBlocksAndFillsWithData() {
    var i = 1;
    var courceUrlAllBlocks = '/api/courses?populate[0]=author&populate[1]=cover_image_full&populate[2]=ui_tile_colour&populate[3]=categories&populate[4]=promo_page&pagination[pageSize]=9&pagination[page]='+i;
    var coursesUrl = CONST.BASE_URL + courceUrlAllBlocks;
    let response = await fetch(coursesUrl);
    let content = await response.json();
    let CountPageCoursesData = Math.floor(content.meta.pagination.pageCount);
    console.log(CountPageCoursesData);
    createAllCourceBlocksSample(content);
    let btn = document.getElementById('button')
    async function buttonClick(){
        i++;
        let courceUrlAllBlocks2 = '/api/courses?populate[0]=author&populate[1]=cover_image_full&populate[2]=ui_tile_colour&populate[3]=categories&populate[4]=promo_page&pagination[pageSize]=9&pagination[page]=';
        let coursesUrl2 =CONST.BASE_URL + courceUrlAllBlocks2+i;
        let responsePage = await fetch(coursesUrl2);
        let contentPage = await responsePage.json();
        createAllCourceBlocksSample(contentPage);
        if(i>=CountPageCoursesData){ btn.classList.add('none');
        }
    }
    document.getElementById('button').addEventListener('click',buttonClick);
}



async function addNewAndPopularCourceBlocksAndFillsWithData() {
    let courceUrlNewAndPopular = '/api/course-promotions/?populate%5B0%5D=courses.course&populate%5B1%5D=courses.course.author&populate%5B2%5D=courses.course.cover_image_full&populate%5B3%5D=courses.course.cover_image_half&populate%5B4%5D=courses.course.ui_tile_colour&populate%5B5%5D=courses.course.promo_page';
    let UrlNewAndPopularCource = CONST.BASE_URL + courceUrlNewAndPopular;
    let responseNewAndPopular = await fetch(UrlNewAndPopularCource);
    let jsonNewAndPopular = await responseNewAndPopular.json();
    addNewAndPopularBlocks(jsonNewAndPopular);
    
}




function addCourceBlocksAndFillsWithData() {


    addAllCourceBlocksAndFillsWithData();


    addNewAndPopularCourceBlocksAndFillsWithData()

}

addCourceBlocksAndFillsWithData();
