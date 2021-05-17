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
            const client = new OAuth2Client(getGoogleClientId());
            const ticket = await client.verifyIdToken({
                idToken: tokenId,
                audience: getGoogleClientId(),
            });
            const payload = ticket.getPayload();
            const userid = payload["sub"];
            return userid;
        };
        console.log("trying");
        if (localStorage.getItem("ID") !== null) {
            let z =
                "eyJhbGciOiJSUzI1NiIsImtpZCI6ImQzZmZiYjhhZGUwMWJiNGZhMmYyNWNmYjEwOGNjZWI4ODM0MDZkYWMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMjMyOTUyNTE5NjYxLTQzMHMwNXZyOWhlOXNmMG80NWI4OG5kZTZqaWQ1NnZnLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMjMyOTUyNTE5NjYxLTQzMHMwNXZyOWhlOXNmMG80NWI4OG5kZTZqaWQ1NnZnLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA0MTk5MzE1NzIzMjIyMjc1NjExIiwiZW1haWwiOiJpZGFuaWVsem9yQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiQ2VyWU5zWVBqVGpVaTVsdG1oMWczdyIsIm5hbWUiOiJEYW5pZWwgRXBzaHRlaW4iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2pSS3d1ZkNWSXNPSlU2TVZGR0lXYkpkSEJLa3dPblN1Y3Q4UEJLUk9vPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkRhbmllbCIsImZhbWlseV9uYW1lIjoiRXBzaHRlaW4iLCJsb2NhbGUiOiJlbiIsImlhdCI6MTYyMTI4OTAyNCwiZXhwIjoxNjIxMjkyNjI0LCJqdGkiOiI4MGEzNjM5ZDk4NmZiOTMwOTkwODM4OTFlM2ZkMWQ5N2M1MmFjYTgxIn0.jkclAbKWs2rPgUEiIc6Z5fz5WT33MbO40NvIolVevnmTPbx63BtAoA6eeUIu0XdAO-AQVcf2KIwlIbs-prs3TRwaeqPdB2msTT0xwjfZWCSdAnY31Ds1-MEUgMa-EliZ8VUX4L9tebwlVIqxjpJx5SYEgCXU9K09kS1tQFTMw_SKKnmMhnVNvG1gfsVpsAGEvwKCcQ1o27UpZIOOEXKX0QeWs-WWU3DLi21tR-yCMy5OSwrFeB67azdz05wICYo9OkWwM0t0kj_v5NsUBPQKL5bwez3xoUTz9_kiT1_KdLtR2CfowL3tjcs0ML28_4YQXLZGWsGZsL_3-avzqBv67A";
            let userId = await verifyTokenId(z);
            console.log(userId);
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
