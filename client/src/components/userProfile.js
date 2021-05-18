const { OAuth2Client } = require("google-auth-library");

let UserProfile = (function () {
    let full_name = "";
    let id = -1;
    let img_url = "";
    let m_isLoggedIn = false;

    let getId = () => id;
    let getName = () => full_name;
    let getImgUrl = () => img_url;
    let isLoggedIn = () => m_isLoggedIn;
    let getGoogleClientId = () =>
        "232952519661-430s05vr9he9sf0o45b88nde6jid56vg.apps.googleusercontent.com";

    let setId = (newId) => {
        id = newId;
        localStorage.setItem("ID", newId);
    };

    let setName = (name) => {
        full_name = name;
        localStorage.setItem("fullName", name);
    };

    let setImgUrl = (url) => {
        img_url = url;
        localStorage.setItem("userIMG", url);
    };

    let setLoggedIn = (status) => {
        m_isLoggedIn = status;
    };

    let logOut = function () {
        setId(null);
        setName("");
        setImgUrl("");
        setLoggedIn(false);
        localStorage.clear();
    };

    let login = (id, name, url) => {
        setId(id);
        setName(name);
        setImgUrl(url);
        setLoggedIn(true);
    };

    let tryRememberLogin = async function () {
        let verifyTokenId = async (tokenId) => {
            try {
                const client = new OAuth2Client(getGoogleClientId());
                const ticket = await client.verifyIdToken({
                    idToken: tokenId,
                    audience: getGoogleClientId(),
                });
                const payload = ticket.getPayload();
                const userid = payload["sub"];
                return userid;
            } catch (e) {
                return -1;
            }
        };

        if (localStorage.getItem("ID") !== null) {
            // let userId = await verifyTokenId(localStorage.getItem("ID"));
            // if (userId === -1) return false;
            this.login(
                localStorage.getItem("ID"),
                localStorage.getItem("fullName"),
                localStorage.getItem("userIMG")
            );
            return true;
        }
        return false;
    };

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
        getGoogleClientId: getGoogleClientId,
    };
})();

export default UserProfile;
