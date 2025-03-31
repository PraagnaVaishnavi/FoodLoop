const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');

// Importing Routes
const authRoutes = require('./routes/auth');
const donationRoutes = require('./routes/donations');
const ngoRoutes = require('./routes/ngo');

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/ngo', ngoRoutes);

// Real-time Donation Tracking
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('newDonation', (donation) => {
        io.emit('updateDonations', donation);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
