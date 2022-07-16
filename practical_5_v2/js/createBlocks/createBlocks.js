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
    courceContainerALL.insertAdjacentHTML ('beforeend',fillTemplateAllData);
}




function createNewCourceBlocksSample(data){
    var templateNewAndPopularCource = document.querySelector('#sample_card_cource_new_popular').innerHTML;
    var templateScript = Handlebars.compile(templateNewAndPopularCource);
    var fillTemplateNewData = templateScript(data);
    var courceContainerNew = document.querySelector(CONST.NEW_COURSES_HTML_CONTAINER_SELECTOR);
    courceContainerNew.insertAdjacentHTML ('beforeend', fillTemplateNewData);
}



function createPopularCourceBlocksSample(data) {
    var templateNewAndPopularCource = document.querySelector('#sample_card_cource_new_popular').innerHTML;
    var templateScript = Handlebars.compile(templateNewAndPopularCource);
    var fillTemplatePopularData = templateScript(data);
    var courceContainerPopular = document.querySelector(CONST.POPULAR_COURSES_HTML_CONTAINER_SELECTOR);
    courceContainerPopular.innerHTML = fillTemplatePopularData;
}

function addNewAndPopularBlocks(jsonData){
        let jsonNew,
            jsonPopular;
        for (let i = 0; i < jsonData.data.length; i++) {
            if (jsonData.data[i].attributes.promotionType == 'NEW') {
                jsonNew = jsonData.data[i].attributes;
                createNewCourceBlocksSample(jsonNew);
    
            }
            else if (jsonData.data[i].attributes.promotionType == 'POPULAR') {
                jsonPopular = jsonData.data[i].attributes
                createPopularCourceBlocksSample(jsonPopular)
            }
        }
    }
    

