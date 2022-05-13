import React, { useState, useEffect } from "react"
import{Table , Container , Row , Col , Button  , ButtonGroup , Form , Navbar} from "react-bootstrap"
import './App.css';
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
const api = " http://localhost:5000/users"
const initialState = {
  name: "",
  email: "",
  contact: "",
  address:""
}

function App() {
  const [state , setState] = useState(initialState)
  const [data, setData] = useState([])
  const [userId, setUserId] = useState(null)
  const[editMOde , setEditMode] = useState(false)

  const {name , email , address , contact} = state

  useEffect(() => {
    loadData()
  },[])
  
  const loadData = async() => {
    const response = await axios.get(api)
    setData(response.data)
  }
   
  const handleChange = (e) => {
    let { name, value } = e.target;
    setState({...state , [name]:value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !address || !email || !contact) {
      toast.error("Please Fill The Data")
    } else {
      if (!editMOde) {
         axios.post(api, state);
         toast.success("data added");
         setState({ name: "", address: "", email: "", contact: "" });
         setTimeout(() => loadData(), 500);
      } else {
         axios.put(`${api}/${userId}`, state);
         toast.success("Updated data Success");
         setState({ name: "", address: "", email: "", contact: "" });
        setTimeout(() => loadData(), 500);
        setUserId(null)
        setEditMode(false)
      }
     
    }
  }

  const handleDelete = async(id) => {
    if (window.confirm("are you sure to delete the data")) {
      axios.delete(`${api}/${id}`)
      toast.success("data deleted");
      setTimeout(() => loadData(), 500);
    }
  }

  const handleUpdate = (id) => {
    const singleUser = data.find((item) => item.id == id);
    setState({ ...singleUser })
    setUserId(id)
    setEditMode(true)

  }

  return (
    <>
      <ToastContainer />
      <Navbar bg="primary" variant="dark" className="justify-content-center">
        <Navbar.Brand>Data Collector</Navbar.Brand>
      </Navbar>
      <Container style={{ marginTop: "70px" }}>
        <Row>
          <Col md={4}>
            {/* <h2 className="d-flex justify-content-center">Form</h2> */}
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label style={{ textAline: "left"}}>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  name="name"
                  value={name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label style={{ textAline: "left" }}>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label style={{ textAline: "left" }}>Contact</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Number"
                  name="contact"
                  value={contact}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label style={{ textAline: "left" }}>address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  name="address"
                  value={address}
                  onChange={handleChange}
                />
              </Form.Group>
              <div className="d-grid gap-2 mt-2">
                <Button type="submit" variant="primary" size="lg">
                  {editMOde ? "Update" : "submit"}
                </Button>
              </div>
            </Form>
          </Col>
          <Col md={8}>
            <h2 className="d-flex justify-content-center">Our Data</h2>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>No. </th>
                  <th>Name </th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Address </th>
                  <th>Action</th>
                </tr>
              </thead>
              {data.map((item, index) => {
                return (
                  <tbody>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.contact}</td>
                      <td>{item.address}</td>
                      <ButtonGroup>
                        <Button
                          style={{ marginRight: "5px" }}
                          variant="secondary"
                          onClick={()=> handleUpdate(item.id)}
                        >
                          Update
                        </Button>
                        <Button
                          style={{ marginRight: "5px" }}
                          variant="danger"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </Button>
                      </ButtonGroup>
                    </tr>
                  </tbody>
                );
              })}
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
