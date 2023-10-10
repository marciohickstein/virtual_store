import { useEffect, useState } from "react";

interface User {
    id: number,
    name: string
}

const User: React.FC = () => {
    const [fields, setFields] = useState({});
    const [token, setToken] = useState('');

    useEffect(() => {
    }, []);

    function getUser() {
        const headers = new Headers();

        const options = {
            headers: {
                Accept: 'application/json',
                Authentication: `Bearer ${token}`,
                'X-Custom-Header': 'header value'
              }
        }

        fetch('http://localhost:3000/users', options)
            .then((response) => response.json())
            .then(console.log)
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        
        const { username: name, userpass: password} = fields;

        authenticateUser(name, password)
        console.log(name, password)
    }

    function handleChangeFields(event: any) {

        const newFields = {
            ...fields,
            [event.target.name]: event.target.value
        }

        setFields(newFields);
    }

    async function authenticateUser(name: string, password: string) {
        const url = 'http://localhost:3000/login';

        const data = {
            name,
            password,
        };

        // Create the request object with the POST method and JSON data
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };

        // Send the POST request
        fetch(url, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json(); // Parse the response as JSON
            })
            .then((responseData) => {
                // Handle the response data here
                console.log('Response Data:', responseData);
                setToken(responseData.token);
            })
            .catch((error) => {
                // Handle errors here
                console.error('Fetch Error:', error);
            });
    }

    return (
        <>
            <h1>Login</h1>

            <form action="" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Name:</label>
                    <input onChange={handleChangeFields} type="text" name="username" id="username" />
                </div>
                <div>
                    <label htmlFor="userpass">Password:</label>
                    <input onChange={handleChangeFields} type="text" name="userpass" id="userpass" />
                </div>
                <br />
                <button type="submit">Enter</button>
                <button onClick={getUser} type="button">Consulta Usuarios</button>
            </form>
        </>
    )
}

export default User;