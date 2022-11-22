import {useState, useEffect} from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import {api} from "../utils/Api";
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import * as Auth from '../utils/Auth';

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [selectedCard, showSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [authStatusMessage, setAuthStatusMessage] = useState('');
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if(!loggedIn) return;
    api.getUserInfo()
      .then((res) => {
        setCurrentUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loggedIn]);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setImagePopupOpen(true);
    showSelectedCard(card);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    showSelectedCard({});
    setInfoTooltipOpen(false);
  }

  function handleUpdateUser(obj) {
    api.editProfile(obj.name, obj.about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(obj) {
    api.editAvatar(obj.avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //-------------------------Cards-Start-------------------------
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if(!loggedIn) return;
    api.getCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loggedIn])

  function handleCardLike(card) {
    // const isLiked = card.likes.some((item) => {
    //   return item._id === currentUser._id
    // });
    const isLiked = card.likes.includes(currentUser._id);


    api.changeLikeCardStatus(card, !isLiked)
      .then((res) => {
        setCards((state) => state.map((item) => item._id === card._id ? res : item));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card)
      .then(() => {
        setCards((prevState) => prevState.filter((item) => item._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(obj) {
    api.addCard(obj)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //-------------------------Cards-End-------------------------

  //-------------------------Authorization-Start-------------------------
  function handleRegister(email, password) {
    return Auth.register(email, password)
      .then((res) => {
        if(res) {
          setInfoTooltipOpen(true);
          setIsSuccessful(true);
          setAuthStatusMessage('Вы успешно зарегистрировались!');
          history.push('/sign-in');
        }
      })
      .catch((err) => {
        setInfoTooltipOpen(true);
        setIsSuccessful(false);
        setAuthStatusMessage('Что-то пошло не так! Попробуйте ещё раз.');
        console.log(err);
      })
  }

  function handleLogin(email, password) {
    return Auth.authorize(email, password)
      .then(() => {
        setUserEmail(email);
        setLoggedIn(true);
        history.push('/');
      })
      .catch((err) => {
        console.log('Test 2');
        setInfoTooltipOpen(true);
        setIsSuccessful(false);
        setAuthStatusMessage('Что-то пошло не так! Попробуйте ещё раз.');
        console.log(err);
      })
  }

  function handleLogout() {
    setUserEmail('');
    setLoggedIn(false);
    history.push('/sign-in');
  }

  useEffect(() => {
    function checkToken() {
      return Auth.getContent()
        .then((res) => {
          if(res) {
            setLoggedIn(true);
            setUserEmail(res.data.email);
            history.push('/');
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }

    checkToken();
  }, [])

  //-------------------------Authorization-End-------------------------

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={loggedIn} onLogout={handleLogout} email={userEmail}/>
        <Switch>
          <Route path="/sign-up">
            <Register onRegister={handleRegister} />
          </Route>
          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>
          <ProtectedRoute exact path="/" loggedIn={loggedIn}>
            <Main
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          </ProtectedRoute>
          <Route path="*">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <Footer />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddPlaceSubmit}/>
        <PopupWithForm title="Вы уверены?" name="confirm" buttonText="Да">
          <>
            <button type="button"  className="popup__close-button"></button>
          </>
        </PopupWithForm>
        <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
        <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} message={authStatusMessage} success={isSuccessful} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
