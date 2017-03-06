app.run(function($rootScope,$timeout, $http,$cookies){
	$rootScope.$on('$viewContentLoaded',function(){
		$timeout(function(){
			jQuery('body').append('<script src="build/js/custom.min.js"></script>');
		});
		$cookies.put("key", "en");
	},0);
});



app.controller("homeCtrl", function ($scope, $cookies,$location) {
	$scope.usernamelogin = $cookies.get("username");

	$scope.logout = function(){
		$cookies.remove("token");
		$cookies.remove("username");
		$cookies.remove("password");
		$cookies.remove("firstname");
		$cookies.remove("lastname");
		$cookies.remove("email");
		$cookies.remove("phone");
		$location.path("/");
	}
});

//Login-Ctrl
app.controller('loginCtrl', function($scope,$location, $cookies, loginsFactory) {
	$scope.login = function(){
		loginsFactory.login($scope.username,$scope.password).then(function(response){
				var data = response.data;
				if(data.status == "200"){
					var token = data.data.code;
					var splitS = decode(token).split('@Token');
					$cookies.put("token", token);
					$cookies.put("username",splitS[0]);
					$location.path("/home");
			}
			else
				$scope.errorMessage = "Wrong username or password";
		});
	}
});

//Register-Ctrl
app.controller('registerCtrl', function($scope, registerFactory, $location, $cookies) {
	$scope.userdetails={};
	$scope.regist = function(firstName,lastname,email,phone,username,password){
		registerFactory.add(firstName, lastname, email, phone, username, password).then(function(response){
			if(response.status == 200){
				$location.path("/login");
			}
			else
				alert("Error");
		});
	}
});



//Profile-Ctrl
app.controller('userProfileCtrl', function($scope, $cookies, profileFactory, $location, $route) {
	$scope.usernamelogin = $cookies.get("username");
	
	profileFactory.profile($cookies.get('enc_username')).then(function(response) {
		var data = response.data;
		if(data.status == "200") {
			$cookies.put("firstname", decode(data.data.firstName));
			$cookies.put("lastname", decode(data.data.lastName));
			$cookies.put("email", decode(data.data.email));
			$cookies.put("phone", decode(data.data.phone));
			$cookies.put("username", decode(data.data.userName));
			$cookies.put("password", decode(data.data.password));
			
			$scope.firstname = $cookies.get("firstname");
			$scope.lastname = $cookies.get("lastname");
			$scope.email = $cookies.get("email");
			$scope.phone = $cookies.get("phone");
			$scope.username = $cookies.get("username");
			$scope.password = $cookies.get("password");
		}
	});
	
	$scope.saves = function(){
		profileFactory.saves(encode($scope.password),encode($scope.email),encode($scope.phone)).then(function(response){
			var data1 = response.data;
			if(data1.status == "200") {
				window.location.reload();
			}
		});
	}
	
	$scope.logout = function(){
		$cookies.remove("token");
		$cookies.remove("username");
		$cookies.remove("password");
		$cookies.remove("firstname");
		$cookies.remove("lastname");
		$cookies.remove("email");
		$cookies.remove("phone");
		$location.path("/");
	}
});

//Get Video
//app.controller('videoCtrl', function($scope, $cookies, videoFactory) {
//	$scope.video = function(){
//		videoFactory.video().then(function(response){
//			var data = response.data;
//			if(data.status == "200") {
//				$cookies.put("ports", 5555);
//			}
//		});
//	}
//});

//Recaptcha
app.controller("recapCtrl",function($scope, vcRecaptchaService, sessionService) {
	var vm = this;
	vm.signup = function() {
		if (vcRecaptchaService.getResponse() === "") { 
			alert("Please resolve the captcha and submit!")
		} else {
			alert(vcRecaptchaService.getResponse());
			sessionService.register(vcRecaptchaService.getResponse())
		}
	}
});


// Multiple Language
app.config(function ($translateProvider) {
    $translateProvider.fallbackLanguage('en');
    $translateProvider.registerAvailableLanguageKeys(['en', 'vi'],{
      'en_*':'en',
      'vi_*':'vi'
    })
    $translateProvider.translations('en', {
       	TITLE: 'Welcome!',
		HomeMess:'Welcome to home page',
		Home:'Home',
		MessageAcc:'Do you have an account?',
		Login: 'Login',
		Signup:'Signup',
		Register: 'Register',
		Submit: 'Submit',
		Cancel: 'Cancel',
		General: 'General',
		Profile: 'Profile',
		EditProfile: 'Edit Profile',
		Edit: 'Edit',
		User: 'User',
		Logout: 'Logout',
		Save:'Save',
		Close:'Close',
		Username:'User Name',
		Pass:'Password',
		Firstname:'First name',
		Lastname:'Last name',
		Phone:'Phone',
		Email:'Email',
		WarningMess:'Are you sure?',
		Yes:'Yes',
		Cancel:'Canel',
      	BUTTON_LANG_EN:"English",
      	BUTTON_LANG_VI:"Vietnamese"
    });
    $translateProvider.translations('vi', {
     	TITLE: 'Xin Chào!',
		HomeMess:'Chào mừng đến trang chủ',
		Home:' Trang chủ',
		MessageAcc:'Bạn có tài khoản chưa?',
		Login: 'Đăng nhập',
		Signup:'Đăng ký',
		Register: 'Đăng ký',
		Submit: 'Nhập',
		Cancel: 'Hủy bỏ',
		General: 'Chung',
		Profile: 'Thông tin',
		EditProfile: 'Chỉnh sửa thông tin',
		Edit: 'Chỉnh sửa',
		User: 'Người dùng',
		Logout: 'Đăng xuất',
		Save:'Lưu',
		Close:'Đóng',
		Username:'Tên đăng nhập',
		Pass:'Mật Khẩu',
		Firstname:'Tên',
		Lastname:'Họ',
		Phone:'Số điện thoại',
		Email:'Email',
		WarningMess:'Bạn có chắc chắn không?',
		Yes:'Có',
		Cancel:'Hủy bỏ',
      	BUTTON_LANG_EN:"Tiếng Anh",
      	BUTTON_LANG_VI:"Tiếng Việt"
    });
    $translateProvider.useSanitizeValueStrategy('escape');
    $translateProvider.preferredLanguage('en');
    
});
  

app.controller('languageCtrl',function ($scope, $translate,$cookies) {
    $scope.changeLanguage = function(key){
		$cookies.remove("key");
		$cookies.put("key",key);
		$translate.use($cookies.get("key"));
    };
});