import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api';

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post('/login', form);
            localStorage.setItem('token', data.token); // Store JWT securely
            navigate('/dashboard'); // Go to expenses
        } catch (error) {
            alert(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="card">
                <h2>Login</h2>
                <input type="email" placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} required />
                <input type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} required />
                <button type="submit">Login</button>
                <p>Need an account? <Link to="/register">Register here</Link></p>
            </form>
        </div>
    );
}