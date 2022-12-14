import React, { useEffect, useState } from "react";
import API, { authApi,endpoints } from "../configs/Apis";
import cookies from "react-cookies";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import WOW from "wowjs";
import { loginUser } from "../ActionCreators/UserCreators";
import pageTitle5 from "../assets/img/14926f75f7d51ac044ccc0847cfb262f.png";
import shape16 from "../static/image/shape/shape-16.png";
import shape17 from "../static/image/shape/shape-17.png";
import MessageSnackbar from "../components/MessageSnackbar";
import Header from "../components/Header";
import FirebaseInit from "../firebase/firebase-init";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State of message
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = useState("");
  const [typeMsg, setTypeMsg] = useState("");
  const [titleMsg, setTitleMsg] = useState("");

  const handleMessageClose = () => {
    setOpen(false);
  };

  const createMessage = (title, msg, type) => {
    setMsg(msg);
    setTitleMsg(title);
    setTypeMsg(type);
  };
  // End message

  useEffect(() => {
    new WOW.WOW({ live: false }).init();
  }, []);

  const login = async (event) => {
    event.preventDefault();

    try {
      let oAuthInfo = await API.get(endpoints["oauth2-info"]);
      let res = await API.post(endpoints["login"], {
        client_id: oAuthInfo.data.client_id,
        client_secret: oAuthInfo.data.client_secret,
        username: username,
        password: password,
        grant_type: "password",
      });

      if (res.status === 200) {
        setOpen(true);
        createMessage("Thành công", "Đăng nhập thành công !", "success");
        cookies.save("access_token", res.data.access_token);

        let user = await API.get(endpoints["current-user"], {
          headers: {
            Authorization: `Bearer ${cookies.load("access_token")}`,
          },
        });
        console.info(user);

        cookies.save("user", user.data);
        dispatch(loginUser(user.data));
        navigate("/");
      }
    } catch (err) {
      console.error(err);

      setOpen(true);
      createMessage(
        "Lỗi",
        "Sai tên tài khoản hoặc mật khẩu. Đảm bảo nhập đúng tên tài khoản và mật khẩu !",
        "error"
      );
    }
  };

  FirebaseInit();
   const provider = new GoogleAuthProvider();
   const handleGoogleSignedIn = () => {
      const auth = getAuth();
      console.log(auth);
      signOut(auth);
      signInWithPopup(auth, provider).then(async (result) => {
         const googleAccess = await API.post(endpoints["google-access"], {
            auth_token: result._tokenResponse.oauthIdToken,
         });
         console.log(googleAccess.data);
         cookies.save("access_token", googleAccess.data.tokens.access);
         const user = await authApi().get(endpoints["current_user"]);
         cookies.save("current_user", user.data);
         console.log(user.data);
         dispatch({
            type: "login",
            payload: user.data,
         });
        //  closeModal(false);
      });
   };

   let path = <>
      <Link  to='/loginAdmin' variant="primary" type="submit"  className="theme-btn">
            Đăng nhập bằng Admin
      </Link>
    </>

  return (
    <>
      <Header />
      <section
        className="page-title centred"
        style={{ backgroundImage: `url(${pageTitle5})` }}
      >
        <div className="auto-container">
          <div
            className="content-box wow fadeInDown animated animated"
            data-wow-delay="00ms"
            data-wow-duration="1500ms"
          >
            <h1>Login</h1>
            <p>Explore your next great journey</p>
          </div>
        </div>
      </section>
      <section className="register-section sec-pad">
        <div className="anim-icon">
          <div
            className="icon anim-icon-1"
            style={{
              backgroundImage: `url(${shape16})`,
            }}
          />
          <div
            className="icon anim-icon-2"
            style={{
              backgroundImage: `url(${shape17})`,
            }}
          />
        </div>
        <div className="auto-container">
          <div className="inner-box">
            <div className="sec-title centred">
              <p>Login</p>
              <h2>Connect with us for a better journey</h2>
            </div>
            <div className="form-inner">
              <h3>Login with</h3>
              <ul className="social-links clearfix">
                <button className="button-login">
                    <span>Login with Facebook _</span>
                    <i className="fab fa-facebook-f" />
                </button>
                <button
                        className="button-login"
                        onClick={handleGoogleSignedIn}
                     >
                        Log in with Google _ 
                        <i class="fab fa-google-plus-g"></i>
                     </button>
                {/* <li>
                    <span>Login with  Google _</span>
                    <button className="buttonsLogin-loginOtherWay--google fab fa-google-plus-g"
                        onClick={handleGoogleSignedIn} />
                </li> */}
              </ul>
              <div className="text">
                <span>Or</span>
              </div>
              <form onSubmit={login} className="register-form">
                <div className="row clearfix">
                  <LoginForm
                    id="username"
                    label="User name"
                    field={username}
                    change={(event) => setUsername(event.target.value)}
                    type="text"
                    placeholder="Enter User name"
                  />
                  <LoginForm
                    id="password"
                    label="Password"
                    field={password}
                    change={(event) => setPassword(event.target.value)}
                    type="password"
                    placeholder="Enter Password"
                  />
                  <div className="col-lg-12 col-md-12 col-sm-12 column">
                    <div className="form-group">
                      <div className="forgor-password text-right">
                        <Link to="/forgot-password">Forgot password?</Link>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-lg-12 col-md-12 col-sm-12 column"
                    style={{ display: "flex" }}
                  >
                    <div className="form-group message-btn">
                      <button type="submit" className="theme-btn">
                        Login
                      </button>
                    </div>
                    {/* <div className="form-group message-btn"style={{marginLeft:'50px'}}>
                                            {path}
                                        </div> */}
                  </div>
                </div>
              </form>
              <div className="other-text">
              No account? <Link to="/register">Register Now</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MessageSnackbar
        handleClose={handleMessageClose}
        isOpen={open}
        msg={msg}
        type={typeMsg}
        title={titleMsg}
      />
    </>
  );
}

function LoginForm(props) {
  return (
    <>
      <div className="col-lg-12 col-md-12 col-sm-12 column">
        <div className="form-group">
          <label>{props.label}</label>
          <input
            value={props.field}
            type={props.type}
            id={props.id}
            onChange={props.change}
            required
          />
        </div>
      </div>
    </>
  );
}
