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
          authorization: "55cf33fe-b700-4b09-9625-cce358d02d0f",
        },
      }
    ).then((res) => res.json());
  }
  updateProfileInfo(data) {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-54/users/me", {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
  }
}
