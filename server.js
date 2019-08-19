const express = require('express');
const cors = require('cors');
const http = require('http');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const port = parseInt(process.env.PORT, 10) || 5100;
const db = require('./models');
//Passport config
require('./config/passport')(passport);

const app = express();
app.use(logger('dev'));
app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to the beginning of Create your own event.',
}));

app.set('port', port);
const server = http.createServer(app);

//post and/or get localhost:5100/event_category
app.use('/event_category', require('./app/event_category/event_category'));

//get localhost:5100/venues
app.use('/venues', require('./app/venue/venue'));

//post add new_venue:true/false localhost:5100/events/create_event
app.use('/events', require('./app/events/events'));

//put Update events with or without venue http://localhost:5100/1/1/editevent
app.use('/', require('./app/events/editevent'));

//register post localhost:5100/organizer/register
//Login post localhost:5100/organizer/login
app.use('/organizer', require('./app/organizer/organizer'));

//post localhost:5100/ticket_inventory/create_ticket
app.use('/ticket_inventory', require('./app/ticket_inventory/ticketInventory'));

//Edit ticket Inventory http://localhost:5100/edit_ticket/1/1
app.use('/', require('./app/ticket_inventory/editticketinventory'));

//get with id localhost:5100/event_details/getall
app.use('/event_details', require('./app/events/geteventsall'));

//get localhost:5100/details/?id/allEvents
app.use('/details',require('./app/events/getperorganizerevent'));

app.use('/media', require('./app/media/media'));

//delete everything about event except venue
app.use('/',require('./app/events/deleteevent'));

//delete per ticket Inventory
app.use('/',require('./app/ticket_inventory/delete_ticket'));

//Get events without ticketInfo
app.use('/', require('./app/events/getallonlyevent'))


server.listen(port, () => {
    console.log(`server started at http://localhost: ${port}`)
});