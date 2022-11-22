import './index.css';
import Card from '../script/components/Card.js';
import FormValidator from '../script/components/FormValidator.js';
import PopupConfirm from '../script/components/PopupConfirm.js';
import PopupWithForm from '../script/components/PopupWithForm.js';
import PopupWithImage from '../script/components/PopupWithImage.js';
import Section from '../script/components/Section.js';
import UserInfo from '../script/components/UserInfo.js';

import {
  api,
  validationObject,
  profileAvatarSelector,
  buttonEdit,
  buttonEditAvatar,
  buttonAddCard,
  submitButtonEdit,
  submitButtonEditAvatar,
  submitButtonAddCard,
  submitButtonConfirm,
  formEdit,
  formAddCard,
  formEditAvatar,
  profileNameSelector,
  profileJobSelector,
  cardsContainerSelector
} from '../script/utils/constants.js';

// Page-Load-Transition-Start
window.addEventListener('load', () => {
  document.querySelector('.page').classList.remove('windowLoading');
});
// Page-Load-Transition-End

// Validators-Start
const validatorEdit = new FormValidator (validationObject, formEdit);
validatorEdit.enableValidation();
const validatorAddCard = new FormValidator (validationObject, formAddCard);
validatorAddCard.enableValidation();
const validatorEditAvatar = new FormValidator (validationObject, formEditAvatar);
validatorEditAvatar.enableValidation();
// Validators-End

// -------------------------Profile-Start-------------------------
// Edit-Profile-Start
const profile = new UserInfo(profileNameSelector, profileJobSelector, profileAvatarSelector);

const popupEdit = new PopupWithForm(
  '.popup_type_edit',
  (elem) => {
    submitButtonEdit.textContent = 'Сохранение...';
    api.editProfile(elem.name, elem.job)
      .then((res) => {
        profile.setUserInfo(res.name, res.about);
        popupEdit.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        submitButtonEdit.textContent = 'Сохранить';
      });
  }
);
popupEdit.setEventListeners();

buttonEdit.addEventListener('click', () => {
  popupEdit.open();
  popupEdit.setInputValues(profile.getUserInfo());
  validatorEdit.checkFormValidity();
  validatorEdit.toggleSubmitButtonState();
});
// Edit-Profile-End

// Edit-Avatar-Start
const popupEditAvatar = new PopupWithForm(
  '.popup_type_editAvatar',
  (elem) => {
    submitButtonEditAvatar.textContent = 'Сохранение...';
    api.editAvatar(elem.link)
      .then((res) => {
        profile.changeAvatar(res);
        popupEditAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        submitButtonEditAvatar.textContent = 'Сохранить';
      });
  }
);
popupEditAvatar.setEventListeners();

buttonEditAvatar.addEventListener('click', () => {
  popupEditAvatar.open();
  validatorAddCard.hideFormErrors();
  validatorAddCard.toggleSubmitButtonState();
});
// Edit-Avatar-End
// -------------------------Profile-End-------------------------

// -------------------------Card-Start-------------------------
const cardsList = new Section(
  (elem) => {
    cardsList.addItem(createCard(elem).generateCard());
  },
cardsContainerSelector);

const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();

// Popup-Confirm-Start
const popupDeleteCard = new PopupConfirm(
  '.popup_type_confirm',
  (elem, elemToDel) => {
    submitButtonConfirm.textContent = 'Удаление...';
    api.deleteCard(elem)
      .then(() => {
        createCard(elem).deleteCard(elemToDel);
        popupDeleteCard.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        submitButtonConfirm.textContent = 'Да';
      });
  }
);
popupDeleteCard.setEventListeners();
// Popup-Confirm-End


function createCard(elem) {
  const card = new Card(elem, '#elements__item', popupImage, popupDeleteCard,
  (elem) => {
    api.putLike(elem)
      .then((res) => {
        !card.counterOfLikes(res.likes.length);
        card.putLike();
      })
      .catch((err) => {
        console.log(err);
      });
  },
  (elem) => {
    api.deleteLike(elem)
      .then((res) => {
        !card.counterOfLikes(res.likes.length);
        card.deleteLike();
      })
      .catch((err) => {
        console.log(err);
      });
  },  profile.id);
  return card;
}

// Popup-Add-Start
const popupAdd = new PopupWithForm(
  '.popup_type_addCard',
  (elem) => {
    submitButtonAddCard.textContent = 'Создание...';
    api.addCard(elem)
      .then((res) => {
        cardsList.addItem(createCard(res).generateCard());
        popupAdd.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        submitButtonAddCard.textContent = 'Создать';
      });
  }
);
popupAdd.setEventListeners();

buttonAddCard.addEventListener('click', () => {
  popupAdd.open();
  validatorAddCard.hideFormErrors();
  validatorAddCard.toggleSubmitButtonState();
});
// Popup-Add-End
// -------------------------Card-End-------------------------

// -------------------------Api-Start-------------------------
const user = api.getUserInfo();
const cards = api.getCards();

Promise.all([user, cards])
  .then((values) => {
    const userData = values[0];
    profile.setUserInfo(userData.name, userData.about);
    profile.id = userData._id;
    profile.changeAvatar(userData);

    const cardsData = values[1];
    cardsList.render(cardsData);
  })
  .catch((err) => {
    console.log(err);
  });
// -------------------------Api-End-------------------------
