const express = require('express');
const app = express.Router();
const bodyParser = require('body-parser');
const events = require('../../models').events;
const eventMedia = require('../../models').media;
const moment = require('moment');
const db = require('../../models');
const alasql = require('alasql');
const ticketInventory = require('../../models').ticket_inventory;
const priceTable = require('../../models').price;

app.get('/:eventid/:organizer_id/delete_event', async (req, res) => {
    let a = [];
    let event_id = req.params.eventid;
    let organizer_id = req.params.organizer_id;

    try {
        const media = eventMedia.findAll({ where: { id_event: event_id } });
        const event = events.findOne({ where: { id: event_id, organizer_id: organizer_id } })
        const tinventory = await ticketInventory.findAll({ where: { event_id: event_id } })
        for (i in tinventory) {
            await a.push(tinventory[i]["price_id"])
        }
        const p = await priceTable.findAll({ where: { id: a } })
        if (media && event) {
            try {
                db.sequelize.query('set foreign_key_checks =0', { type: db.sequelize.QueryTypes.SET })
                    .then(() => {
                        return eventMedia.destroy({ where: { id_event: event_id } })
                    })
                    .then(() => {
                        return events.destroy({ where: { id: event_id, organizer_id: organizer_id } })
                    })
                    .then(async () => {
                        if (tinventory) {
                            if (p) {
                                return await ticketInventory.destroy({ where: { event_id: event_id } })
                                    .then(async () => {
                                      return await priceTable.destroy({ where: { id: a } })
                                    })
                            }
                            else {
                              return await ticketInventory.destroy({ where: { event_id: event_id } })
                            }
                        }
                        else {
                            return null
                        }
                    })
                    .then(() => {
                        return db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', { type: db.sequelize.QueryTypes.SET })
                    })
                    .then(() => {
                        res.send("delete success")
                    })
            }
            catch (error) {
                throw error;
            }
        }

        else if (media === null && event === null) {
            return null;
        }

        else if (media === null && event !== null) {
            try {
                db.sequelize.query('set foreign_key_checks =0', { type: db.sequelize.QueryTypes.SET })
                    .then(() => {
                        return events.destroy({ where: { id: event_id, organizer_id: organizer_id } })
                    })
                    .then( async ()=>{
                        if (tinventory) {
                            if (p) {
                                return await ticketInventory.destroy({ where: { event_id: event_id } })
                                    .then(async() => {
                                      return await priceTable.destroy({ where: { id: a } })
                                    })
                            }
                            else {
                              return await ticketInventory.destroy({ where: { event_id: event_id } })
                            }
                        }
                    })
                    .then(() => {
                        return db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', { type: db.sequelize.QueryTypes.SET })
                    })
                    .then(() => {
                        res.send("delete success")
                    })
            }
            catch (error) {
                throw error;
            }

        }
        else {
            return null
        }
    }
    catch (err) {
        console.log(err);
        return {
            ok: false,
            errors: formatErrors(err),
        }
    }

})

module.exports = app;