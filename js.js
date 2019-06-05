//TODO
//Set up inquire to ask questions based on user input
//Have sql manipulate data based on user input
//Design a small ui so user can see what is being manipulated.
//Add in data, through either SQL or javascript, or even a third file.
 
var mysql = require("mysql")

var inquire = require("inquirer")

var connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    port : 3669,

    password : "Dcsd138409",
    database : "amazon"
})


connection.connect(function(err){
    if (err) throw err
    console.log(`connected to database as connection ${connection.threadId}\n`)
})