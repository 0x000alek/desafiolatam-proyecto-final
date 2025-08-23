const checkout = async (req, res) => {
    try {
        return res.json({
            message: 'Checkout successful',
            cart: req.body,
            user: req.user
        })
    } catch (error) {
        console.error(
            'Internal server error occurred during checkout:',
            error
        );
        res.status(500).json({ message: 'Internal server error' });
    }
}

export default { checkout }