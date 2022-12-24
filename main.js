(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var t=function(){function t(e,n,r,o,i){var a,u,s=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),u=function(){s._element.remove()},(a="_deleteCard")in this?Object.defineProperty(this,a,{value:u,enumerable:!0,configurable:!0,writable:!0}):this[a]=u,this._name=e.name,this._link=e.link,this._templateSelector=n,this._handleOpenPopup=r,this._handleOpenDeletePopup=o,this._handleLikeClick=i,this._likes=e.likes,this._id=e._id,this._owner=e.owner}var n,r;return n=t,r=[{key:"_getTemplate",value:function(){return document.querySelector(this._templateSelector).content.querySelector(".elements__element").cloneNode(!0)}},{key:"_toggleLikeCard",value:function(){this._elementLike.classList.toggle("elements__element-heart_active")}},{key:"_setEventListeners",value:function(){var e=this;this._elementImage.addEventListener("click",(function(){return e._handleOpenPopup({name:e._name,link:e._link})})),this._elementDeleteButton.addEventListener("click",(function(){e._handleOpenDeletePopup(e)})),this._elementLike.addEventListener("click",(function(){e._handleLikeClick(e)}))}},{key:"_isCardMine",value:function(e){return this._owner._id===e}},{key:"isLikedByMe",value:function(e){return!!this._likes.find((function(t){return t._id===e}))}},{key:"updateLike",value:function(e){this._likes=e,this._toggleLikeCard(),this._elementLikeCounter.textContent=this._likes.length}},{key:"getCardId",value:function(){return this._id}},{key:"generateCard",value:function(e){return this._element=this._getTemplate(),this._element.querySelector(".elements__element-name").textContent=this._name,this._elementImage=this._element.querySelector(".elements__element-image"),this._elementImage.setAttribute("src",this._link),this._elementImage.setAttribute("alt","Фото ".concat(this._name)),this._elementLike=this._element.querySelector(".elements__element-heart"),this._elementLikeCounter=this._element.querySelector(".elements__element-like-counter"),this._elementLikeCounter.textContent=this._likes.length,this._elementDeleteButton=this._element.querySelector(".elements__element-delete-button"),this._isCardMine(e)&&this._elementDeleteButton.classList.remove("elements__element-delete-button_disable"),this.isLikedByMe(e)&&this._toggleLikeCard(),this._setEventListeners(),this._element}}],r&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}();function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var o=function(){function e(t,n){var o=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),r(this,"_hasInvalidInput",(function(){return o._inputList.some((function(e){return!e.validity.valid}))})),r(this,"_toggleButtonState",(function(){o._hasInvalidInput()?o.disableButton():(o._buttonElement.classList.remove(o._valObj.inactiveButtonClass),o._buttonElement.removeAttribute("disabled","true"))})),r(this,"_showInputError",(function(e,t){var n=o._formElement.querySelector(".".concat(e.id,"-error"));e.classList.add(o._valObj.inputErrorClass),n.textContent=t,n.classList.add(o._valObj.errorClass)})),r(this,"_hideInputError",(function(e){var t=o._formElement.querySelector(".".concat(e.id,"-error"));e.classList.remove(o._valObj.inputErrorClass),t.classList.remove(o._valObj.errorClass),t.textContent=""})),r(this,"_toggleInputErrorState",(function(e){e.validity.valid?o._hideInputError(e):o._showInputError(e,e.validationMessage)})),this._formElement=n,this._valObj=t}var t,o;return t=e,(o=[{key:"disableButton",value:function(){this._buttonElement.classList.add(this._valObj.inactiveButtonClass),this._buttonElement.setAttribute("disabled","true")}},{key:"_setEventListeners",value:function(){var e=this;this._inputList=Array.from(this._formElement.querySelectorAll(this._valObj.inputSelector)),this._buttonElement=this._formElement.querySelector(this._valObj.submitButtonSelector),this._inputList.forEach((function(t){t.addEventListener("input",(function(){e._toggleInputErrorState(t),e._toggleButtonState()}))}))}},{key:"resetValidation",value:function(){var e=this;this._inputList.forEach((function(t){e._hideInputError(t)})),this._toggleButtonState()}},{key:"enableValidation",value:function(){this._setEventListeners()}}])&&n(t.prototype,o),Object.defineProperty(t,"prototype",{writable:!1}),e}();function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var a=function(){function e(t,n){var r=t.items,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderedItems=r,this._renderer=o,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"renderItems",value:function(e){var t=this;e.forEach((function(e){t.addItem(e)}))}},{key:"addItem",value:function(e){var t=this._renderer(e);this._container.append(t)}},{key:"addFirstItem",value:function(e){var t=this._renderer(e);this._container.prepend(t)}}])&&i(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var s=function(){function e(t){var n,r,o=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),r=function(e){"Escape"===e.key&&o.close()},(n="_handleEscClose")in this?Object.defineProperty(this,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):this[n]=r,this._popup=document.querySelector(t)}var t,n;return t=e,(n=[{key:"open",value:function(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"setEventListeners",value:function(){var e=this;this._popup.addEventListener("mousedown",(function(t){(t.target.classList.contains("popup")||t.target.classList.contains("popup__close-button"))&&e.close()}))}}])&&u(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function l(e){return l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},l(e)}function c(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function f(){return f="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=p(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},f.apply(this,arguments)}function p(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=y(e)););return e}function h(e,t){return h=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},h(e,t)}function d(e,t){if(t&&("object"===l(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function y(e){return y=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},y(e)}var _=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&h(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=y(r);if(o){var n=y(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return d(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._image=t._popup.querySelector(".popup-figure__image"),t._caption=t._popup.querySelector(".popup-figure__caption"),t}return t=a,(n=[{key:"open",value:function(e){var t=e.link,n=e.name;this._image.setAttribute("src",t),this._image.setAttribute("alt","Фото ".concat(n)),this._caption.textContent=n,f(y(a.prototype),"open",this).call(this)}}])&&c(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(s);function b(e){return b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},b(e)}function v(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function m(){return m="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=g(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},m.apply(this,arguments)}function g(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=O(e)););return e}function k(e,t){return k=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},k(e,t)}function w(e,t){if(t&&("object"===b(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function O(e){return O=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},O(e)}var E=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&k(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=O(r);if(o){var n=O(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return w(this,e)});function a(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,e))._form=n._popup.querySelector(".popup__form"),n._handleSubmitForm=t,n._inputList=Array.from(n._form.querySelectorAll(".popup__input")),n._btn=n._popup.querySelector(".popup__button"),n}return t=a,(n=[{key:"getInputValues",value:function(){var e={};return this._inputList.forEach((function(t){e[t.name]=t.value})),e}},{key:"setEventListeners",value:function(){m(O(a.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",this._handleSubmitForm)}},{key:"close",value:function(){this._form.reset(),m(O(a.prototype),"close",this).call(this)}},{key:"setInputValues",value:function(e){this._inputList.forEach((function(t){e[t.name]&&(t.value=e[t.name])}))}},{key:"setButtonMessage",value:function(e){this._btn.textContent=e}}])&&v(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(s);function C(e){return C="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},C(e)}function j(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function L(){return L="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=S(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},L.apply(this,arguments)}function S(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=R(e)););return e}function P(e,t){return P=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},P(e,t)}function I(e,t){if(t&&("object"===C(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function R(e){return R=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},R(e)}var B=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&P(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=R(r);if(o){var n=R(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return I(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._btn=t._popup.querySelector(".popup__button"),t}return t=a,(n=[{key:"open",value:function(e){this._handleButtonClick=e,L(R(a.prototype),"open",this).call(this)}},{key:"setEventListeners",value:function(){var e=this;L(R(a.prototype),"setEventListeners",this).call(this),this._btn.addEventListener("click",(function(){e._handleButtonClick()}))}},{key:"setButtonMessage",value:function(e){this._btn.textContent=e}}])&&j(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(s);function T(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var q=function(){function e(t,n,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._name=document.querySelector(t),this._about=document.querySelector(n),this._avatar=document.querySelector(r)}var t,n;return t=e,n=[{key:"getUserInfo",value:function(){return{name:this._name.textContent,about:this._about.textContent,avatar:this._avatar.getAttribute("src")}}},{key:"setUserInfo",value:function(e){this._id=e._id,this._name.textContent=e.name,this._about.textContent=e.about,this._avatar.setAttribute("src",e.avatar)}},{key:"getUserId",value:function(){return this._id}}],n&&T(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function U(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var x=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._token=t,this._baseUrl="https://mesto.nomoreparties.co/v1/cohort-"+n}var t,n;return t=e,(n=[{key:"_handleResponse",value:function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}},{key:"getCardsFromServer",value:function(){return fetch(this._baseUrl+"/cards",{headers:{authorization:this._token}}).then(this._handleResponse)}},{key:"getUserFromServer",value:function(){return fetch(this._baseUrl+"/users/me",{method:"GET",headers:{authorization:this._token}}).then(this._handleResponse)}},{key:"updateProfileInfo",value:function(e){return fetch(this._baseUrl+"/users/me",{method:"PATCH",headers:{authorization:this._token,"Content-Type":"application/json"},body:JSON.stringify(e)}).then(this._handleResponse)}},{key:"addNewCard",value:function(e){return fetch(this._baseUrl+"/cards",{method:"POST",headers:{authorization:this._token,"Content-Type":"application/json"},body:JSON.stringify(e)}).then(this._handleResponse)}},{key:"deleteMyCard",value:function(e){return fetch(this._baseUrl+"/cards/"+e,{method:"DELETE",headers:{authorization:this._token}}).then(this._handleResponse)}},{key:"putLikeCard",value:function(e){return fetch(this._baseUrl+"/cards/"+e+"/likes",{method:"PUT",headers:{authorization:this._token}}).then(this._handleResponse)}},{key:"deleteLikeCard",value:function(e){return fetch(this._baseUrl+"/cards/"+e+"/likes",{method:"DELETE",headers:{authorization:this._token}}).then(this._handleResponse)}},{key:"editProfileAvatar",value:function(e){return fetch(this._baseUrl+"/users/me/avatar",{method:"PATCH",headers:{authorization:this._token,"Content-Type":"application/json"},body:JSON.stringify(e)}).then(this._handleResponse)}}])&&U(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}(),M={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},A=document.querySelector(".profile__edit-button"),D=document.querySelector(".profile__add-button"),V=document.querySelector(".profile__edit-avatar-button"),F=document.forms.editProfileInfoForm,z=document.forms.addNewPlace,N=document.forms.editAvatar,J=new _(".popup_type_card");J.setEventListeners();var H,G=new q(".profile__person",".profile__person-description",".profile__avatar"),K=new o(M,z),Q=new o(M,F),W=new o(M,N),X=new x("55cf33fe-b700-4b09-9625-cce358d02d0f",54),Y=new B(".popup_type_delete-card"),Z=function(e){Y.open.bind(Y)(function(e){return function(){Y.setButtonMessage("Удаление..."),X.deleteMyCard(e.getCardId()).then((function(){e._deleteCard(),Y.close()})).catch((function(e){console.log(e)})).finally((function(){Y.setButtonMessage("Да")}))}}(e))};K.enableValidation(),Q.enableValidation(),W.enableValidation(),A.addEventListener("click",(function(){ee.setInputValues(G.getUserInfo()),Q.resetValidation(),ee.open()})),D.addEventListener("click",(function(){K.resetValidation(),$.open()})),V.addEventListener("click",(function(){W.resetValidation(),te.open()}));var $=new E(".popup_form_add-place",(function(e){e.preventDefault(),$.setButtonMessage("Cохранение...");var t=$.getInputValues();X.addNewCard(t).then((function(e){ne.addFirstItem(e),$.close()})).catch((function(e){console.log(e)})).finally((function(){$.setButtonMessage("Добавить")}))}));$.setEventListeners();var ee=new E(".popup_form_edit-profile",(function(e){e.preventDefault(),ee.setButtonMessage("Cохранение..."),X.updateProfileInfo(ee.getInputValues()).then((function(e){G.setUserInfo(e),ee.close()})).catch((function(e){console.log(e)})).finally((function(){ee.setButtonMessage("Cохранить")}))}));ee.setEventListeners();var te=new E(".popup_form_edit-profile-avatar",(function(e){e.preventDefault(),te.setButtonMessage("Cохранение..."),X.editProfileAvatar(te.getInputValues()).then((function(e){G.setUserInfo(e),te.close()})).catch((function(e){console.log(e)})).finally((function(){te.setButtonMessage("Cохранить")}))}));te.setEventListeners();var ne=new a({renderer:function(e){return new t(e,"#element-template",J.open.bind(J),Z,re).generateCard(H)}},".elements");Promise.all([X.getUserFromServer(),X.getCardsFromServer()]).then((function(e){G.setUserInfo(e[0]),H=G.getUserId(),ne.renderItems(e[1])})).catch((function(e){console.log(e)})),Y.setEventListeners();var re=function(e){e.isLikedByMe(H)?X.deleteLikeCard(e.getCardId()).then((function(t){e.updateLike(t.likes)})).catch((function(e){console.log(e)})):X.putLikeCard(e.getCardId()).then((function(t){e.updateLike(t.likes)})).catch((function(e){console.log(e)}))}})();