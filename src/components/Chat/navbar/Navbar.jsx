import { useAuth } from "hooks/use-auth";
import { useDispatch } from 'react-redux'
import { removeUser } from "store/auth/auth-actions";
import "./navbar.css";


export const Navbar = () => {

  const dispatch = useDispatch();

  const { isAuth, email } = useAuth();


  return isAuth ? (
    <div>
      <div className="chat-head-item-navbar">
        <div className="user-profile-pic-container">
          <p className="user-profile-pic-text"></p>
        </div>
        <div>
          <p className="user-name">{email}</p>
          <div className="log-out-button">
            <button
              onClick={() => dispatch(removeUser())}
            >Log out</button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  )
}

