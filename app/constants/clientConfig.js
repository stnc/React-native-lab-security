export const BaseConfig = {
	siteBaseUrl: 'https://api.biyoguvenlik.info.tr/',
	// siteBaseUrl: 'http://wp.test/',
	username: 'Rest',
	password: 'AU3Nl1GXhuNtCzhmey)CwOG!'
	//  demoUser   dem23dem99
};

export const clientConfig = {
	siteUrl: BaseConfig.siteBaseUrl,
	TokenUrl: BaseConfig.siteBaseUrl + 'wp-json/jwt-auth/v1/token',
	ValidateTokenUrl: BaseConfig.siteBaseUrl + 'wp-json/jwt-auth/v1/token/validate',
	PostUrl: BaseConfig.siteBaseUrl + 'wp-json/wp/v2/posts',

	PostUrlEmbed: BaseConfig.siteBaseUrl + 'wp-json/wp/v2/posts/?_embed',

	CatPostUrl: BaseConfig.siteBaseUrl + 'wp-json/wp/v2/categoriesAndDepencyPostList',
	CategoriesUrl: BaseConfig.siteBaseUrl + 'wp-json/wp/v2/categories',

	LoginUrl: BaseConfig.siteBaseUrl + 'wp-json/jwt-auth/v1/token',
	MediaUrl: BaseConfig.siteBaseUrl + 'wp-json/wp/v2/media',
	RegisterUrl: BaseConfig.siteBaseUrl + 'wp-json/wp/v2/users',
	UserMeUrl: BaseConfig.siteBaseUrl + 'wp-json/wp/v2/users/me',
	QuizRequestUrl: BaseConfig.siteBaseUrl + 'wp-json/wp/v2/quizcat/id',
	QuizResultPostUrl: BaseConfig.siteBaseUrl + 'wp-json/wp/v2/quizcat/result',
	RegisterUrl_Extension: BaseConfig.siteBaseUrl + 'wp-json/wp/v2/users/register',
	LikeSet: BaseConfig.siteBaseUrl + 'wp-json/wp/v2/stnc_like'

};

export const MediaConfig = {
	defaultPostsImage: 'https://via.placeholder.com/400'
};



// export default clientConfig;
// export default MediaConfig;



// define( 'DB_NAME', 'admin_apiSdb' );

// /** MySQL database username */
// define( 'DB_USER', 'admin_api_mysql' );

// /** MySQL database password */
// define( 'DB_PASSWORD', 'k29lnayIIq' );