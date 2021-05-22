const UserProfile = (function () {
  let full_name = "";
  let token_id = -1;
  let img_url = ""
  let m_isLoggedIn = false;

  let getName = function () {
    return full_name;
  };

  let setName = function (name) {
    full_name = name;
  };

  let getToken = function () {
    return token_id;
  };

  let setToken = function (newToken) {
    token_id = newToken;

  };

  let getImgUrl = function () {
    return img_url;
  };

  let setImgUrl = function (url) {
    img_url = url;
  };

  let logOut = function () {
    this.setToken(null);
    this.setName("");
    this.setImgUrl("");
    this.setLoggedIn(false);
    localStorage.clear();
  }

  let login = function (token, name, url) {
    this.setToken(token);
    this.setName(name);
    this.setImgUrl(url);
    this.setLoggedIn(true);
    localStorage.setItem('TokenId', token);
    localStorage.setItem('fullName', name);
    localStorage.setItem('userIMG', url);
  }

  let isLoggedIn = function () {
    return m_isLoggedIn;
  }

  let setLoggedIn = function (status) {
    m_isLoggedIn = status;
  }

  let tryRememberLogin = function () {
    if (localStorage.getItem('TokenId') !== null) {
      this.login(localStorage.getItem('TokenId'), localStorage.getItem('fullName'), localStorage.getItem('userIMG'));
      return true;
    }
    return false;
  }

  return {
    getName: getName,
    setName: setName,
    getToken: getToken,
    setToken: setToken,
    getImgUrl: getImgUrl,
    setImgUrl: setImgUrl,
    logOut: logOut,
    isLoggedIn: isLoggedIn,
    setLoggedIn: setLoggedIn,
    login: login,
    tryRememberLogin: tryRememberLogin,
  }

})();


export default UserProfile;