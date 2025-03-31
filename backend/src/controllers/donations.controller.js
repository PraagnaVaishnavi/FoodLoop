import Donation from '../models/listing.model.js';

export const createDonation = async (req, res) => {
    try {
        const donation = new Donation({ ...req.body, donor: req.user.userId });
        await donation.save();
        res.status(201).json(donation);
    } catch (error) {
        res.status(500).json({ error: 'Error creating donation' });
    }
};

export const getDonations = async (req, res) => {
    try {
        const donations = await Donation.find({ status: 'pending' });
        res.json(donations);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching donations' });
    }
};
