var context = { 
    title: "My New Post", 
    body: "This is my first post!" 
};
var template = Handlebars.compile(document.querySelector("#entry-template").innerHTML)
var filed = template(context);
document.querySelector('.outer').innerHTML = filed;