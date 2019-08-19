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
//EDit event

app.put('/:eventid/:organizer_id/editevent', async (req, res) => {
    let event_id = req.params.eventid;
    let organizer_id = req.params.organizer_id;

    if (req.body.new_venue === true) {
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
                events.findOne({
                    where: {
                        id: event_id,
                        organizer_id: organizer_id
                    }
                }).then((event) => {
                    let values = {
                        event_name: req.body.event_name || event.event_name,
                        event_desc: req.body.event_desc || event.event_desc,
                        event_startDate: req.body.event_startDate || event.event_startDate,
                        event_startTime: req.body.event_startTime || event.event_startTime,
                        venue_id: address.id_venue,
                        event_category_id: event.event_category_id,
                        event_layout: req.body.event_layout || event.event_layout,
                        tAndc: req.body.tAndc || event.tAndc,
                        gate_open: req.body.gate_open || event.gate_open,
                        gate_close: req.body.gate_close || event.gate_close,
                        organizer_id: event.organizer_id,
                    };
                    let selector = {
                        where: {
                            id: event_id,
                            organizer_id: organizer_id
                        }
                    };
                    // res.send(event)
                    events.update(values, selector).then(() => {
                        events.findOne({
                            where: {
                                id: event_id,
                                organizer_id: organizer_id
                            }
                        }).then((ne) => {
                            res.send(ne)
                        })
                    })
                })
            })
        });
    }
    else {
        events.findOne({
            where: {
                id: event_id,
                organizer_id: organizer_id
            }
        }).then((event) => {
            let values = {
                event_name: req.body.event_name || event.event_name,
                event_desc: req.body.event_desc || event.event_desc,
                event_startDate: req.body.event_startDate || event.event_startDate,
                event_startTime: req.body.event_startTime || event.event_startTime,
                venue_id: req.body.venue_id || event.venue_id,
                event_category_id: event.event_category_id,
                event_layout: req.body.event_layout || event.event_layout,
                tAndc: req.body.tAndc || event.tAndc,
                gate_open: req.body.gate_open || event.gate_open,
                gate_close: req.body.gate_close || event.gate_close,
                organizer_id: event.organizer_id,
            };
            let selector = {
                where: {
                    id: event_id,
                    organizer_id: organizer_id
                }
            };
            // res.send(event)
            events.update(values, selector).then(() => {
                events.findOne({
                    where: {
                        id: event_id,
                        organizer_id: organizer_id
                    }
                }).then((ne) => {
                    res.send(ne)
                })
            })
        })
    }




})


module.exports = app;