import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState , useEffect } from "react";
import { postCreateUser , putUpdateUser } from "../services/userServices";
import { ToastContainer, toast } from "react-toastify";

const ModalEditUser = (props) => {
  const { show, handleClose, dataEdit , handleEditUserFromModal} = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const handelEditUser = async () => {
     let res = await putUpdateUser(name , job)
    if( res && res. updatedAt) {
     handleEditUserFromModal({ first_name : name , id : dataEdit.id})

    };
    handleClose()
    toast.success("update user successfully")
    console.log(res)

  };
//   useEffect(() => {
//     if(show){
//         setName(dataEdit.first_name)
//     }
//   } , [dataEdit])

useEffect( () => {
    if(show){
        setName(dataEdit.first_name)
    }
}, [dataEdit])
  console.log(dataEdit)
  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            <div>
              <form>
                <div class="form-group">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
                <div class="form-group">
                  <label className="form-label">Job</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Job"
                    value={job}
                    onChange={(e) => setJob(e.target.value)}
                  />
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handelEditUser()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default ModalEditUser;
