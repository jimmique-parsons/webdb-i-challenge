const express = require('express');

const db = require('./../data/dbConfig.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const accounts = await db('accounts');
        res.status(200).json(accounts);
    } catch (err) {
        res.status(500).json({ message: 'Problem with the database' });
    }
});

router.post('/', async (req, res) => {
    const accountData = req.body;

    if (Object.keys(accountData).length === 0) {
        res.status(400).json({ message: 'Account name and budget required' });
    } else if (!accountData.name) {
        res.status(400).json({ message: 'Account name required' });
    } else if (!accountData.budget) {
        res.status(400).json({ message: 'Account budget required' });
    } else {
        try {
            const count = await db('accounts').insert(accountData);

            count
                ? res.status(201).json(response)
                : res.status(500).json({ message: 'problem with the database' })
        } catch (err) {
            res.status(500).json({ message: 'problem with the database' });
        }
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    if (Object.keys(changes).length === 0) {
        res.status(400).json({ message: 'Account name and budget required' });
    } else if (!changes.name) {
        res.status(400).json({ message: 'Account name required' });
    } else if (!changes.budget) {
        res.status(400).json({ message: 'Account budget required' });
    } else {
        try {
            const count = await db('accounts').where({ id }).update(changes);
            console.log('account-router: line 51: count:', count);

            count
                ? res.status(200).json({ updated: count })
                : res.status(404).json({ message: 'Invalid ID' })
        } catch (err) {
            res.status(500).json({ message: 'problem with the database' });
        }
    }

});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const count = await db('accounts').where({ id }).del();
        count
            ? res.status(200).json({ deleted: count })
            : res.status(404).json({ message: 'Invalid ID' })
    } catch (err) {
        res.status(500).json({ message: 'problem with the database' });
    }

});

module.exports = router;