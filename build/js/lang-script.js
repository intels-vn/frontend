
  app.config(function ($translateProvider) {
    $translateProvider.fallbackLanguage('en');
    $translateProvider.registerAvailableLanguageKeys(['en', 'vi'],{
      'en_*':'en',
      'vi_*':'vi'
    })
    $translateProvider.translations('en', {
       	TITLE: 'Welcome!',
		Login: 'Login',
		Register: 'Register',
		Submit: 'Submit',
		Cancel: 'Cancel',
		General: 'General',
		Profile: 'Profile',
		EditProfile: 'Edit Profile',
		Edit: 'Edit',
		User: 'User',
		Logout: 'Logout',
      	BUTTON_LANG_EN:"english",
      	BUTTON_LANG_VI:"vietnamese"
    });
    $translateProvider.translations('vi', {
     	TITLE: 'Xin Chào!',
		Login: 'Đăng nhập',
		Register: 'Đăng ký',
		Submit: 'Nhập',
		Cancel: 'Hủy bỏ',
		General: 'Chung',
		Profile: 'Thông tin',
		EditProfile: 'Chỉnh sửa thông tin',
		Edit: 'Chỉnh sửa',
		User: 'Người dùng',
		Logout: 'Đăng xuất',
      	BUTTON_LANG_EN:"tiếng anh",
      	BUTTON_LANG_VI:"tiếng việt"
    });
    $translateProvider.useSanitizeValueStrategy('escape');
    $translateProvider.preferredLanguage('en');
    
  });
  
