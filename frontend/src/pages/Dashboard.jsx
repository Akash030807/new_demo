import { useState, useEffect } from 'react';
import API from '../api';

export default function Dashboard() {
    const [expenses, setExpenses] = useState([]);
    const [filter, setFilter] = useState('All');
    const [form, setForm] = useState({ title: '', amount: '', category: 'Food' });

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const { data } = await API.get('/expenses');
            setExpenses(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddExpense = async (e) => {
        e.preventDefault();
        try {
            await API.post('/expense', form);
            fetchExpenses(); // Refresh list
            setForm({ title: '', amount: '', category: 'Food' });
        } catch (error) {
            console.error(error);
        }
    };

    // Bonus Features: Filter & Total
    const filteredExpenses = filter === 'All' 
        ? expenses 
        : expenses.filter(exp => exp.category === filter);
        
    const totalAmount = filteredExpenses.reduce((sum, exp) => sum + Number(exp.amount), 0);

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h2>Expense Dashboard</h2>
                <div className="total-card">
                    <p>Total Expenses</p>
                    <h3>${totalAmount.toFixed(2)}</h3>
                </div>
            </header>
            
            <main className="dashboard-main">
                {/* Add Expense Form */}
                <form onSubmit={handleAddExpense} className="expense-form card">
                    <input type="text" placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
                    <input type="number" placeholder="Amount" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} required />
                    <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                        <option value="Food">Food</option>
                        <option value="Travel">Travel</option>
                        <option value="Bills">Bills</option>
                    </select>
                    <button type="submit">Add Expense</button>
                </form>

                {/* Filter & List */}
                <div className="expense-list card">
                    <div className="filter-group">
                        <label>Filter by:</label>
                        <select value={filter} onChange={e => setFilter(e.target.value)}>
                            <option value="All">All</option>
                            <option value="Food">Food</option>
                            <option value="Travel">Travel</option>
                            <option value="Bills">Bills</option>
                        </select>
                    </div>

                    <ul>
                        {filteredExpenses.map(exp => (
                            <li key={exp._id} className="expense-item">
                                <div>
                                    <strong>{exp.title}</strong>
                                    <span className="category-badge">{exp.category}</span>
                                </div>
                                <span className="amount">${exp.amount}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
}