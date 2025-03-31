export const claimDonation = async (req, res) => {
    try {
        const donation = await Donation.findById(req.params.id);
        if (!donation || donation.status !== 'pending') {
            return res.status(400).json({ error: 'Donation not available' });
        }
        donation.status = 'requested';
        donation.ngoId = req.user.userId;
        await donation.save();
        res.json({ message: 'Donation claimed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error claiming donation' });
    }
};