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

app.get('/alleventdetails/:organizer_id', async (req, res) => {

    let organizer_eventDetails = await db.sequelize.query(
        `Select 
        em.id,em.event_name,em.event_desc,em.organizer_id,
        em.event_startDate,em.event_startTime,
        em.event_endDate,em.event_endTime,em.event_layout,
        em.tAndc,em.event_category_id,em.gate_open,
        em.img,em.category,
        va.venue_name,va.venue_desc,va.venue_img,va.city,
        va.zipcode,va.state,va.address1,va.adress2,
        tp.quota,tp.event_id,tp.price_id,tp.ticket_type,tp.id as inv_id, 
        tp.sales_openDate,tp.sales_openTime,tp.sales_closeDate,
        tp.sales_closeTime
            from 
            (select 
                e.id,e.event_name,e.event_desc,e.venue_id,e.organizer_id,
                e.event_startDate,e.event_startTime,e.event_endDate,e.event_endTime,
                e.event_layout,e.tAndc,e.event_category_id,e.gate_open,
                m.img,cat.category
            from events as e 
            Left outer join media as m 
            on e.id = m.id_event
            Left outer join event_category as cat 
            on e.event_category_id = cat.id)as em 
            Left outer join 
            (select 
            v.id,v.venue_name,v.venue_desc,v.venue_img,
            a.city,a.zipcode,a.state,a.address1,a.adress2
            from venues as v
             Left outer join address as a 
            on v.id = a.id_venue) as va
            on em.venue_id = va.id
            left outer join (select 
                t.id,t.quota,t.event_id,t.price_id,t.ticket_type,
                t.sales_openDate,t.sales_openTime,t.sales_closeDate,
                t.sales_closeTime,
                p.price
                from price as p
                left outer join ticket_inventory as t
                on p.id = t.price_id) as tp
            on tp.event_id = em.id
            where em.organizer_id = (:id)`,
        {
            replacements: { id: req.params.organizer_id },
            type: db.sequelize.QueryTypes.SELECT
        }
    )

    var arrayofdata = [];
    //Grouping duplicates 
    var resp = alasql(`select id,category,gate_open,tAndc,
         event_name,event_desc,event_startDate,event_startTime,
         event_endDate,event_endTime,venue_name,venue_desc,venue_img,
         city,zipcode,state,address1,adress2
         from ? 
         group by id,event_name,event_desc,event_startDate,event_startTime,
         event_endDate,event_endTime,venue_name,venue_desc,venue_img,
         city,category`, [organizer_eventDetails]);

    //Structuring data 
    resp.forEach(async (x, index) => {
        var k = {
            id: x["id"],
            category: x["category"],
            venue_name: x["venue_name"],
            venue_city: x["city"],
            venue_zipcode: x["zipcode"],
            venue_state: x["state"],
            venue_address: x["address1"],
            venue_img: x["venue_img"],
            event_name: x["event_name"],
            event_desc: x["event_desc"],
            event_layout: x["event_layout"],
            event_startDate: x["event_startDate"],
            event_startTime: x["event_startTime"],
            event_endDate: x["event_endDate"],
            event_endTime: x["event_endTime"],
            event_gate_open: x["gate_open"],
            event_tandc: x["tAndc"],
            img: [],
            tickets: []
        }

        for (var i in organizer_eventDetails) {
            if (organizer_eventDetails[i]["id"] === k.id) {

                k.img.push(organizer_eventDetails[i].img)
                k.tickets.push({
                    id: organizer_eventDetails[i].inv_id,
                    quota: organizer_eventDetails[i].quota,
                    ticket_type: organizer_eventDetails[i].ticket_type,
                    price: organizer_eventDetails[i].price,
                    sales_openDate: organizer_eventDetails[i].sales_openDate,
                    sales_openTime: organizer_eventDetails[i].sales_openTime,
                    sales_closeDate: organizer_eventDetails[i].sales_closeDate,
                    sales_closeTime: organizer_eventDetails[i].sales_closeTime,

                })
            }
        }

        //Filtering Data
        var a = [...new Set(k.img)];

        const filteredArr = k["tickets"].reduce((acc, current) => {
            const x = acc.find(item => item.ticket_type === current.ticket_type);
            if (!x) {
                return acc.concat([current]);
            } else {
                return acc;
            }
        }, []);

        //Creating Return
        await arrayofdata.push({
            category: k.category,
            event_id: k.id,
            event_name: k.event_name,
            venue_name: k.venue_name,
            venue_city: k.venue_city,
            venue_zipcode: k.venue_zipcode,
            venue_state: k.venue_state,
            venue_address: k.venue_address,
            venue_img: k.venue_img,
            event_desc: k.event_desc,
            event_startDate: k.event_startDate,
            event_startTime: k.event_startTime,
            event_endDate: k.event_endDate,
            event_endTime: k.event_endTime,
            event_gate_open: k.event_gate_open,
            event_tandc: k.tAndc,
            event_layout: k.event_layout,
            images: a,
            tickets: filteredArr
        })

    })
    //Return
    res.send(arrayofdata);

})

module.exports = app;