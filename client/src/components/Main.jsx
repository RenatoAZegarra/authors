import React, { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const Main = ({ authors, setAuthors }) => {
    // get the data right away
    useEffect(() => {
        // make the call to the server
        axios
            .get('http://localhost:8000/api/authors')
            .then((serverRes) => {
                console.log('✅ SERVER SUCCESS => ', serverRes.data);
                setAuthors(serverRes.data);
            })
            .catch((err) => {
                console.log('❌ SERVER ERROR', err);
            });
    }, []);

    // Delete
    const deleteAuthor = (authorId) => {
        console.log('delete', authorId);
        axios
            .delete(`http://localhost:8000/api/authors/${authorId}`)
            .then((res) => {
                console.log(res.data);
                setAuthors(authors.filter((author) => author._id !== authorId));
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <h1>Favorite Authors</h1>
            <p>
                <Link to={'/authors/new'}>Add an Author</Link>
            </p>
            <p>We have quotes by:</p>
            {/* LOOP OVER THE AUTHORS ARRAY */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name:</th>
                        <th>Actions:</th>
                    </tr>
                </thead>
                <tbody>
                    {authors.map((author) => (
                        <tr key={author._id}>
                            <td>{author.name}</td>
                            <td>
                                <Link to={`/authors/${author._id}/edit`}>
                                    <Button variant="primary">Edit</Button>
                                </Link>{' '}|{' '}
                                <Button variant="danger" onClick={() => deleteAuthor(author._id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Main;