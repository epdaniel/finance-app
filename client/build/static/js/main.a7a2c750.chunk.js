(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{26:function(e,t,n){},27:function(e,t,n){},45:function(e,t,n){},46:function(e,t,n){},47:function(e,t,n){"use strict";n.r(t);var o=n(0),i=n(2),s=n.n(i),c=n(18),l=n.n(c),a=(n(26),n(20)),r=(n(27),n(19)),u=n.n(r),g=n(4),d=n(5),h=n(7),b=n(6),j=(n(45),n(2).Component,n(46),n(2).Component,n(3)),f=n(9),m=function(){var e="",t=-1,n="",o=!1;return{getName:function(){return e},setName:function(t){e=t,localStorage.setItem("fullName",t)},getId:function(){return t},setId:function(e){t=e,localStorage.setItem("ID",e)},getImgUrl:function(){return n},setImgUrl:function(e){n=e,localStorage.setItem("userIMG",e)},logOut:function(){this.setId(null),this.setName(""),this.setImgUrl(""),this.setLoggedIn(!1),localStorage.clear()},isLoggedIn:function(){return o},setLoggedIn:function(e){o=e},login:function(e,t,n){this.setId(e),this.setName(t),this.setImgUrl(n),this.setLoggedIn(!0)},tryRememberLogin:function(){return null!==localStorage.getItem("ID")&&(this.login(localStorage.getItem("ID"),localStorage.getItem("fullName"),localStorage.getItem("userIMG")),!0)}}}(),I="232952519661-430s05vr9he9sf0o45b88nde6jid56vg.apps.googleusercontent.com",O=function(e){Object(h.a)(n,e);var t=Object(b.a)(n);function n(e){var o;return Object(g.a)(this,n),(o=t.call(this,e)).state={isLogined:m.tryRememberLogin()},o.login=o.login.bind(Object(j.a)(o)),o.handleLoginFailure=o.handleLoginFailure.bind(Object(j.a)(o)),o.logout=o.logout.bind(Object(j.a)(o)),o.handleLogoutFailure=o.handleLogoutFailure.bind(Object(j.a)(o)),o}return Object(d.a)(n,[{key:"login",value:function(e){var t=e.getBasicProfile();m.login(e.getAuthResponse().id_token,t.getName(),t.getImageUrl()),e.accessToken&&this.setState((function(e){return{isLogined:!0}}))}},{key:"logout",value:function(e){m.logOut(),this.setState((function(e){return{isLogined:!1}}))}},{key:"handleLoginFailure",value:function(e){alert("Failed to log in")}},{key:"handleLogoutFailure",value:function(e){alert("Failed to log out")}},{key:"render",value:function(){return Object(o.jsx)("div",{children:this.state.isLogined?Object(o.jsxs)("div",{children:[Object(o.jsx)("img",{style:L,src:m.getImgUrl(),alt:"User"}),Object(o.jsxs)("b",{children:[" ",m.getName()," "]}),Object(o.jsx)("br",{}),Object(o.jsx)("br",{}),Object(o.jsx)(f.GoogleLogout,{clientId:I,buttonText:"Sign out",onLogoutSuccess:this.logout,onFailure:this.handleLogoutFailure})]}):Object(o.jsx)(f.GoogleLogin,{clientId:I,buttonText:"Sign in",onSuccess:this.login,onFailure:this.handleLoginFailure,cookiePolicy:"single_host_origin",responseType:"code,token"})})}}]),n}(i.Component),L={width:"30px",marginBottom:"-10px",borderRadius:"50%"},x=O;var p=function(e){var t=Object(i.useState)(!1),n=Object(a.a)(t,2);return n[0],n[1],function(){var e=this;-1!==m.getId()&&u.a.get("/entries/all",{headers:{id:1}}).then((function(t){e.setState({entries:t.data})}))}(),Object(o.jsxs)("div",{className:"App",children:[Object(o.jsx)("br",{}),Object(o.jsx)(x,{}),Object(o.jsx)("h1",{children:"Finance App"}),Object(o.jsx)("button",{class:"addEntryButton",children:"Add entry"}),Object(o.jsx)("h2",{children:"Transactions:"})]})},v=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,48)).then((function(t){var n=t.getCLS,o=t.getFID,i=t.getFCP,s=t.getLCP,c=t.getTTFB;n(e),o(e),i(e),s(e),c(e)}))};l.a.render(Object(o.jsx)(s.a.StrictMode,{children:Object(o.jsx)(p,{})}),document.getElementById("root")),v()}},[[47,1,2]]]);
//# sourceMappingURL=main.a7a2c750.chunk.js.map