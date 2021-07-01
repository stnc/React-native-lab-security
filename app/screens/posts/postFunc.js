import { MediaConfig } from './../../constants/clientConfig';

//incele
//https://stackoverflow.com/questions/48916466/wp-api-and-js-cannot-read-property-wpfeaturedmedia-of-undefined/52499598
sizeControl = (props) => {
    let imagesource=null;
    let imagesource_thumbnail;
    let imagesource_medium;
    let imagesource_standart;

    imagesource_thumbnail = props._embedded ? props._embedded["wp:featuredmedia"]["0"].media_details.sizes.thumbnail.source_url : null;
    imagesource_medium = props._embedded ? props._embedded["wp:featuredmedia"]["0"].media_details.sizes.medium.source_url : null;
    imagesource_standart = props._embedded ? props._embedded["wp:featuredmedia"]["0"].source_url : null;

    if (imagesource_thumbnail != null) {
        imagesource = imagesource_thumbnail
    }

    if (imagesource_medium != null) {
        imagesource = imagesource_thumbnail
    }

    if (imagesource_standart != null) {
        imagesource = imagesource_standart
    }

    return imagesource;
}


export const authorInfo = (props) => {
    return props._embedded.author ? props._embedded.author["0"] : null;
}

export const commentCount = (props) => {
    return props._embedded.replies ?  props._embedded.replies["0"].length  : 0;
   
}

export const commentList = (props) => {
    return props._embedded.replies ? props._embedded.replies["0"] : 0;
}

/*
export const likeCount = (props) => {
    let result= props._liked ? props._liked["0"] : 0;

    if (result==undefined){
        return 0
    }
}
*/

export const fetchMediaInfo = (props) => {
    let imagource;
    if (props.featured_media === 0) {
        imagource = MediaConfig.defaultPostsImage;
    }
    else {
        imagource = sizeControl(props);
    }
    return imagource
}

/// FETCh

