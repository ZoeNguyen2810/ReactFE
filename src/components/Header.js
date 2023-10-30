import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../components/assets/images/duolingo.png";
import { useLocation } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { set } from "lodash";
import { handelLogOut } from "../redux/action/useraAction";
import "./Home.scss";

const Header = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.user.account);
  // const [ hideHeader , setHideHeader] = useState(false)

  // useEffect( () => {

  //   if (window.location.pathname === "/login") {
  //     setHideHeader(true);

  //   }
  // } ,[])
  // const a = null;
  // console.log(a.abc)
  const dispatch = useDispatch();
  const handleLogout1 = () => {
    // logout();
    dispatch(handelLogOut());
    toast.success("LogOut sucessfully !");
  };
  useEffect(() => {
    if (user && user.path === false && window.location.pathname !== "/login") {
      navigate("/");
    }
  }, [user]);
  return (
    <>
      <div>
        <Navbar expand="lg" className="bg-body-tertiary ">
          <Container>
            <Navbar.Brand href="#home">
              <div style={{ color: "rgb(30, 48, 80)" }}>
                <img
                  src="https://tse2.mm.bing.net/th?id=OIP.F6ZGRST8g68_B209FJwH8gHaCx&pid=Api&P=0&h=180"
                  style={{ width: "70px", height: "40px", marginRight: "10px" }}
                />
              </div>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              {((user && user.path === true) ||
                window.location.pathname === "/") && (
                // Check neu khong co hideHeader thi hien
                <>
                  <Nav className="me-auto" activeKey={location.pathname}>
                    <NavLink to="/" className=" nav-link">
                      <i
                        className="fa-solid fa-house"
                        style={{ fontSize: "25px", color: "rgb(30, 48, 80)" }}
                        title="Home"
                      ></i>
                    </NavLink>
                    <NavLink to="/user" className=" nav-link">
                      <div style={{ display: "flex" }} >
                        <i
                          className="fa-solid fa-list-check"
                          style={{ color: "rgb(30, 48, 80)", fontSize: "25px" , margin : "3px 0 0 10px" }}
                          title="MANAGE"
                        ></i>
                        {/* <span style={{ marginTop : "10px" , marginRight : "50px"}}>manage</span> */}
                      </div>
                    </NavLink >
                    <NavLink to="/Cars" className="nav-link" >
                      <div style={{ color: "rgb(30, 48, 80)", fontSize: "20px" }}>
                      <i className="fa-solid fa-store"></i>
                      &nbsp;<span>Cars</span>

                      </div>  

                    </NavLink>
                  </Nav>
                  <Nav>
                    {user && user.email ? (
                      <span
                        className="nav-link"
                        style={{
                          color: "rgb(30, 48, 80)",
                          fontSize: "17px",
                          marginRight: "20px",
                        }}
                      >
                        Welcome back !{/* {user.email}!{" "} */}
                      </span>
                    ) : (
                      ""
                    )}
                    <i
                      className="fa-solid fa-gears"
                      style={{
                        marginTop: "13px",
                        fontSize: "25px",
                        color: "rgba(30, 48, 80)",
                      }}
                    ></i>
                    <NavDropdown
                      title="Settings"
                      id="basic-nav-dropdown"
                      style={{ color: "rgba(30, 48, 80)", fontSize: "17px" }}
                    >
                      {user && user.auth === true ? (
                        <NavDropdown.Item onClick={() => handleLogout1()}>
                          LogOut
                        </NavDropdown.Item>
                      ) : (
                        <NavLink className="dropdown-item" to="/login">
                          Login
                        </NavLink>
                      )}
                    </NavDropdown>
                  </Nav>
                </>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
};

export default Header;
