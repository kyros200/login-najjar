import { useState } from "react";
import Context from "../../authComponents/Context";
import ShowContent from "../../authComponents/ShowContent";
import { decodeLogin, extractUser, logoff } from "../../helpers/authHelper";

const BACKEND_URL = "http://localhost:80"

function LoginPage() {
    const [loggedUser, setLoggedUser] = useState(decodeLogin(localStorage.getItem('loggedUser')));
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const tryLogin = () => {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({ login, password}),
            headers: { 'Content-Type': 'application/json' },
        };

        fetch(`${BACKEND_URL}/auth/login`, requestOptions)
        .then((response) => {
            if (response.status !== 200) {
                throw new Error('Failed');
            } else {
                return response.text();
            }
        })
        .then((result) => {
            const usr = extractUser(result);
            if (usr) 
                localStorage.setItem('loggedUser', result); //token as localStorage
                setLoggedUser(decodeLogin(localStorage.getItem('loggedUser'))); //decoded token as state
        })
        .catch((error) => console.log(error.message));
    };

    const handleLogoffButton = () => {
        logoff();
        setLoggedUser(undefined);
    }

    return (
        <Context.Provider value={loggedUser}>
            <ShowContent show={false}>
                <div>
                    <input onChange={(e) => setLogin(e.target.value)} />
                    <input onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={() => tryLogin()}>login</button>
                </div>
            </ShowContent>
            <ShowContent show={true}>
                <div>
                    <span>
                        {`I am Signed in as ${decodeLogin()?.login}`}
                    </span>
                    <button onClick={() => handleLogoffButton()}>Logoff</button>
                </div>
            </ShowContent>
        </Context.Provider>
    );
}

export default LoginPage;
