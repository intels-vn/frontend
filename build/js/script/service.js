<!-- loginFactory-Start -->
app.factory('loginsFactory', function($http, $cookies) {
	return {
		login: function(username,password) {
			var encrypted_username = encode(username);
			var encrypted_password = encode(password);
			$cookies.put('enc_username', encrypted_username);
			return $http.get(serviceUrls.baseUrl + encrypted_username + "?password=" + encrypted_password, {headers:{'Localization': $cookies.get("key")}});	
		}
	};
});

<!-- loginFactory-End -->


<!-- usersFactory-Start -->
app.factory('profileFactory', function($http, $cookies) {
	return {
		profile: function(encrypted_username){
			return $http.get(serviceUrls.baseUrl + $cookies.get('enc_username'), {headers:{'Authorization': $cookies.get("token"), 'Localization': $cookies.get("key")}});
			
		},
		saves: function(password, email, phone){
			return $http.put(serviceUrls.baseUrl + $cookies.get('enc_username') + '/' + password + '/' + email + '/' + phone, '', {headers:{'Authorization': $cookies.get('token'), 'Localization': $cookies.get("key")}});
		}
	};
});

//Register-Factory
app.factory('registerFactory', function($http, $cookies) {
	return {
		add: function(firstName,lastname,email,phone,username,password) {
			var param = {
			  	userName: username+"",
			  	password: password+"",
				firstName: firstName+"",
				lastName: lastname+"",
				phone: phone+"",
				email: email+""
			};
			return $http.post(serviceUrls.baseUrl, JSON.stringify(param), {headers: {'DeviceId' : 'Web-app', 'Localization': $cookies.get("key")}});	
						
		},
	};
});

app.factory('sessionService', function($resource) {
	var service = {};
	var a;
	service.register = function(recaptcha) {
		var Register = $resource("/angular-hashbang/verifyUser.do");
		Register.save({}, recaptcha, a);
	};
	return service;
});
//Video-Factory
//app.factory('videoFactory', function($http, $cookies){
//	video: function(){
//		return $http.get(videoUrls.baseUrl + $cookies.get('ports'), {headers:{'Authorization': $cookies.get("token"), 'Localization': $cookies.get("key")}});
//	}
//});

// Api Urls
var serviceUrls = {};
serviceUrls.baseUrl = "http://localhost:8080/Demo/users";

var videoUrls ={};
videoUrls.baseUrl = "rtp://230.0.0.1";



