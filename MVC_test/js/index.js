var View = {

    init: function (containerSelector) {
        this.containerSelector = containerSelector;
    },

    onViewButtonAddClick: function (func) {
        var btn = document.querySelector(`${this.containerSelector} .btn-submit`);
        btn.addEventListener('click', function () {
            func()
        });
    },

    render: function (data) {
        var targetHtml = document.querySelector(this.containerSelector);
        targetHtml.insertAdjacentHTML('beforeend', `<p>${data.join()}</p>`);
    }
};

var PageController = {

    init: function (data, containerSelector) {
        var that = this;

        this.view = Object.create(View);
        this.controllerData = data;
        this.view.init(containerSelector);

        this.view.onViewButtonAddClick(function () {
            that.controllerData.push('e');
            that.view.render(that.controllerData);
        });
        
    },

    run: function () {
        this.view.render(this.controllerData);
    }
};

var pageController1 = Object.create(PageController);
pageController1.init(['a', 'b'], '.container1');
pageController1.run();

var pageController2 = Object.create(PageController);
pageController2.init(['c', 'd'], '.container2');
pageController2.run();

var pageController2 = Object.create(PageController);
pageController2.init(['e', 'f'], '.container3');
pageController2.run();