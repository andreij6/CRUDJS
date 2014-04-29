"use strict";

var myApp = {};

myApp.cars = [];

myApp.Car = function (color0, make0, model0, id) {
    this.color = color0;
    this.make = make0;
    this.model = model0;
    this.id = id;
};

myApp.Add = function () {
    var model   = document.getElementById("Model");
    var make    = document.getElementById("Make");
    var color   = document.getElementById("Color");

    var _model = model.value;
    var _make = make.value;
    var _color = color.value;
    var id = myApp.cars.length + 1;


    myApp.cars.push(new myApp.Car(_color, _make, _model, id));

    model.value     = "";
    make.value      = "";
    color.value     = "";

    myApp.Redraw();

};

myApp.EditUI = function (id) {
    var Car;
    var model = document.getElementById("Model");
    var make = document.getElementById("Make");
    var color = document.getElementById("Color");

    for (var i = 0; i < myApp.cars.length; i++) {

        if (myApp.cars[i].id == id) {
            Car = myApp.cars[i];
        }
    }


    model.value = Car.model;
    make.value = Car.make;
    color.value = Car.color;

    $("form").append('<button type="button" class="btn btn-default" id="submitEdit" onclick="myApp.Edit(' + id +')">Submit Change</button>')

};

myApp.Edit = function (id) {
    var model = document.getElementById("Model");
    var make = document.getElementById("Make");
    var color = document.getElementById("Color");

    var _model = model.value;
    var _make = make.value;
    var _color = color.value;

    for (var i = 0; i < myApp.cars.length; i++) {
        if(myApp.cars[i].id == id)
        {
            myApp.cars.splice(i, 1, new myApp.Car(_color, _make, _model, id));
        }
    }

    model.value     = "";
    make.value      = "";
    color.value     = "";

    
    $("#submitEdit").remove();
    myApp.Redraw();
};

myApp.Delete = function (id) {

    for (var i = 0; i < myApp.cars.length; i++) {
        if (myApp.cars[i].id == id) {
            myApp.cars.splice(i, 1);
        }
    }

    myApp.Redraw();
};

myApp.Redraw = function () {

    var tableBody = $("#tbody");
    var table = document.getElementById("table").getAttribute("data-sortedBy");
    tableBody.html("");

    if (table === "none") {

        
        for (var i = 0; i < myApp.cars.length; i++) {
            tableBody.append('<tr><td>' + myApp.cars[i].model + '</td><td>' + myApp.cars[i].make + '</td><td>' + myApp.cars[i].color + '<td> <td><button class="btn btn-default" onclick="myApp.EditUI(' + myApp.cars[i].id + ')">Edit</button></td><td><button class="btn btn-danger" onclick= "myApp.Delete(' + myApp.cars[i].id + ')">Delete</button></td></tr>');
        }
        

    } else {
        if (table == "model") {
            myApp.Sort(1);
        }else if (table == "make") {
            myApp.Sort(2);
        } else {
            myApp.Sort(3);
        }
    }
};

myApp.Sort = function (sortParam) {
    var tableBody = $("#tbody");
    var prop;

    if (sortParam <= 3) {
        event.target.setAttribute("class", "glyphicon glyphicon-chevron-up");
        event.target.setAttribute("onclick", 'myApp.Sort(' + (parseInt(sortParam + 3))+')');
    } else {
        event.target.setAttribute("class", "glyphicon glyphicon-chevron-down");
        event.target.setAttribute("onclick", 'myApp.Sort(' + (parseInt(sortParam - 3)) + ')');
    }
    
    tableBody.html("");   //Clear

    switch (sortParam) {
        case 1:
        case 4:
            prop = "model";
            break;
        case 2:
        case 5:
            prop = "make";
            break;
        case 3:
        case 6:
            prop = "color";
            break;
        default:
            break;
    }



    var sorted = [];
    var resort = [];

    for (var i = 0; i < myApp.cars.length; i++) {
        sorted.push(myApp.cars[i][prop])
    }

    sorted.sort();

    for (var i = 0; i < sorted.length; i++) {
        for (var j = 0; j < myApp.cars.length; j++) {
            if (sorted[i] == myApp.cars[j][prop]) {
                resort.push(myApp.cars[j]);
            }
        }
    }

    if (sortParam > 3) {
        myApp.cars = resort.reverse();
    } else {
        myApp.cars = resort;
    }
    
    $("#tbody").html(" ");

    for (var i = 0;i < resort.length; i++) {
        $("#tbody").append('<tr><td>' + resort[i].model + '</td><td>' + resort[i].make + '</td><td>' + resort[i].color + '<td> <td><button class="btn btn-default" onclick="myApp.EditUI(' + resort[i].id + ')">Edit</button></td><td><button class="btn btn-danger" onclick= "myApp.Delete(' + resort[i].id + ')">Delete</button></td></tr>');
    }
    document.getElementById("table").setAttribute("data-sortedBy", prop);
    //myApp.Redraw(); Never ending loop

};
//DOM 

$("#add").on("click", myApp.Add);





