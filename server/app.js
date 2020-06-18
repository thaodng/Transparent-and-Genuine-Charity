require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const connectDB = require('./services/database');
const passportConfig = require('./middleware/passport');
const errorHandler = require('./middleware/error');


const app = express();
app.use(cors());
connectDB();
passportConfig();

require('./models/Manager');
require('./models/Charity');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const managersRouter = require('./routes/managers');
const charitiesRouter = require('./routes/charities');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/managers', managersRouter);
app.use('/charities', charitiesRouter);
app.use(errorHandler);


module.exports = app;
