const express = require('express');
const app = express.Router();
const bodyParser = require('body-parser');
const moment = require('moment');

const ticketInventory = require('../../models').ticket_inventory;
const priceTable = require('../../models').price;
const db = require('../../models');

app.get('/delete_ticket/:ticket_inventory_id', async(req,res)=>{
    let ticket_inventory_id = req.params.ticket_inventory_id;
    let a =[];
    const tinventory = await ticketInventory.findOne({ where: { id: ticket_inventory_id } })
        for (i in tinventory) {
            await a.push(tinventory[i]["price_id"])
        }
        const p = await priceTable.findAll({ where: { id: a } })    

        if (tinventory) {
            if (p) {
                 await ticketInventory.destroy({ where: { event_id: event_id } })
                    .then(async () => {
                      return await priceTable.destroy({ where: { id: a } }).then(()=>{
                          res.send("Ticket deleted")
                      })
                    })
            }
            else {
               await ticketInventory.destroy({ where: { event_id: event_id } })
               res.send("Ticket deleted")
            }
        }
        else{
            res.send("Could not find Inventory")
        }

})

module.exports = app;