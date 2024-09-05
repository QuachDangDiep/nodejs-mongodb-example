const express = require('express');
const mongoose = require('mongoose');
const Item = require('./models/Item');

const app = express();
const port = 9000;

mongoose.connect('mongodb://localhost:27017/ecommerce_db')
        .then( ()=>{
             console.log('Connected to MongoDB...');
         })
        .catch(err => {
             console.error('Error connecting to MongoDB...', err);
        });
//Parse JSON -> Dùng Middleware
app.use(express.json());            


//1. API liệt kê tất cả các items
app.get('/items', async(req, res)=>{
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//2. Lấy chi tiết item theo ID:Get
app.get('/items/:id',async(req, res) => {
    try {
        const items = await Item.findById(req.params.id);
        if(!items) return res.status(404).json({message: 'Item not found'});
        res.json(items);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//3. API Lấy ra cập nhập theo ID:PUT 
app.put('/items/:id' ,async(req, res) =>{
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!item) return res.status(404).json({message: 'Item not found'});
        res.json(item);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//4. API Thêm item mới ID:POST
app.post('/items' ,async(req, res)=>{
    try {
        const item = new Item(req.body);
        await item.save();
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({message: error.message});
    }

});

//5. API xóa Item theo ID delete
app.delete('/items/:id' ,async(req, rea)=>{
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        if(!item) return res.status(404).json({message: 'Item not found'});
        res.json(item);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//Cấu hình server
app.listen(port,() => {
    console.log(`Server is running on http://localhost:27017 ${port}`);
});