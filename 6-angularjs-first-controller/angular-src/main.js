import Angular from 'angular';
import './style.scss';
import AngularRouter from 'angular-route';

console.log(Angular);

//Angular.module('myApp', [AngularRouter]);

let app = Angular.module('main', [AngularRouter]);

app.config(function($routeProvider){
	$routeProvider
	.when("/", {
		templateUrl : "angular_templates/view_people.htm"
	})
	.when("/person", {
		templateUrl : "angular_templates/view_people.htm"
	});
});

app.controller("ViewPeopleController", ["$http",function($http){
    var view_people = this;
    view_people.data = [];
    view_people.searchquery="";
    view_people.orderby="lname";
    $http.get('/web-frameworks/rest/person/').then(function(response){
    	view_people.data = response.data;
    	console.log("view_people.data: ", view_people.data);
    });
    
    view_people.cleansearchquery = function(){
    	view_people.searchquery="";
    	view_people.research();
    };
    view_people.research = function(){
    	console.log("research: ", view_people.searchquery);
    	$http.get('/web-frameworks/rest/person/',
    			{params: {
    				search: view_people.searchquery,
    				orderby: view_people.orderby
    					}
    			}).then(function(response){
    	view_people.data = response.data;
        	console.log("view_people.data: ", view_people.data);
        });
    };
    
  }]);