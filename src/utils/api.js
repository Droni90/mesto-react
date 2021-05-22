class Api {
  constructor(options) {
    this._options = options
  }

  getInitialCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-23/cards', this._options)
      .then(res => res.ok
        ? res.json()
        : Promise.reject(`Ошибка: ${res.status}`)
      )
  }

  getUserInfo() {
      return fetch('https://mesto.nomoreparties.co/v1/cohort-23/users/me', this._options)
        .then(res => res.ok
          ? res.json()
          : Promise.reject(`Ошибка: ${res.status}`)
        )
  }
  //отправка инфо
  patchProfileInfo(inputsValue) {
    const newOptions = {
      ...this._options,
      body: JSON.stringify(inputsValue),
      method: 'PATCH',
    }
    return fetch('https://mesto.nomoreparties.co/v1/cohort-23/users/me', newOptions)
      .then(res => res.ok
        ? res.json()
        : Promise.reject(`Ошибка: ${res.status}`)
      )
  }
  // Отправляет информацию о пользователе на сервер
  patchAddCard(inputsValue) {
    const newOptions = {
      ...this._options,
      body: JSON.stringify(inputsValue),
      method:'POST',
    }
    return fetch('https://mesto.nomoreparties.co/v1/cohort-23/cards', newOptions)
      .then(res => res.ok
        ? res.json()
        : Promise.reject(`Ошибка: ${res.status}`)
      )
  }
  //Удаляем карту
  removeCard(cardId) {
    const newOptions = {
      ...this._options,
      method:'DELETE',
    }
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-23/cards/${cardId}`, newOptions)
      .then(res => res.ok
        ? res.json()
        : Promise.reject(`Ошибка: ${res.status}`)
      )
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
      .then(res => res.ok
        ? res.json()
        : Promise.reject(`Ошибка: ${res.status}`)
      )
  }

  //Обновляем аватар
  refreshAvatar(inputsValue) {
    const newOptions = {
      ...this._options,
      body: JSON.stringify(inputsValue),
      method: 'PATCH',
    }
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-23/users/me/avatar`, newOptions)
      .then(res => res.ok
        ? res.json()
        : Promise.reject(`Ошибка: ${res.status}`)
      )
  }
}

export default new Api({
  baseUrl: `https://mesto.nomoreparties.co/v1/cohort-23`,
  headers: {
    authorization: '86ef1a8f-339e-4d95-95ed-898b94db20dd',
    'Content-Type': 'application/json'
  }
});
