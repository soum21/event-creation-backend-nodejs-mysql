const express = require('express');
const app = express.Router();
const bodyParser = require('body-parser');
const moment = require('moment');

const ticketInventory = require('../../models').ticket_inventory;
const priceTable = require('../../models').price;
const db = require('../../models');

var priceArray = [];

app.get('/', async (req, res) => {
    const allTicket = await ticketInventory.findAll();
    res.json(allTicket);
})

app.post('/create_ticket', async (req, res, next) => {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;

    try {
        for (var i = 0; i < req.body.length; i++) {
            await priceTable.create({
                price: req.body[i].price,
                // createdAt: dateTime,
                // updatedAt: dateTime
            }).then(async (pres) => {
                var sales_openTime = moment(`"${req.body[i].sales_openTime}"`, "h:mm A").format("HH:mm")
                var sales_closeTime = moment(`"${req.body[i].sales_closeTime}"`, "h:mm A").format("HH:mm")
                await ticketInventory.create({
                    ticket_type: req.body[i].ticket_type,
                    event_id: req.body[i].event_id,
                    price_id: pres.id,
                    sales_openDate: req.body[i].sales_openDate,
                    sales_closeDate: req.body[i].sales_closeDate,
                    sales_openTime: sales_openTime,
                    sales_closeTime: sales_closeTime,
                    quota: req.body[i].quota,
                    // createdAt: dateTime,
                    // updatedAt: dateTime
                }).then((tickInv) => {
                }).catch(err => {
                    throw err;
                })
            })
                .catch((err) => {
                    throw err;
                })

            var msg = {
                msg: "Ticket Successfully created.",
                status: 200
            }
            priceArray.push({
                msg: msg,
                data: req.body[i]
            })
        }
        res.json(200, priceArray)

    } catch (error) {
        console.log(error)
    }

})




module.exports = app;