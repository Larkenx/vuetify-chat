webpackJsonp([1],{"/SXg":function(t,e){},0:function(t,e){},"7zck":function(t,e){},Dack:function(t,e){},NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=s("7+uW"),a={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-list",{staticClass:"pt-0",attrs:{subheader:"",dense:""}},t._l(t.contacts,function(e){return s("v-list-tile",{key:e.title,attrs:{avatar:"",to:"/chat/"+e._id}},[s("v-list-tile-avatar",[s("img",{attrs:{src:e.avatar}})]),t._v(" "),s("v-list-tile-content",[s("v-list-tile-title",{domProps:{innerHTML:t._s(e.name)}})],1)],1)}))},staticRenderFns:[]},n=s("VU/8")({data:function(){return{contacts:[{id:"1",active:!0,name:"Jason Oner",avatar:"https://randomuser.me/api/portraits/men/86.jpg"},{id:"2",active:!0,name:"Ranee Carlson",avatar:"https://randomuser.me/api/portraits/women/15.jpg"},{id:"3",name:"Cindy Baker",avatar:"https://randomuser.me/api/portraits/women/20.jpg"},{id:"4",name:"Ali Connors",avatar:"https://randomuser.me/api/portraits/women/10.jpg"}]}},name:"ContactList"},a,!1,null,null,null).exports,o=s("gRE1"),i=s.n(o),l={data:function(){return{users:this.$store.state.onlineUsers}},methods:{getOnlineUsers:function(){var t=this;return i()(this.$store.state.loadedUsers).filter(function(e){return e._id!=t.$store.state.user._id})}},name:"ContactList"},c={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-list-group",{staticClass:"pa-0",attrs:{"prepend-icon":"people"}},[s("v-list-tile",{attrs:{slot:"activator"},slot:"activator"},[s("v-list-tile-content",[s("v-list-tile-title",[t._v("Online Contacts")])],1)],1),t._v(" "),t._l(t.getOnlineUsers(),function(e,r){return s("v-list-tile",{key:e._id,attrs:{avatar:"",to:"/chat/"+e._id}},[s("v-list-tile-avatar",[s("v-avatar",{staticClass:"teal",attrs:{size:"36"}},[s("span",{staticClass:"white--text"},[t._v(t._s(e.firstName[0]+e.lastName[0]))])])],1),t._v(" "),s("v-list-tile-content",[s("v-list-tile-title",[t._v(t._s(e.firstName+" "+e.lastName))])],1)],1)})],2)},staticRenderFns:[]},u={components:{"contact-list":n,"online-users":s("VU/8")(l,c,!1,null,null,null).exports},data:function(){return{drawer:!0,mini:!0}},methods:{getFullName:function(){var t=this.$store.state.user;return t.firstName+" "+t.lastName},logout:function(){console.log("Logging out..."),this.$store.dispatch("logout")},loggedIn:function(){return null!==this.$store.state.user._id}},name:"App"},d={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-app",[t.loggedIn()?s("v-navigation-drawer",{attrs:{permanent:"",app:"",fixed:"",clipped:"","mini-variant":t.mini},on:{"update:miniVariant":function(e){t.mini=e}},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[s("v-list",{attrs:{expand:""}},[s("v-list-tile",{staticClass:"pa-0"},[s("v-list-tile-action",[s("v-icon",[t._v("rss_feed")])],1),t._v(" "),s("v-list-tile-content",[s("v-btn",{attrs:{flat:"",color:"blue",exact:"",to:"/"}},[t._v("View News Feed")])],1),t._v(" "),s("v-list-tile-action",[s("v-btn",{attrs:{icon:""},nativeOn:{click:function(e){e.stopPropagation(),t.mini=!t.mini}}},[s("v-icon",[t._v("chevron_left")])],1)],1)],1),t._v(" "),s("v-list-group",{staticClass:"pa-0",attrs:{"prepend-icon":"forum"}},[s("v-list-tile",{attrs:{slot:"activator"},slot:"activator"},[s("v-list-tile-content",[s("v-list-tile-title",[t._v("Chat Rooms")])],1)],1)],1),t._v(" "),s("online-users")],1)],1):t._e(),t._v(" "),s("v-toolbar",{attrs:{app:"",fixed:"","clipped-left":!0}},[s("v-toolbar-title",[t._v("Vue Chat")]),t._v(" "),s("v-spacer"),t._v(" "),null===this.$store.state.user._id?s("v-toolbar-items",[s("v-btn",{attrs:{flat:"",color:"green",exact:"",to:"/register"}},[t._v("Register")]),t._v(" "),s("v-btn",{attrs:{flat:"",color:"blue",exact:"",to:"/login"}},[t._v("Sign In")])],1):s("v-toolbar-items",{staticClass:"text-xs-center-justify"},[s("v-btn",{attrs:{flat:""}},[t._v(t._s(this.$store.state.user.email))]),t._v(" "),s("v-btn",{attrs:{flat:""}},[s("v-icon",{attrs:{large:""}},[t._v("account_circle")])],1),t._v(" "),s("v-btn",{attrs:{flat:"",color:"red"},on:{click:function(e){t.logout()}}},[t._v("Logout")])],1)],1),t._v(" "),s("v-content",[s("router-view")],1)],1)},staticRenderFns:[]},v=s("VU/8")(u,d,!1,null,null,null).exports,m=s("/ocq"),f={props:["userID"],data:function(){return{messageInputHeight:"48px",message:"",directMessages:this.$store.state.directMessages}},updated:function(){if(window.pageYOffset){console.log(window.pageYOffset);var t=document.body.offsetHeight-window.innerHeight;window.scrollTo(0,t)}},methods:{getMessages:function(){var t=this.$route.params.userID;return t in this.directMessages?this.directMessages[t].messages:[]},sendMessage:function(){var t=this.$store.state,e=t.directMessages,s=t.socket,r=t.user,a=this.$route.params.userID;console.log("Sending msg: '"+this.message+"'"),e[a]?s.emit("sendMessage",{conversation:e[a],message:{text:this.message,sender:r._id}}):(console.log("New conversation started ..."),s.emit("startConversation",{sender:r._id,receiver:a,message:{text:this.message,sender:r._id}})),this.message=""}}},p={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("span",[s("v-card",{style:{"padding-bottom":t.messageInputHeight/2},attrs:{flat:"",fluid:""}},[s("v-layout",{attrs:{row:""}},[t.getMessages().length>0?s("v-container",{attrs:{"grid-list-xl":"",fluid:"",row:""}},t._l(t.getMessages(),function(e,r){return s("v-layout",{key:r,attrs:{row:"","align-start":e.sender===t.$store.state.user._id,"align-end":e.sender!==t.$store.state.user._id,"align-content-start":e.sender===t.$store.state.user._id,"align-content-end":e.sender!==t.$store.state.user._id}},[s("v-flex",{attrs:{xs6:"",sm4:"","offset-xs6":e.sender===t.$store.state.user._id,"offset-sm8":e.sender===t.$store.state.user._id}},[s("v-card",{staticClass:"msg",attrs:{color:e.sender!==t.$store.state.user._id?"white":"blue"}},[s("v-card-text",{class:e.sender!==t.$store.state.user._id?"black--text":"white--text"},[t._v("\n              "+t._s(e.text)+"\n            ")])],1)],1)],1)})):s("v-container",{attrs:{fluid:""}},[s("v-card",{attrs:{color:"blue"}},[s("v-card-text",[s("v-icon",{staticClass:"pa-2"},[t._v("info")]),t._v("\n          Hey, it doesn't look like you two have spoken before! Say hi and introduce yourself.\n        ")],1)],1)],1)],1)],1),t._v(" "),s("v-footer",{style:{height:t.messageInputHeight},attrs:{app:"",inset:""}},[s("v-layout",{staticClass:"pa-4",attrs:{row:"","align-center":""}},[s("v-flex",{attrs:{xs11:""}},[s("v-text-field",{attrs:{"single-line":"",label:"Type a message..."},model:{value:t.message,callback:function(e){t.message=e},expression:"message"}})],1),t._v(" "),s("v-flex",{staticStyle:{"min-width":"100px"},attrs:{xs1:"","align-end":""}},[s("v-btn",{attrs:{color:"blue",flat:""},on:{click:function(e){t.sendMessage()}}},[t._v("send   "),s("v-icon",[t._v("send")])],1)],1)],1)],1)],1)},staticRenderFns:[]};var g=s("VU/8")(f,p,!1,function(t){s("/SXg")},"data-v-98a15e08",null).exports,h={data:function(){var t="Ei autem dolorum explicari sed, no eos movet iriure fabulas. At his legere mediocrem, ut vim impedit necessitatibus, corpora disputationi cu nec. Magna consequuntur eu nam, pro ex quot voluptaria referrentur, cu duo aperiri maiorum. Mea in etiam errem iracundia, no homero populo ullamcorper quo. Ne mel gubergren assueverit, eos quem viris nostro ut. Decore persequeris pro in, usu agam dicta constituam ut. Pro nominati disputationi definitionem no, quod sanctus id usu. At tollit utinam percipitur eum, affert detraxit an vix. Cu harum hendrerit mea. Animal aliquando interesset ex mei".split(" ");return{posts:[{text:this.shuffle(t),likes:0,comments:[{text:"Wow, so cool!"},{text:"TRUMP SUCKS"},{text:"HILLARY FOR PRISON 2073"}],hovered:!1},{text:this.shuffle(t),likes:5,comments:[{text:"YEEEHAAW"},{text:"I'm gonna go eat cake"}],hovered:!1},{text:this.shuffle(t),likes:9,comments:[{text:"LOVE U! GRANDMA"}],hovered:!1},{text:this.shuffle(t),likes:11,comments:[],hovered:!1}]}},methods:{shuffle:function(t){var e,s,r;for(r=t.length-1;r>0;r--)e=Math.floor(Math.random()*(r+1)),s=t[r],t[r]=t[e],t[e]=s;return t[0].charAt(0).toUpperCase()+t.slice(1).join(" ")}},name:"WelcomeScreen"},_={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-container",{attrs:{fluid:"","grid-list-xl":""}},[s("v-layout",{attrs:{row:"","justify-center":""}},[s("v-flex",{attrs:{xs6:""}},[s("div",[s("h2",[t._v("News Feed")])])])],1),t._v(" "),t._l(t.posts,function(e,r){return s("v-layout",{key:r,attrs:{row:"",wrap:"","justify-center":""}},[s("v-flex",{attrs:{xs6:""}},[s("v-card",{attrs:{raised:e.hovered},on:{mouseover:function(t){e.hovered=!0},mouseout:function(t){e.hovered=!1}}},[s("v-card-title",[s("div",[t._v("\r\n            "+t._s(e.text)+"\r\n          ")])]),t._v(" "),s("v-divider"),t._v(" "),s("v-card-actions",{staticClass:"post_actions"},[s("v-btn",{attrs:{icon:""}},[s("v-icon",{attrs:{color:"blue lighten-2"}},[t._v("thumb_up")])],1),t._v(" "),s("v-btn",{attrs:{icon:""}},[s("v-icon",{attrs:{color:"green darken-3"}},[t._v("comment")])],1),t._v(" "),s("v-spacer"),t._v(" "),s("v-btn",{attrs:{icon:""}},[s("v-icon",{attrs:{color:"red"}},[t._v("favorite")])],1),t._v(" "),s("v-btn",{attrs:{icon:""}},[s("v-icon",{attrs:{color:"teal"}},[t._v("bookmark")])],1),t._v(" "),s("v-btn",{attrs:{icon:""}},[s("v-icon",{attrs:{color:"blue darken-1"}},[t._v("share")])],1)],1)],1)],1)],1)})],2)},staticRenderFns:[]};var x=s("VU/8")(h,_,!1,function(t){s("bOZu")},null,null).exports,w={data:function(){return{passwordRules:[function(t){return!!t||"Password is required."},function(t){return!(t.length<=8)||"Password must be longer than 8 characters."}],emailRules:[function(t){return/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(t)||"Invalid e-mail address."},function(t){return!!t||" email is required."}],valid:!0,firstName:"Steven",lastName:"Myers",email:"larkenx@gmail.com",password:"ilikecandysomuch",confirmPassword:"ilikecandysomuch"}},methods:{validatePasswords:function(){var t=this;return[function(e){return e===t.password||"Passwords must match."}]},submit:function(){this.$refs.form.validate()?(console.log("Submitting form..."),this.$store.state.socket.emit("hello",1),this.$store.state.socket.emit("register",{firstName:this.firstName.trim(),lastName:this.lastName.trim(),email:this.email.trim(),password:this.password})):console.log("Couldn't validate the form inputs...")},clear:function(){this.$refs.form.reset(),this.firstName="",this.lastName="",this.email="",this.password="",this.confirmPassword=""},emailTaken:function(){return null!==this.$store.state.errors.registrationError&&this.$store.state.errors.registrationError.toLowerCase().includes("email")},checkIfEmailExists:function(){this.$store.state.socket.emit("checkIfEmailExists",this.email.trim())}}},b={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return null===this.$store.state.user._id?s("v-container",{attrs:{"fill-height":"",fluid:""}},[s("v-card",{staticStyle:{margin:"auto",width:"700px"}},[s("v-toolbar",{attrs:{flat:"",color:"green white--text"}},[s("v-toolbar-title",[t._v("Create an Account")])],1),t._v(" "),s("v-form",{ref:"form",staticClass:"pl-2 pr-2",attrs:{"lazy-validation":""},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[s("v-container",{attrs:{"grid-list-xl":"",fluid:""}},[s("v-layout",{attrs:{wrap:""}},[s("v-flex",{attrs:{xs12:"",sm6:""}},[s("v-text-field",{attrs:{label:"First Name",rules:[function(t){return!!t||"First Name is required."}],required:""},model:{value:t.firstName,callback:function(e){t.firstName=e},expression:"firstName"}})],1),t._v(" "),s("v-flex",{attrs:{xs12:"",sm6:""}},[s("v-text-field",{attrs:{label:"Last Name",rules:[function(t){return!!t||"Last Name is required."}],required:""},model:{value:t.lastName,callback:function(e){t.lastName=e},expression:"lastName"}})],1)],1),t._v(" "),s("v-layout",[s("v-flex",{attrs:{xs6:""}},[s("v-text-field",{attrs:{label:"Email Address",rules:t.emailRules,required:"",error:t.emailTaken()},on:{blur:function(e){t.checkIfEmailExists()}},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}})],1),t._v(" "),t.emailTaken()?s("v-flex",{attrs:{xs6:""}},[s("v-layout",{staticClass:"text-xs-center",attrs:{"align-center":""}},[s("v-icon",{staticClass:"pa-1",attrs:{color:"red"}},[t._v("error")]),t._v("\n                  Sorry, that email is taken.\n              ")],1)],1):""===t.email.trim()||t.emailTaken()?t._e():s("v-flex",{attrs:{xs6:""}},[s("v-layout",{staticClass:"text-xs-center",attrs:{"align-center":""}},[s("v-icon",{staticClass:"pa-1",attrs:{color:"green"}},[t._v("check_circle")]),t._v("\n                That email is available!\n            ")],1)],1)],1),t._v(" "),s("v-layout",[s("v-flex",{attrs:{xs6:""}},[s("v-text-field",{attrs:{label:"Password",type:"password",rules:t.passwordRules,required:""},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1)],1),t._v(" "),s("v-layout",[s("v-flex",{attrs:{xs6:""}},[s("v-text-field",{attrs:{label:"Confirm Your Password",rules:t.validatePasswords(),type:"password",required:""},model:{value:t.confirmPassword,callback:function(e){t.confirmPassword=e},expression:"confirmPassword"}})],1)],1),t._v(" "),s("v-layout",[s("v-spacer"),t._v(" "),s("v-btn",{staticClass:"white--text",attrs:{color:"green",disabled:!t.valid},on:{click:t.submit}},[t._v("\n            Create Account\n          ")]),t._v(" "),s("v-btn",{on:{click:t.clear}},[t._v("clear")])],1)],1)],1)],1)],1):s("v-container",{attrs:{"fill-height":"",fluid:""}},[s("v-card",{staticStyle:{"max-width":"500px",margin:"auto"}},[s("v-layout",[s("v-flex",{staticClass:"text-xs-center",attrs:{xs12:""}},[s("h2",[t._v("Account Registration")])])],1),t._v(" "),s("v-layout",[s("v-flex",{staticClass:"text-xs-center",attrs:{xs12:""}},[s("v-icon",{attrs:{"x-large":"",color:"gray"}},[t._v("error")])],1)],1),t._v(" "),s("v-card-text",[t._v("You're already logged in! If you'd like to register a new account, please log out and try again.")])],1)],1)},staticRenderFns:[]};var k=s("VU/8")(w,b,!1,function(t){s("Dack")},null,null).exports,y={data:function(){return{valid:!0,email:"test@example.com",password:"ilikecandysomuch"}},methods:{submit:function(){console.log("Logging in..."),this.clearLoginError(),this.$store.state.socket.emit("login",{email:this.email,password:this.password})},passwordOrEmailIncorrect:function(){return null!==this.$store.state.errors.loginError},clearLoginError:function(){this.$store.dispatch("clearError","login")}}},E={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-container",{attrs:{"fill-height":"",fluid:""}},[s("v-layout",{attrs:{wrap:"","align-center":""}},[s("v-flex",{attrs:{xs4:"","offset-xs4":""}},[s("v-card",[s("v-toolbar",{attrs:{flat:"",color:"blue white--text"}},[s("v-toolbar-title",[t._v("Sign In")])],1),t._v(" "),s("v-form",{ref:"form",attrs:{"lazy-validation":""},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[s("v-container",[s("v-layout",{staticClass:"ma-1",attrs:{fluid:"",wrap:""}},[s("v-container",{attrs:{fluid:"","grid-list-md":""}},[s("v-layout",{attrs:{"align-center-justify":"",wrap:""}},[s("v-flex",{attrs:{sm12:""}},[s("v-text-field",{attrs:{"prepend-icon":"person",label:"Email Address",required:"",error:t.passwordOrEmailIncorrect()},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}})],1)],1),t._v(" "),s("v-layout",{attrs:{"align-center":"",wrap:""}},[s("v-flex",{attrs:{sm12:""}},[s("v-text-field",{attrs:{"prepend-icon":"lock",label:"Password",type:"password",required:"",rules:[function(e){return!t.passwordOrEmailIncorrect()||"Your email or password is incorrect."}],error:t.passwordOrEmailIncorrect()},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1)],1)],1)],1),t._v(" "),s("v-layout",{attrs:{"align-center":""}},[s("router-link",{attrs:{exact:"",to:"/register"}},[t._v("Forgot your password?")]),t._v(" "),s("v-spacer"),t._v(" "),s("v-btn",{staticClass:"white--text",attrs:{raised:"",color:"blue"},on:{click:t.submit}},[t._v("\n                  Login\n                ")])],1)],1)],1)],1)],1)],1)],1)},staticRenderFns:[]};var C=s("VU/8")(y,E,!1,function(t){s("bjls")},null,null).exports;r.a.use(m.a);var N,$=new m.a({routes:[{path:"/",name:"Welcome",component:x},{path:"/chat/:userID?",name:"Chat",component:g,props:!0},{path:"/register/",name:"Register",component:k},{path:"/login/",name:"Login",component:C}]}),O=s("3EgV"),A=s.n(O),R=(s("7zck"),s("bOdI")),I=s.n(R),M=s("Dd8w"),U=s.n(M),S=s("NYxO"),L=s("DmT9"),P=s.n(L);r.a.use(S.a);var q=Object({NODE_ENV:"production"}).PORT||5e3,D=P.a.connect(window.location.hostname+":"+q);console.log("Connecting to socket server at "+window.location.hostname+":"+window.location.port);var T="LOAD_USER_INFORMATION",F="LOAD_NEW_CONVERSATION",V="LOAD_ALL_CONVERSATIONS",j="LOAD_NEW_MESSAGE",H="LOAD_USERS",Y="LOAD_ERROR",z="CLEAR_ERROR",W="LOGOUT",Z={_id:null,email:null,firstName:null,lastName:null,conversations:[],contacts:[]},G=new S.a.Store({state:{socket:D,user:Z,conversations:[],loadedUsers:[],directMessages:{},errors:{registrationError:null,loginError:null}},actions:{loadUserInformation:function(t,e){(0,t.commit)(T,e)},loadError:function(t,e){(0,t.commit)(Y,e)},loadNewConversation:function(t,e){(0,t.commit)(F,e)},loadAllConversations:function(t,e){(0,t.commit)(V,e)},loadNewMessage:function(t,e){(0,t.commit)(j,e)},loadUsers:function(t,e){(0,t.commit)(H,e)},clearError:function(t,e){(0,t.commit)(z,e)},logout:function(t){(0,t.commit)(W)}},mutations:(N={},I()(N,T,function(t,e){t.user=e}),I()(N,Y,function(t,e){var s=e.error,r=e.type;"registration"===r?t.errors.registrationError=s:"login"===r&&(t.errors.loginError=s)}),I()(N,F,function(t,e){if(t.conversations.push(e),t.user.conversations.push(e._id),2===e.participants.length){var s=e.participants.filter(function(e){return e!==t.user._id});1===s.length&&(t.directMessages[s[0]]=e)}}),I()(N,V,function(t,e){t.conversations=e,e.forEach(function(e){if(2===e.participants.length){var s=e.participants.filter(function(e){return e!==t.user._id});1===s.length&&(t.directMessages[s[0]]=e)}})}),I()(N,j,function(t,e){var s=e.conversation,r=e.message,a=t.conversations.filter(function(t){return t._id===s._id});1!==a.length?console.log("Uh oh. Received message for a conversation we don't have"):(console.log("Added new message to a conversation: ",r.text),a[0].messages.push(r),s._id in t.directMessages&&t.directMessages[s._id].messages.push(r))}),I()(N,H,function(t,e){console.log("Updated list of logged in users:",e),t.loadedUsers=e}),I()(N,z,function(t,e){"registration"===e?t.errors.registrationError=null:"login"===e&&(t.errors.loginError=null)}),I()(N,W,function(t){D.emit("logout",t.user),t.user=U()({},Z),$.push("/login")}),N)});D.on("loginSuccessful",function(t){G.dispatch("loadUserInformation",t),$.push("/")}),D.on("loadNewConversation",function(t){console.log("Client received a new conversation!",t),G.dispatch("loadNewConversation",t)}),D.on("loadAllConversations",function(t){console.log("Client received all conversations!",t),G.dispatch("loadAllConversations",t)}),D.on("loadUsers",function(t){G.dispatch("loadUsers",t)}),D.on("registrationSuccess",function(t){G.dispatch("loadUserInformation",t),$.push("/")}),D.on("registrationError",function(t){console.log(t),G.dispatch("loadError",{error:t,type:"registration"})}),D.on("loginError",function(t){G.dispatch("loadError",{error:t,type:"login"})}),D.on("newMessage",function(t){G.dispatch("loadNewMessage",t)});var J=G;r.a.use(A.a),r.a.config.productionTip=!1,new r.a({el:"#app",store:J,router:$,components:{App:v},template:"<App/>"})},bOZu:function(t,e){},bjls:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.b54933a26a683d0912e4.js.map