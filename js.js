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
    port : 3306,

    password : "Dcsd138409",
    database : "amazon"
})


connection.connect(function(err){
    if (err) throw err;
    console.log(`connected to database as connection ${connection.threadId}\n`)
    
    
        if (err) throw err
        inquireCustomer()
    
})

function inquireCustomer(){
    inquire.prompt(
        {
            message: "Welcome to my CLI store friend.",
            type: "list",
            name: "start",
            choices: ["Buy an Item", "Quit"]
        }
    ).then(ans => {
        if(ans.start === "Buy an Item"){
            purchasemenu();
        }else if (ans.start === "Quit"){
            console.log("Ok, thanks for playing!")
        }  
})
}


function purchasemenu(){
    connection.query("SELECT * FROM inventory",function(err,res){
      if (err) throw err; 
      for(var i = 0; i<res.length;i++){
        console.log("ID: " + res[i].itemID + " | " + "Product: " + res[i].itemName +  " | " + "Price: " + res[i].itemCost + " | " + "Amount: " + res[i].itemQuantity + "\n"); 
      }
      inquire.prompt(
      [  {
          name: "id",
          message: "Please enter the item ID of the item you wish to purchase.",
          type: "input",
          validate: function(value){
            if(isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0){
               // console.log("validated!")
              return true;

            } else{
              return false;
            }
            }
        },
        {
        name: "qty",
        message: "Please input a quantity.",
        type: "input",
        validate: function(value){
            if(isNaN(value) == false && parseInt(value) > 0){
              return true;
            } else{
              return false;
            }
        }

        }]).then(ans => {
        var soldID = ans.id
        var amtSold = parseInt(ans.qty)
        if(res[soldID].itemQuantity >= amtSold){
            
            connection.query("UPDATE inventory SET ? WHERE ?", [
            {itemQuantity: (res[soldID].itemQuantity - amtSold)},
            {itemId: ans.id}
            ], function(err, result){
                if(err) throw err;
                console.log("Success! Your total is $" + amtSold * res[soldID].itemCost + ". Your purchase will be shipped once we set up the code for that!");
                restart();
            });
    }
})
    })
}

function restart(){
    inquire.prompt(
        {
        type: "confirm",
        name: "name",
        message: "Wanna buy some more stuff??"
      }).then(function(ans){
        if(ans.name){
          purchasemenu();
        } else{
          console.log("Have a nice day!");
          connection.end();
        }
    })
}
      
  
