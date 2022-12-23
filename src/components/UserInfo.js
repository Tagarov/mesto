export default class UserInfo {
  constructor(nameSelector, infoSelector, avatarSelector) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(infoSelector);
    this._avatar = document.querySelector(avatarSelector);
  }
  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.getAttribute("src"),
    };
    return userInfo;
  }
  setUserInfo(user) {
    this._id = user._id;
    this._name.textContent = user.name;
    this._about.textContent = user.about;
    this._avatar.setAttribute("src", user.avatar)
    
  }
  getUserId() {
    return this._id;
  }
}
