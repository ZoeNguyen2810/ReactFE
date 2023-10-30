// import logo from './logo.svg';
import { Button, Row } from "react-bootstrap";
import "./App.scss";
import Header from "./components/Header";
import TableUsers from "./components/TableUser";
import Container from "react-bootstrap/Container";
import ModalsAdd from "./components/modalAddNew";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Home from "./components/Home";
import Login from "./components/Login";
import { useContext ,useEffect } from "react";
import { UserContext } from "./context/useContext";
import AppRouts from "./routes/AppRoutes";
import { useDispatch, useSelector } from "react-redux";
import { handelRefresh } from "./redux/action/useraAction";

function App() {
  // const dataUserRedux = useSelector( state => state.user.account)
  const dispatch = useDispatch();

  useEffect( () => {
    if ( localStorage.getItem('token')) {
      // loginContext( localStorage.getItem("email") , localStorage.getItem("token"))
      dispatch(handelRefresh());
    }


  },[])

  return (
    <>
      <div className="app-container">
        {/* <Container> */}
        {/* <Row> */}
        <Header />

        <Container>

          {/* <TableUsers /> */}
          <AppRouts />
          {/* <Home /> */}
        </Container>
        {/* </Row>
      </Container> */}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
