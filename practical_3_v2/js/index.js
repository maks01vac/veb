function dynamicHtml() {

    var dataCources = infoCources();

    var prepareCourcesHtml = prepareCources(dataCources);

    insertCources(prepareCourcesHtml);

}

dynamicHtml();