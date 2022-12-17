export default class Api {
  constructor(token, cohort) {
    this._token = token;
    this._baseUrl = "https://mesto.nomoreparties.co/v1/cohort-" + cohort;
  }
  getCardsFromServer() {
    {
      return fetch(this._baseUrl + "/cards", {
        headers: {
          authorization: this._token,
        },
      }).then((res) => res.json());
    }
  }
  getUserFromServer() {
    return fetch(this._baseUrl + "/users/me", {
      method: "GET",
      headers: {
        authorization: this._token,
      },
    }).then((res) => res.json());
  }
  updateProfileInfo(profileInfo) {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileInfo),
    }).then((res) => res.json());
  }
  addNewCard(card) {
    return fetch(this._baseUrl + "/cards", {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(card),
    }).then((res) => res.json());
  }
  deleteMyCard(cardId) {
    return fetch(this._baseUrl + "/cards/" + cardId, {
        method: "DELETE",
        headers: {
          authorization: this._token,
        },
      }).then((res) => res.json());
  }
}
