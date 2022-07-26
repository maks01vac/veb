const express = require('express');

const port = process.env.port ?? 3000;
const app = express();

app.use(express.json());

app.get('/courses',(req,res)=>{
    res.send(req.body);
});
app.post('/courses',(req,res)=>{
    res.send(req.body);
});
app.put('/courses',(req,res)=>{
    res.send(req.body);
});
app.delete('/courses',(req,res)=>{
    res.send(req.body);
});

app.listen(port, ()=>{
    console.log(`Server has been started on port ${port}`)
});