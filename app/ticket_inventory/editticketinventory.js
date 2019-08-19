const express = require('express');
const app = express.Router();
const bodyParser = require('body-parser');
const moment = require('moment');

const ticketInventory = require('../../models').ticket_inventory;
const priceTable = require('../../models').price;
const db = require('../../models');


app.put('/edit_ticket/:event_id/:ticket_inventory_id', async (req, res) => {
    let event_id = req.params.event_id;
    let ticket_inventory_id = req.params.ticket_inventory_id;
    let allData = [];   
    try{
    ticketInventory.findOne({
        where:{
            event_id: event_id,
            id : ticket_inventory_id
        }
    }).then((ticketdata)=>{
        // res.send(ticketInventory)
        let values = {
            quota: req.body.quota || ticketdata.quota,
            sales_openDate: req.body.sales_openDate || ticketdata.sales_openDate,
            sales_closeDate: req.body.sales_closeDate || ticketdata.sales_closeDate,
            sales_openTime: req.body.sales_openTime || ticketdata.sales_openTime,
            sales_closeTime: req.body.sales_closeTime || ticketdata.sales_closeTime,
            ticket_type: req.body.ticket_type || ticketdata.ticket_type,
            event_id:   ticketdata.event_id,
            price_id: ticketdata.price_id
        };
        let selector =   { where:{
            event_id: event_id,
            id : ticket_inventory_id
        }};

        ticketInventory.update(values,selector).then(()=>{
            ticketInventory.findOne({
                where:{
                    event_id: event_id,
                    id : ticket_inventory_id
                }
            }).then((inv)=>{
                let editPriceValue = {
                    price:req.body.price || inv.price
                };

                let priceselector = {
                    where:{
                        id: inv.price_id
                    }
                };
                priceTable.update(editPriceValue,priceselector,inv).then(async (p)=>{
                    let ticketInventoryData = await db.sequelize.query(
                        `select t.quota,t.event_id,t.price_id,t.sales_openDate,t.sales_closeDate,
                        t.sales_openTime,sales_closeTime,t.ticket_type,p.price 
                        from ticket_inventory as t join price as p 
                        on t.price_id = p.id 
                        where t.id = ${ticket_inventory_id} and p.id = ${inv.price_id}`,
                        {type: db.sequelize.QueryTypes.SELECT}
                    )

                    res.send(ticketInventoryData)
                })  

            })
        })
    })
}catch(err){
    res.send(err)
}
})

module.exports = app;