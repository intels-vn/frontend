var app = angular.module("myApp", [ "datatables","ngRoute","ngCookies","ngFileUpload","pascalprecht.translate","vcRecaptcha", "ngResource"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "Template/login.html",
		controller : "loginCtrl"
    })
    .when("/home", {
        templateUrl : "Template/home.html",
        controller : "homeCtrl"
    })
    .when("/userProfile", {
        templateUrl : "Template/userProfile.html",
        controller : "userProfileCtrl"
    })
	.when("/register", {
        templateUrl : "Template/register.html",
        controller : "registerCtrl"
    })
	.otherwise({redirectTo: '/'});
});

