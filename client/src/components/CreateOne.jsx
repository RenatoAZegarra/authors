import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const AuthorForm = ({ authors, setAuthors }) => {
    const [name, setName] = useState('');
    const [errors, setErrors] = useState([]);

    const nav = useNavigate()

    const createAuthor = (e) => {
        e.preventDefault();

        const tempObjToSendToServer = {
            name: name,
        };

        axios
            .post('http://localhost:8000/api/authors', tempObjToSendToServer)
            .then((serverRes) => {
                console.log('✅', serverRes);
                setAuthors([...authors, serverRes.data]);
                nav('/')
            })
            .catch((err) => {
                console.log('❌', err);
                const errorResponseObj = err.response.data.errors;
                const errorArr = Object.values(errorResponseObj).map((error) => error.message);
                setErrors(errorArr);
            });
    };

    return (
        <div>
            <h1>
            Favorite Authors
            </h1>
            <p><Link to={'/'}>Home</Link></p>
            {/* FORM */}
            <p>Add a New Author:</p>
            <div>
            {errors.map((err, index) => <p style={{color: "red"}}key={index}>{err}</p>)}
            </div>
            <Form onSubmit={createAuthor}>
                <Form.Group className='mb-3'>
                    <Form.Label>Name: </Form.Label>
                    <Form.Control value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
                {' '}|{' '}
                <Link to="/">
                    <Button variant='danger'>Cancel</Button>
                </Link>
            </Form>
        </div>
    );
};

export default AuthorForm;