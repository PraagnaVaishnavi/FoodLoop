export const createTransaction = async (req, res) => {
    try {
        const transaction = new Transaction({ ...req.body });
        await transaction.save();
        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ error: 'Error creating transaction' });
    }
};

export const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find().populate('donor NGO volunteer');
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching transactions' });
    }
};