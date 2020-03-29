const express = require('express')
const app = express();
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')
const multer = require('multer')
const multerParse = multer()


const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'cs304_db'
})



app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:false
}))

// app.get('/select', (req,res)=>{
//     db.query('select * from test',(err,result)=>{
//         if(err) throw err;
//         res.send(result)
//     })
// })
//create new users
app.post('/insert', multerParse.none(), (req,res)=>{
    let formdata_1 = {
        username: req.body.username,
        birthday: req.body.birthday
    }
    let formdata_2 = {
        username: req.body.username,
        pageid:     req.body.id,
        email:  req.body.email,
        password: req.body.password,
        name: req.body.name,
        page_description: req.body.description,
        profile_picture: req.body.picture
    }
    let sql_1 = 'INSERT INTO Birthdays SET?';
    db.query(sql_1, formdata_1, (err,result) =>{
        if(err) throw err;
    })

    let sql_2 = 'INSERT INTO USERS SET ?' ;
    db.query(sql_2, formdata_2,(err,result)=>{
        if (err) throw err;
        res.send('You have sucessfully added a new User')
    })
})
//update user info
app.put('/insert', multerParse.none(), (req,res)=>{
    let formdata_1 = [{
        username: req.body.username,
        birthday: req.body.birthday
    }, req.body.username]
    let formdata_2 = [{
        username: req.body.username,
        pageid:     req.body.id,
        email:  req.body.email,
        password: req.body.password,
        name: req.body.name,
        page_description: req.body.description,
        profile_picture: req.body.picture
    }, req.body.username]
    
    let sql_1 = 'UPDATE Birthdays SET ? WHERE username = ?';
    db.query(sql_1, formdata_1, (err,result) =>{
        if(err) throw err;
    })

    let sql_2 = 'UPDATE USERS SET ? WHERE username = ?' ;
    db.query(sql_2, formdata_2,(err,result)=>{
        if (err) throw err;
        res.send('You have sucessfully updated a new User')
    })
})




// db.query('select * from test', (err,result)=>{
//     if(err) throw err;
//     console.log(result)
// })


const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log('Listening')
})