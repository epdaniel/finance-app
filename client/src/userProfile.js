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
    // Also set this in cookie/localStorage
  };

  let getId = function () {
    return id;
  };

  let setId = function (newId) {
    id = newId;
  };

  let getImgUrl = function () {
    return img_url;
  };

  let setImgUrl = function (url) {
    img_url = url;
  };

  let logOut = function () {
    this.setId(-1);
    this.setName("");
    this.setImgUrl("");
    this.setLoggedIn(false);
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
  }

})();


export default UserProfile;