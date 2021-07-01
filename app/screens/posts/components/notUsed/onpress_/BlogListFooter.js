import BlogListFooterAndroid from './BlogListFooter.android';
import BlogListFooterIOS from './BlogListFooter.ios';

export const BlogListFooter = Platform.select({
    ios: BlogListFooterIOS,
    android: BlogListFooterAndroid
  });




// uses  onPress={() => this._onPress()} 
//                        <BlogListFooter commentCtrl={commentCtrl} likeCtrl={likeCtrl} onPress={() => this._onPress()} />

//impoert 

//import BlogListFooter from './notUsed/onpress_/BlogListFooter';
