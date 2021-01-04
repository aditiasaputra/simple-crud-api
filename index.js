const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const user = require('./routes/user');
const home = require('./routes/home');
const todo = require('./routes/todo');
const auth = require('./routes/auth');

const app = express();

const PORT = process.env.PORT || 5000;

// Use package
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Route
app.use('/users', user);
app.use('/home', home);
app.use('/todos', todo);
app.use('/auth', auth);

// Server listening
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});