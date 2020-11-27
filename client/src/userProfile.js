let UserProfile = (function () {
  let full_name = "";
  let id = -1;
  let img_url = ""
  let m_isLoggedIn = false;

  let getName = function () {
    return full_name;    // Or pull this from cookie/localStorage
  };

  let setName = function (name) {
    full_name = name;
    localStorage.setItem('fullName', name);
  };

  let getId = function () {
    return id;
  };

  let setId = function (newId) {
    id = newId;
    localStorage.setItem('ID', newId);
  };

  let getImgUrl = function () {
    return img_url;
  };

  let setImgUrl = function (url) {
    img_url = url;
    localStorage.setItem('userIMG', url);
  };

  let logOut = function () {
    this.setId(null);
    this.setName("");
    this.setImgUrl("");
    this.setLoggedIn(false);
    localStorage.clear();
  }

  let login = function (id, name, url) {
    this.setId(id);
    this.setName(name);
    this.setImgUrl(url);
    this.setLoggedIn(true);
  }

  let isLoggedIn = function () {
    return m_isLoggedIn;
  }

  let setLoggedIn = function (status) {
    m_isLoggedIn = status;
  }

  let tryRememberLogin = function () {
    if (localStorage.getItem('ID') !== null) {
      this.login(localStorage.getItem('ID'), localStorage.getItem('fullName'), localStorage.getItem('userIMG'));
      return true;
    }
    return false;
  }

  return {
    getName: getName,
    setName: setName,
    getId: getId,
    setId: setId,
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