const UserProfile = (function () {
  let full_name = "";
  let token_id = -1;
  let img_url = ""
  let m_isLoggedIn = false;

  const getToken = () => token_id;
  const getName = () => full_name;
  const getImgUrl = () => img_url;
  const isLoggedIn = () => m_isLoggedIn;

  const setToken = (newToken) => { token_id = newToken; };
  const setName = (name) => { full_name = name; };
  const setImgUrl = (url) => { img_url = url; };
  const setLoggedIn = (status) => { m_isLoggedIn = status; };

  const login = (token, name, url) => {
    setToken(token);
    setName(name);
    setImgUrl(url);
    setLoggedIn(true);
    localStorage.setItem('TokenId', token);
    localStorage.setItem('fullName', name);
    localStorage.setItem('userIMG', url);
  }

  const logOut = () => {
    setToken(null);
    setName("");
    setImgUrl("");
    setLoggedIn(false);
    localStorage.clear();
  }

  const attemptLogin = () => {
    if (localStorage.getItem('TokenId') !== null) {
      login(localStorage.getItem('TokenId'), localStorage.getItem('fullName'), localStorage.getItem('userIMG'));
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
    attemptLogin: attemptLogin,
  }
})();

export default UserProfile;