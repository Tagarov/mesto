export default class Api {
  constructor(token, cohort) {
    this._token = token;
    this._baseUrl = "https://mesto.nomoreparties.co/v1/cohort-" + cohort;
  }
  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  getCardsFromServer() {
    {
      return fetch(this._baseUrl + "/cards", {
        headers: {
          authorization: this._token,
        },
      }).then(this._handleResponse);
    }
  }
  getUserFromServer() {
    return fetch(this._baseUrl + "/users/me", {
      method: "GET",
      headers: {
        authorization: this._token,
      },
    }).then(this._handleResponse);
  }
  updateProfileInfo(profileInfo) {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileInfo),
    }).then(this._handleResponse);
  }
  addNewCard(card) {
    return fetch(this._baseUrl + "/cards", {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(card),
    }).then(this._handleResponse);
  }
  deleteMyCard(cardId) {
    return fetch(this._baseUrl + "/cards/" + cardId, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then(this._handleResponse);
  }
  putLikeCard(cardId) {
    return fetch(this._baseUrl + "/cards/" + cardId + "/likes", {
      method: "PUT",
      headers: {
        authorization: this._token,
      },
    }).then(this._handleResponse);
  }
  deleteLikeCard(cardId) {
    return fetch(this._baseUrl + "/cards/" + cardId + "/likes", {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then(this._handleResponse);
  }
  editProfileAvatar(avatarLink) {
    return fetch(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(avatarLink),
    }).then(this._handleResponse);
  }
}
