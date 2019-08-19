const express = require('express');
const app = express.Router();
const bodyParser = require('body-parser');
const event_category_table = require('../../models').event_category
app.get('/', async (req, res) => {
    const allCategory = await event_cat.findAll();
    res.json(allCategory);
})

app.post('/', async (req, res) => {
    event_category_table.create({
        category:req.body.category
    }).then((cat)=>{
        res.json(cat)
    })
    // event_cat.create({
    //     category: req.body.category,
    // }).then((cat) => {
    //     var msg = {
    //         status: 200,
    //         msg: "Insertion Successfull."
    //     }
    //     res.json(msg)
    // }).catch(err => {
    //     res.json(err)
    // })
})

app.put('/:id', async (req, res) => {
    let editId = req.params.id;

    event_cat.findOne({ where: { id: editId } }).then((thiscategory) => {
        event_cat.update({
            category: req.body.category || thiscategory.category
        },
            { where: { id: editId } }).then(() => {
                event_cat.findOne({ where: { id: editId } }).then((result) => {
                    res.json(result)
                })
            })
    })
})


module.exports = app;