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
//delete users from db
app.post('/delete',multerParse.none(), (req,res)=>{
    let sql = 'DELETE FROM users WHERE username = ?';
    db.query(sql, [req.body.username], (err,result)=>{
        if(err) throw err;
        res.send('You have successfully deleted what you want!');
        console.log('Deleted')
    })
})

//selection
app.post('/select/:username', multerParse.none(),(req,res)=>{
    let sql = 'SELECT * FROM users WHERE username = ?'
    db.query(sql, [req.params.username], (err,result)=>{
        
        if(err) throw err;
        res.send(result)
        console.log(JSON.stringify(result))
        return result;
    })
})

//projection
app.post('/project', multerParse.none(), (req,res)=>{
    let sql = 'SELECT u.Name FROM users u, join_group j, groups g WHERE u.Username=j.PublicUsername AND j.GroupID = g.GroupID AND g.Name = ?'
    db.query(sql, [req.body.name], (err,result)=>{
        if(err) throw err;
        res.send(JSON.stringify(result))
        return result
    })
})

//Nested aggregation
app.post('/aggregate', multerParse.none(),(req,res)=>{
    let sql = `select AVG(b.Age) As Average_age from birthdays b, users u WHERE  u.Username = b.Username AND u.Username IN (select f.PublicUsername1 from follow_user f WHERE f.PublicUsername2 = ?)`
    db.query(sql, [req.body.username],(err, result)=>{
        if(err) throw err;
        res.send(JSON.stringify(result))
        return result
    })
})

//Divison query
app.get('/division',multerParse.none(), (req,res)=>{
    let sql = 'select e.Name from events e WHERE NOT EXISTS (select Username from public_user EXCEPT select u.Username from attend_event a, Users u WHERE u.Username = a.PublicUsername AND e.EventID = a.EventID)'
    db.query(sql, (err, result)=>{
        if(err) throw err
        res.send(JSON.stringify(result))
        return result
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