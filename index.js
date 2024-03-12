const express=require('express');
const dotenv=require('dotenv').config();
const PORT=process.env.PORT;
const {connection}=require('./db.js');
const { userRouter } = require('./routing/userRouter.js');
const { auth } = require('./middlewares/authMiddleware.js');
const { noteRouter } = require('./routing/noteRouter.js');
const {blackList}=require('./blackList.js')
const cors= require("cors")

const app=express();
app.use(cors());
app.use(express.json());
app.use('/users',userRouter);
app.get('/',auth,(req,res)=>{
    res.status(200).send({'message':"You are in home page"});
})
app.use('/notes',auth,noteRouter);
app.get('/logout',(req,res)=>{
    const token = req.headers.authorization.split(' ')[1];
    try {
        blackList.push(token);
        res.send({"Message":"User has logged out"});
    } catch (error) {
        res.send({"Message":error});
    }
})
app.listen(PORT,async()=>{
    try {
        await connection;
        console.log(`Server runs on http://localhost/${PORT}`);
        console.log('Db is connected to the server');
    } catch (error) {
        console.log('Db is not connected to the server');
    }
})