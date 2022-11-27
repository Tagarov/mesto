export default class UserInfo {
  constructor(nameSelector, infoSelector) {
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
  }
  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      info: this._info.textContent,
    };
    return userInfo;
  }
  setUserInfo(user) {
    this._name.textContent = user.name;
    this._info.textContent = user.info;
  }
}
