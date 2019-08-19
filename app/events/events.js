const express = require('express');
const app = express.Router();
const bodyParser = require('body-parser');
const events = require('../../models').events;
const venues = require('../../models').venues;
const address = require('../../models').address;
const eventMedia = require('../../models').media;
const moment = require('moment');
const db = require('../../models');
const alasql = require('alasql');

app.get('/', async (req, res) => {
    const allEvents = await events.findAll();
    res.json(allEvents);
})

//Create One Event
app.post('/create_event', async (req, res) => {
    let eventImages = req.body.images;
    if (req.body.new_venue !== false) {
        try {
            venues.create({
                venue_name: req.body.venue_name,
                venue_address: req.body.venue_address,
                venue_desc: req.body.venue_desc,
                venue_img: req.body.venue_img,
            }).then((venue) => {
                address.create({
                    city: req.body.city,
                    zipcode: req.body.zipcode,
                    state: req.body.state,
                    address1: req.body.address1,
                    adress2: req.body.adress2,
                    id_venue: venue.id,
                }).then((address) => {
                    events.create({
                        event_name: req.body.event_name,
                        event_desc: req.body.event_desc,
                        event_startDate: req.body.event_startDate,
                        event_startTime: req.body.event_startTime,
                        user_id: req.body.user_id,
                        event_category_id: req.body.event_category_id,
                        venue_id: address.id_venue,
                        organizer_id: req.body.organizer_id,
                        gate_open: req.body.gate_open,
                        gate_close: req.body.gate_close,
                        event_layout: req.body.event_layout,
                        tAndc: req.body.terms
                    }).then(event => {
                        for (var i = 0; i < eventImages.length; i++) {
                            eventMedia.create({
                                id_event: event.id,
                                img: eventImages[i].img,
                            })
                        }
                        var msg = {
                            msg: "Event created Successfully",
                            status: 200,
                            result: event
                        }
                        res.json(msg)
                    }).catch((err) => {
                        res.send(err)
                    })

                })
            })
        }
        catch (err) {
            res.send(err)
        }
    }
    else {
        await events.create({
            event_name: req.body.event_name,
            event_desc: req.body.event_desc,
            event_startDate: req.body.event_startDate,
            event_startTime: req.body.event_startTime,
            user_id: req.body.user_id,
            event_category_id: req.body.event_category_id,
            venue_id: req.body.venue_id,
            organizer_id: req.body.organizer_id,
            gate_open: req.body.gate_open,
            gate_close: req.body.gate_close,
            event_layout: req.body.event_layout,
            tAndc: req.body.terms
        }).then(async (event) => {
            if (eventImages) {
                for (var i = 0; i < eventImages.length; i++) {
                    eventMedia.create({
                        id_event: event.id,
                        img: eventImages[i].img,
                    })
                }
                var msg = {
                    msg: "Event created Successfully",
                    status: 200,
                    result: event
                }
                res.send(msg)
            }
            else {
                // console.log(event)
                var msg = {
                    msg: "Event created Successfully",
                    status: 200,
                    result: event
                }
                res.send(msg)
            }
        }).catch(error => {
            res.send(error)
        })
    }

})





module.exports = app;