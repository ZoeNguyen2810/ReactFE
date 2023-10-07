// import logo from './logo.svg';
import { Button, Row } from "react-bootstrap";
import "./App.scss";
import Header from "./components/Header";
import TableUsers from "./components/TableUser";
import Container from "react-bootstrap/Container";
import ModalsAdd from "./components/modalAddNew";
import { useState } from "react";

function App() {
  const [ isShowModalAddNew , setIsShowModalAddNew ] = useState(false)
  const handleClose1= () => {
    setIsShowModalAddNew(false)
  }
  return (
    <div className="app-container">
      {/* <Container> */}
      {/* <Row> */}
      <Header />
      <Container>
        <div className="my-3 add-new">
          <span> <b>List users:</b></span>

          <button class="btn btn-success" onClick={ () => setIsShowModalAddNew(true)}>Add new user</button>
        </div>
        <TableUsers />
      </Container>
      <ModalsAdd
      show = {isShowModalAddNew}
      handleClose = { handleClose1} />
      {/* </Row>
      </Container> */}
    </div>
  );
}

export default App;
