export default class Api {
  constructor(token, cohort) {
    this._token = token;
    this._cohort = cohort;
  }
  getCardsFromServer() {
    {
      return fetch(
        "https://mesto.nomoreparties.co/v1/cohort-" + this._cohort + "/cards",
        {
          headers: {
            authorization: this._token,
          },
        }
      ).then((res) => res.json());
    }
  }
  getUserFromServer() {
    return fetch(
      "https://nomoreparties.co/v1/cohort-" + this._cohort + "/users/me",
      {
        method: "GET",
        headers: {
          authorization: this._token,
        },
      }
    ).then((res) => res.json());
  }
  updateProfileInfo(profileInfo) {
    return fetch(
      "https://mesto.nomoreparties.co/v1/cohort-" + this._cohort + "/users/me",
      {
        method: "PATCH",
        headers: {
          authorization: this._token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileInfo),
      }
    ).then((res) => res.json());
  }
  addNewCard(card) {
    return fetch(
      "https://mesto.nomoreparties.co/v1/cohort-" + this._cohort + "/cards",
      {
        method: "POST",
        headers: {
          authorization: this._token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(card),
      }
    ).then((res) => res.json());
  }
}
