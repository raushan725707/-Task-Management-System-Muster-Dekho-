import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Modal, Form, Button, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function UpdateTask() {
    const navigate=useNavigate();
  const { id } = useParams();
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: '',
    assignTaskUsername: ''
  });

  const [userList, setUserList] = useState([]);


  useEffect(() => {
    const fetchTask = async () => {
      try {
      const username=  localStorage.getItem("username")
      const response = await axios.get(`http://localhost:8080/task/updatetaskpreview?taskid=${id}&username=${username}`);
      
        
        console.log("____"+JSON.stringify(response.data.task))
        setTaskData({
            title: response.data.task.title,
            description: response.data.task.description,
            dueDate: response.data.task.dueDate,
            status: response.data.task.status,
            assignTaskUsername: response.data.task.assigntaskusername
          });
                  console.log("____"+taskData.title)
      } catch (error) {
        console.error('Error fetching task data:', error);
      }
    };

    fetchTask();




    const fetchUserList = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/getalluserlist');
          console.log("userlist"+JSON.stringify(response.data.response))
          setUserList(response.data.response);          console.log("user<<<<"+response.data.response)
        //   setUserList(response.data); // Assuming response.data is an array of user objects
        } catch (error) {
          console.error('Error fetching user list:', error);
        }
      };
  
      fetchUserList();



  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };


  
//fetch userlist


const sanitizedTaskData = {
    title: taskData.title || '',
    description: taskData.description || '',
    dueDate: taskData.dueDate || '',
    status: taskData.status || '',
    assignTaskUsername: taskData.assignTaskUsername || ''
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const username=localStorage.getItem("username")
        

        const requestData = {
            title: sanitizedTaskData.title,
            description: sanitizedTaskData.description,
            dueDate: sanitizedTaskData.dueDate,
            status: sanitizedTaskData.status,
            assigntaskusername: sanitizedTaskData.assignTaskUsername,
            username: username,
            taskid: parseFloat(id)
          };
          

        const url = "http://localhost:8080/task/updatetask";
        const response = await axios.put(url, requestData);

    
      console.log("update response"+response.data.status)
      if(response.data.status===200){
        alert("updated Successsfully")
        handleCloseModal()
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const [showModal, setShowModal] = useState(true);

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/tasks")

    // Code to handle closing the modal
    // You can redirect to another page or set a state to hide the modal
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" name="title" value={taskData.title} onChange={handleInputChange} />
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" value={taskData.description} onChange={handleInputChange} />
          </Form.Group>

          <Form.Group controlId="formDueDate">
            <Form.Label>Due Date</Form.Label>
            <Form.Control type="date" name="dueDate" value={taskData.dueDate} onChange={handleInputChange} />
          </Form.Group>

          <Form.Group controlId="formStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control type="text" name="status" value={taskData.status} onChange={handleInputChange} />
          </Form.Group>




          {/* <Form.Group controlId="formAssignTaskUsername">
            <Form.Label>Assign Task Username</Form.Label>
            <Form.Control type="text" name="assignTaskUsername" value={taskData.assignTaskUsername} onChange={handleInputChange} />
          </Form.Group> */}


          <Form.Group controlId="formAssignTaskUsername">
  <Form.Label>Assign Task Username</Form.Label>
  <Form.Select name="assignTaskUsername" value={taskData.assignTaskUsername} onChange={handleInputChange}>
    <option value="">Select a username</option>
    <option value="testuser1">testuser1</option>
    <option value="Raushan">Raushan</option>
    <option value="user100">user100</option>
    <option value="Raushan100">Raushan100</option>
  </Form.Select>
</Form.Group>

  
 {/* <Form.Group controlId="formAssignTaskUsername">
    <Form.Label>Assign Task Username</Form.Label>
    <Form.Control as="select" name="assignTaskUsername" value={taskData.assignTaskUsername} onChange={handleInputChange}>
        {taskData.assignTaskUsername ? (
            <option value={taskData.assignTaskUsername}>{taskData.assignTaskUsername}</option>
        ) : (
            <option value="">Select a user</option>
        )}
        {userList.map(user => (
            <option key={user.id} value={user.username}>{user.username}</option>
        ))}
    </Form.Control>
</Form.Group> */}




          <Button variant="primary" type="submit">
  Update
</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default UpdateTask;