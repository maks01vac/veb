const CONST = {
    POPULAR_COURSES_HTML_CONTAINER_SELECTOR: '#popular_kurs',
    NEW_COURSES_HTML_CONTAINER_SELECTOR:'#new_kurs',
    ALL_COURSES_HTML_CONTAINER_SELECTOR:'#all_kurs',
    ALL_COURSES_SAMPLE_CONTAINER:'#sample_card_cource_all',
    NEW_AND_POPULAR_COURSES_SAMPLE_CONTAINER:'#sample_card_cource_new_popular',
    BASE_URL: 'https://api.qa2.surdoclass.ru',
}

function createCourceBlocksSample(idSampleContainer,data,idContainerHtml) {
    var templateCources = document.querySelector(idSampleContainer).innerHTML;
    var templateScript = Handlebars.compile(templateCources);
    var fillTemplateData = templateScript(data);
    var courceContainer = document.querySelector(idContainerHtml);
    courceContainer.insertAdjacentHTML ('beforeend',fillTemplateData);
}

function addNewAndPopularBlocks(jsonData){
        let jsonNew,
            jsonPopular;
           
        for (let i = 0; i < jsonData.data.length; i++) {
            if (jsonData.data[i].attributes.promotionType == 'NEW') {
                jsonNew = jsonData.data[i].attributes;
                createCourceBlocksSample(CONST.NEW_AND_POPULAR_COURSES_SAMPLE_CONTAINER,jsonNew,CONST.NEW_COURSES_HTML_CONTAINER_SELECTOR);
    
            }
            else if (jsonData.data[i].attributes.promotionType == 'POPULAR') {
                jsonPopular = jsonData.data[i].attributes
                createCourceBlocksSample(CONST.NEW_AND_POPULAR_COURSES_SAMPLE_CONTAINER,jsonPopular,CONST.POPULAR_COURSES_HTML_CONTAINER_SELECTOR);
            }
        } 
    }
    