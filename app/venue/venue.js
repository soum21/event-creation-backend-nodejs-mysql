const express = require('express');
const app = express.Router();
const bodyParser = require('body-parser');
const venues = require('../../models').venues;

app.get('/', async (req, res) => {
       const allVenues = await venues.findAll();
       res.json(allVenues);
})

app.post('/', async (req, res) => {
    // res.send(req.body.category)
    // event_cat.create({
    //     category:req.body.category
    // }).then((cat)=>{
    //     var msg = {
    //         status:200,
    //         msg:"Insertion Successfull."
    //     }
    //     res.json(msg)
    // }).catch(err=>{
    //     res.json(err)
    // })
})

app.put('/:id', async (req, res) => {
    let editId = req.params.id;

    // event_cat.findOne({where:{id:editId}}).then((thiscategory)=>{
    //     event_cat.update({
    //         category:req.body.category || thiscategory.category
    //     },
    //     {where:{id:editId}}).then(()=>{
    //         event_cat.findOne({where:{id:editId}}).then((result)=>{
    //             res.json(result)
    //         })
    //     })
    // })
})


module.exports = app;