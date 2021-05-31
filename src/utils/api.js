class Api {
  constructor(options) {
    this._options = options
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-23/cards', this._options)
      .then(this._checkResponse)
  }

  getUserInfo() {
      return fetch('https://mesto.nomoreparties.co/v1/cohort-23/users/me', this._options)
        .then(this._checkResponse)
  }
  //отправка инфо
  patchProfileInfo(inputsValue) {
    const newOptions = {
      ...this._options,
      body: JSON.stringify(inputsValue),
      method: 'PATCH',
    }
    return fetch('https://mesto.nomoreparties.co/v1/cohort-23/users/me', newOptions)
      .then(this._checkResponse)
  }
  // Отправляет информацию о пользователе на сервер
  patchAddCard(inputsValue) {
    const newOptions = {
      ...this._options,
      body: JSON.stringify(inputsValue),
      method:'POST',
    }
    return fetch('https://mesto.nomoreparties.co/v1/cohort-23/cards', newOptions)
      .then(this._checkResponse)
  }
  //Удаляем карту
  removeCard(cardId) {
    const newOptions = {
      ...this._options,
      method:'DELETE',
    }
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-23/cards/${cardId}`, newOptions)
      .then(this._checkResponse)
  }
  //Ставим лайк
  changeLikeCardStatus(cardId, isLiked) {
    const putOptions = {
      ...this._options,
      method:'PUT',
    }
    const delOptions = {
      ...this._options,
      method:'DELETE',
    }
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-23/cards/likes/${cardId}`, isLiked ? delOptions : putOptions)
      .then(this._checkResponse)
  }

  //Обновляем аватар
  refreshAvatar(inputsValue) {
    const newOptions = {
      ...this._options,
      body: JSON.stringify(inputsValue),
      method: 'PATCH',
    }
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-23/users/me/avatar`, newOptions)
      .then(this._checkResponse)
  }
}

export default new Api({
  baseUrl: `https://mesto.nomoreparties.co/v1/cohort-23`,
  headers: {
    authorization: '86ef1a8f-339e-4d95-95ed-898b94db20dd',
    'Content-Type': 'application/json'
  }
});
