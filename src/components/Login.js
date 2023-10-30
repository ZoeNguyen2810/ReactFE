import { useEffect, useState } from "react";
import { LoginAPI } from "../services/userServices";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/useContext";
// import { handelLoginRedux } from "../redux/action/useraAction";
import { handelLoginRedux } from "../redux/action/useraAction";
import { useDispatch, useSelector } from "react-redux";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShow, setIsShow] = useState(false);
  const isLoading = useSelector((state) => state.user.isLoading);
  const navigate = useNavigate();
  const account = useSelector( state => state.user.account)
  const dispatch = useDispatch();
  const { loginContext } = useContext(UserContext);
  const handleGoback = () => {
    navigate("/");
  };

  // khi login thanh cong logic se tra vè trang login và k cho login nưa
  // useEffect(() => {
  //   let token = localStorage.getItem("token");
  //   if ( token) {
  //       navigate("/")
  //   }
  // }, [])

  const handelLogin = async () => {
    if (!email || !password) {
      toast.error("Khong duoc bo trong truong nao");
      return;
    }
    // setLoading(true)
    dispatch(handelLoginRedux(email, password));
    // let res = await LoginAPI(email.trim(), password);
    // if (res && res.token) {
    //   loginContext( email , res.token)
    //   navigate("/")
    // } else {
    //   if (res && res.status === 400) {
    //     toast.error("user not found");
    //   }
    // }
    // setLoading(false)
  };
  const handelPress = (event) => {
    if (event && event.key === "Enter") {
      handelLogin();
    }
  };
  useEffect(() => {
    // eslint-disable-next-line no-undef
    if (account && account.auth === true) {
      navigate("/");
    }
  }, [account]);

  return (
    <>
      <div className="login-container col-12 col-sm-4">
        <div className="title">
          <i className="fa-solid fa-arrow-right-to-bracket"></i>&nbsp; Log in
        </div>
        <div className="text">Email or User Name</div>
        <input
          type="text"
          placeholder="Email or UserName"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <div className="input-2">
          <input
            type={isShow === true ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onKeyDown={(event) => handelPress(event)}
          />
          <i
            className={
              isShow === false ? "fa-regular fa-eye-slash" : "fa-solid fa-eye"
            }
            onClick={() => setIsShow(!isShow)}
          ></i>
        </div>

        <button
          className={email && password ? "active" : ""}
          disabled={email && password ? false : true}
          onClick={() => handelLogin()}
        >
          {isLoading && <i class="fa-solid fa-sync fa-spin"></i>}&nbsp;Login
          {/* &nbsp; dung de cach ra */}
        </button>
        <div className="back">
          <i className="fa-solid fa-chevron-left"></i>
          <span onClick={() => handleGoback()}>&nbsp;Back</span>
        </div>
      </div>
    </>
  );
};

export default Login;
