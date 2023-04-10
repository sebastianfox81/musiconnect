const express = require('express');
const app = express();
const cors = require('cors')
const path = require('path');
const dotenv = require('dotenv')
dotenv.config()

// const connectDB = require('./config/db');
const connectDB = require('./db/connect.js')
// Connect Database
// connectDB();


// Init Middleware
app.use(express.json());
app.use(cors())

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  // app.get('*', (req, res) => {
  //   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  // });
}

const port = process.env.PORT || 5000;


const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => console.log(`Server started on port ${port}`))

  } catch (err) {
    console.log(err)
  }
}
start()