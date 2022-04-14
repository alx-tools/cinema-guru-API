const express = require('express');
const sequelize = require('./config/database');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./routes/auth')
const titlesRouter = require('./routes/titles')
const usersRouter = require('./routes/users')
const userActivitiesRouter = require('./routes/userActivities')
require('dotenv').config()

const app = express();
const corsOptions = {
    origin: 'http://localhost:3000',
}
app.use(cors(corsOptions))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', authRouter);
app.use('/api/titles', titlesRouter);
app.use('/api/users', usersRouter);
app.use('/api/activity', userActivitiesRouter);

sequelize.sync({ force: false })
    .then(async () => {
        console.log(`Database & tables created!`);
        console.log('Postgress Connected');
    })
    .catch(err => console.log(err));

const port = process.env.PORT || 8000;

app.listen(port, () => console.log('Server running...'));
