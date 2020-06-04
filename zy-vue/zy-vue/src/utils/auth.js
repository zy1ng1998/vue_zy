function isLogin(){
    return document.cookie.includes('login=true')
}

function login(){
    let expiresDay = 147;
    let date = new Date();
    date.setTime(date.getTime() + expiresDay * 24 * 60 * 60 *1000);
    document.cookie = `login=true;expires=${date.toGMTString()}`;
}

function cancelLogin(){
    let date = new Date;
    date.setTime(date.getTime() -100000000000);
    document.cookie = `login=true;expires=${date.toGMTString()}`;
}


export default {
    isLogin,
    login,
    cancelLogin,
}