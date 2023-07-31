const express = require('express');
const mysql = require('mysql');
const app = express();
var bodyParser = require('body-parser')

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const query = 'SELECT * FROM `prediction_table`.`matches`;'



const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'database-2.cpralmrljzsc.ap-south-1.rds.amazonaws.com',
    user: 'admin',
    password: 'adminadmin',
    database: 'prediction_table',
    debug: false
});

pool.getConnection((err, connection) => {
    if (err) throw err;
    app.get('/getmactchs', (req, res) => {
        connection.query(query, (err, results) => {
            if (err) {
                return res.send(err)
            }
            else {
                return res.json(results)
            };
        });
    });
    app.post('/uploadmatchdata', (req, res)=>{
        let alldata = req.body.allData;
        let values = Object.values(alldata)
        console.log("----->",Object.values(alldata))
        const query1 = "INSERT INTO prediction_table.matches(prediction_description,prediction_image_link,match_name,league,date,time,Stadium,match_report,telegram_link,Instagram_link,facebook_link,Batsman1,Batsman2,prediction_id) VALUES (?)";
        connection.query(query1,[values],(err, results) => {
            if (err) {
                console.log(err)
                return res.send(err)
            }
            else {
                console.log(results)
                return res.json(results)
            };
        });
    });
});

app.listen(4000, () => {
    console.log('MySchema SQL server listening on PORT 4000');
});