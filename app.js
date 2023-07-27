const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
var bodyParser = require('body-parser')

var corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const query = 'SELECT * FROM `prediction_table`.`test`;'



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

    app.get('/test', (req, res) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Content-Type, api_key, authorization, Authorization, x-requested-with, Total-Count, Total-Pages, Error-Message');
        res.header('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT, OPTIONS');
        res.header('Access-Control-Max-Age', 1800);
        connection.query(query, (err, results) => {
            if (err) {
                return res.send(err)
            }
            else {
                return res.json(results)
            };
        });
    });
    app.post('/test1', (req, res)=>{
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Content-Type, api_key, authorization, Authorization, x-requested-with, Total-Count, Total-Pages, Error-Message');
        res.header('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT, OPTIONS');
        res.header('Access-Control-Max-Age', 1800);
        let alldata = req.body.allData;
        let values = Object.values(alldata)
        console.log("----->",Object.values(alldata))
        const query1 = "INSERT INTO prediction_table.test(prediction_description,prediction_image_link,match_name,league,date,time,Stadium,match_report,telegram_link,Instagram_link,facebook_link,Wicket_Keeper1,Batsman1,all_rounder_1,Baller1,Wicket_Keeper2,Batsman2,all_rounder_2,Baller2,Team_1_playing,Team_2_playing,prediction_id) VALUES (?)";
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

const PORT = 8080;
app.listen(PORT, () => {
    console.log('MySchema SQL server listening on PORT ', PORT);
});