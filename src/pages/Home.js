
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';

export default function Home() {
    const [employees, setEmployees] = useState([])

    useEffect(() => {

        async function reqdata() {
            const response = await fetch('http://localhost:8000/', {
                method: 'GET',
            })
            const data = await response.json()
            setEmployees(JSON.parse(data))
            console.log(employees);

        }
        reqdata()

    }, [])
    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Employee</Navbar.Brand>
                    <Nav className="me-auto">
                        <Link to="/" >
                            <div style={{
                                color: 'white'
                            }}>
                                Home
                            </div>

                        </Link>
                        <Link to="/login">
                            <div style={{
                                color: 'white',
                                marginLeft: "20px"
                            }}>
                                Logout
                            </div>
                        </Link>

                    </Nav>

                </Container>
            </Navbar>

            <h3 style={{
                padding: '24px 0 ',
                textAlign: "center"
            }}> List of Employees</h3>
            <Container>

                <div style={{
                    width: "400px",
                    padding: '24px 0'
                }}>

                    <InputGroup className="col-6">
                        <FormControl
                            placeholder="Search"
                            aria-label="Search"
                            aria-describedby="basic-addon2"
                        />
                        <Button variant="outline-secondary" id="button-addon2">
                            Search
                        </Button>
                    </InputGroup>
                </div>

            </Container>
            <Container>
                <Table striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Amount</th>
                            <th>Deduction</th>
                            <th>Technologies</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            employees?.map((employee, index) => {

                                return <tr>
                                    <td>{index + 1}</td>
                                    <td>{employee.name}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.phone}</td>
                                    <td>{employee.deduction}</td>
                                    <td>{employee.amount}</td>
                                    <td>

                                        {employee?.technologies?.map(value => {
                                            return `${value} ,`
                                        })}
                                    </td>
                                    <td>
                                        <Button variant="danger">Delete</Button>{' '}
                                        <Button variant="info">Update</Button>{' '}
                                    </td>
                                </tr>
                            })
                        }

                    </tbody>

                </Table>

            </Container>

        </>
    )


}