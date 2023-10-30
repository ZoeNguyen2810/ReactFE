import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../services/userServices';
import { ToastContainer, toast } from "react-toastify";

const ModalConfirm
    = (props) => {
        const { show, handleClose , dataDelete , handeDeleteFromModal } = props;
        
       const confirmDelete = async (id) => {
        let res = await deleteUser(dataDelete.id)
        if ( res && +res.statusCode === 204){
            toast.success("Delete successfully")
            handeDeleteFromModal(dataDelete)

        } else {
            toast.error("Delete Fail")
        }
        console.log(res)
        handleClose()
       }
        return (
            <div
                className="modal show"
                style={{ display: 'block', position: 'initial' }}
            >
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Delete User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='body-add-new'>
                            Are you sure Delete this user ? <br/>
                             <b> email : {dataDelete.email}</b>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={(item) =>  confirmDelete(item)}>Confirm</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
export default ModalConfirm



