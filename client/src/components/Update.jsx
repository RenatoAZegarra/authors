import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Update = () => {
    const nav = useNavigate();

    const { id } = useParams();

    const [name, setName] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/authors/${id}`)
            .then((serverRes) => {
                setName(serverRes.data.name);
            })
            .catch((serverErr) => console.log(serverErr));
    }, [id]);

    const updateAuthor = (e) => {
        e.preventDefault();

        const tempObjToSendToServer = {
            name: name,
        };

        axios
            .patch(`http://localhost:8000/api/authors/${id}`, tempObjToSendToServer)
            .then((serverRes) => {
                console.log('✅', serverRes.data);
                nav("/");
            })
            .catch(err => {
                console.log('❌', err);
                const errorResponse = err.response.data.errors;
                const errorArr = [];

                for(const key of Object.keys(errorResponse)){
                    errorArr.push(errorResponse[key].message);
                }
                setErrors(errorArr);
            });
    };

    return (
        <div>
            <h1>Favorite Authors</h1>
            <p>
                <Link to="/">Home</Link>
            </p>
            {/* FORM */}
            <p>Update Author:</p>
            <div>
            {errors.map((error, index) =>{ return( <p style={{color: "red"}}key={index}>{error}</p>)})}
            </div>
            <Form onSubmit={updateAuthor}>
                <Form.Group className="mb-3">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>{' '}|{' '}
                <Link to="/">
                    <Button variant="danger">Cancel</Button>
                </Link>
            </Form>
        </div>
    );
};

export default Update;