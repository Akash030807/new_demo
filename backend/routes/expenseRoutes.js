const express = require('express');
const Expense = require('../models/Expense');
const auth = require('../middleware/auth');
const router = express.Router();

// Add new expense
router.post('/expense', auth, async (req, res) => {
    try {
        const { title, amount, category, date } = req.body;
        const newExpense = new Expense({
            userId: req.user.id,
            title, amount, category, date
        });
        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all expenses for logged-in user
router.get('/expenses', auth, async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.user.id }).sort({ date: -1 });
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;