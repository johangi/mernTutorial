import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
    }

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Log in</h3>

            <label>Email:</label>
            <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} />

            <label>Password:</label>
            <input type="text" onChange={(e) => setPassword(e.target.value)} value={password} />

            <button>Log in</button>
        </form>
    );
}

export default Login;