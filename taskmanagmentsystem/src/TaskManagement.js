

import React,{ useContext, useEffect ,useState,useCallback}  from 'react';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import Navbar1 from './Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {AuthContext} from './UserLogin'

import { Form, Button, Modal } from 'react-bootstrap';

function TaskManagement() {

const isLogged=useContext(AuthContext);
  const [userData, setUserData] = useState([]);

  const username = localStorage.getItem("username");





//create task






  
  

///createtaskcode
const [formData, setFormData] = useState({
  title: '',
  description: '',
  dueDate: '',
});

const [showForm, setShowForm] = useState(false);

const handleShowForm = () => setShowForm(true);
const handleCloseForm = () => setShowForm(false);

const handleSubmit = (event) => {
  event.preventDefault();
  createtask();
};


//createtsask
const createtask = async () => {
  try {
    const response = await axios.post('http://localhost:8080/task/create', {
      title: formData.title,
      description: formData.description,
      dueDate: formData.dueDate,
      username:username
    });
    console.log('Task created:', response.data);
    // Handle success, e.g., close modal, refresh task list
    handleCloseForm();
    // Refresh task list or perform any other necessary action
  } catch (error) {
    console.error('Error creating task:', error);
    // Handle error, e.g., display error message to the user
  }
}




//delete task
const handleDelete = async (taskId) => {
  try {
    console.log(",,,,,"+typeof(taskId))
    const response = await axios.delete("http://localhost:8080/task/deletetask",{
    
    data: {
      username: username,
      id: taskId.toString()
    }}
    );
    if (response.data.status === 200) {
      // Refresh task list or perform any other necessary action
      alert("Task deleted successfully");
    // fetchData(); // Refresh task list
    }
  } catch (error) {
    console.error('Error deleting task:', error);
    // Handle error, e.g., display error message to the user
  }
};


useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/task/getalltask/${username}`);
      if (Array.isArray(response.data.task)) {
        setUserData(response.data.task);
      } else {
        console.error('Invalid data structure:', response.data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  fetchData(); // Call fetchData when component mounts

}, []); // Empty dependency array


// useEffect(()=>{
//   fetchData();
//   // createtask();
//   handleDelete();
// },[fetchData,handleDelete])



//filter

const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dueDateFilter, setDueDateFilter] = useState('');


  const filteredTasks = userData.filter(task => {
    // Filter based on search query
    if (searchQuery && task && task.title && task.description && task.assigntaskusername && !(task.title.includes(searchQuery) || task.description.includes(searchQuery) || task.assigntaskusername.includes(searchQuery))) {
      return false;
    }
    // Filter based on completion status
    if (statusFilter && task && task.status && task.status !== statusFilter) {
      return false;
    }
    // Filter based on due date
    if (dueDateFilter && task && task.dueDate && task.dueDate !== dueDateFilter) {
      return false;
    }
    return true;
  });
  







 







  return (
    <div>
      <h1 style={{textAlign:'center'}}>Task Managment System</h1>
     

      <h3 style={{ textAlign: 'center' }}>
  <span>{username}</span>&nbsp;&nbsp;&nbsp;&nbsp;
  <span>
    <Button variant="primary" onClick={handleShowForm}>Create Task</Button>
  </span>
</h3>

<Modal show={showForm} onHide={handleCloseForm}>
  <Modal.Header closeButton>
    <Modal.Title>Create Task</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDueDate">
        <Form.Label>Due Date</Form.Label>
        <Form.Control
          type="date"
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Create
      </Button>
    </Form>
  </Modal.Body>
</Modal>

<div>
      <div style={{ textAlign: 'center' }}>
        <input type="text" placeholder="Search task..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
      </div>

      <Table striped>
        <thead>
          <tr>
            <th>title</th>
            <th>description</th>
            <th>dueDate</th>
            <th>status</th>
            <th>Assign</th>
            <th>update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map(task => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.dueDate}</td>
              <td>{task.status}</td>
              <td>{task.assigntaskusername}</td>
              <td><Link to={`/updatetask/${task.id}`}>Update</Link></td>
              <td><button onClick={() => handleDelete(task.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    </div>
  )
}

export default TaskManagement

