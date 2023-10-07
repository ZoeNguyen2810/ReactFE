import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
const ModalsAdd = (props) => {
    const { show, handleClose } = props;
    const [ name , setName] = useState("");
    const [ job , setJob] = useState("");
    const handleSave = () => {
        console.log( "Name : " + name , " Job :" + job)
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
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        <div>
                            
                            <form>
                                <div class="form-group">
                                    <label className='form-label'>Name</label>
                                    <input type="text" class="form-control"  placeholder="Enter Name"  value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    />
                                </div>
                                <div class="form-group">
                                    <label className='form-label'>Job</label>
                                    <input type="text" class="form-control"  placeholder="Enter Job" 
                                    value={job} onChange={(e) => setJob(e.target.value)} />
                                </div>
                                
                            </form>

                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSave()}>Save</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
export default ModalsAdd


