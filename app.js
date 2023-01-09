const { response } = require("express");
const express = require("express");
const app = express();
const port = 3004
const mysql = require("./connection").con
//configuration
app.set("view engine", "hbs");
app.set("views", "./view")
app.use(express.static(__dirname + "/public"))


//routing

app.get("/homepage", (req,res) => {
     res.render("homepage");
});

app.get("/registration", (req,res) => {
   res.render("registration");
   
});

app.get("/user_registration", (req,res) => {
   const { fullname, phonenumber, email, password, usertype} = req.query
   
                let qry = "insert into user_table values(?,?,?,?,?)";
                mysql.query(qry, [ fullname, phonenumber, email, password, usertype], (err, results) => {
                  if(err) throw err
                  else {                     

                     if (results.affectedRows>0) {                        
                        res.render("registration", {mesg1: true, mesg2: false})                        

                     } else {   
                        res.render("registration", {mesg1: false, mesg2: true})
                     }
                  }
   
                })             
});

app.get("/login", (req,res) => {
   res.render("login");
});

app.get("/validatelogin", (req, res) => {
   // fetching data from form
   const { email, password} = req.query
console.log(email);
   // Sanitization XSS...
   let qry = "select usertype,email from user_table where email=? and password=?";
   mysql.query(qry, [email, password], (err, results) => {
                  if(err) {
                     console.log("if errors statement");
                     res.render("login", {mesg1: false, mesg2: true})
                  }
                  else {
                     console.log(results[0].usertype);
                    // res.send(results.get);
                     if (results[0].usertype== "Laundry user") {
                        console.log("to go the dashboardlaundryuser"+ results[0].email);
                        res.render("dashboardlaundryuser", {email: results[0].email})
                     } else {
                        console.log("to go the dashboardlaundryemployee");
                        res.render("dashboardlaundryemployee")
                     }
                  }
      
       
   })
});

app.get("/dashboardlaundryuser", (req,res) => {
   res.render("dashboardlaundryuser");
});

app.get("/dashboardlaundryemployee", (req,res) => {
   res.render("dashboardlaundryemployee");
});

app.get("/newrequest", (req,res) => {
   const {email} = req.query
   console.log("Inside new request"+email);
   res.render("newrequest" , {email: email});
});

app.get("/savenewrequest", (req,res) => {
   const { pickupdate, topwear, bottomwear, otherwears, email} = req.query
   let status= "submitted";

   console.log("Inside save request"+pickupdate);
                let qry = "insert into request_table values(?,?,?,?,?,?)";
                mysql.query(qry, [ pickupdate, topwear, bottomwear, otherwears, email, status], (err, results) => {
                  if(err) throw err
                  else {                     

                     if (results.affectedRows>0) {                        
                        res.render("newrequest", {mesg1: true, mesg2: false})                        

                     } else {   
                        res.render("newrequest", {mesg1: false, mesg2: true})
                     }
                  }
   
                })             
});

app.get("/oldrequests", (req,res) => {
   const {email}= req.query
   let qry = "select * from request_table where email=?";

   mysql.query(qry, [email], (err, results) => {
      if(err) {
         console.log("if errors statement");
         res.render("dashboardlaundryuser", {email: email})
      }
      else {
         // res.send(results.get);
        res.render("listofoldrequests", { data: results });
      }
})
});

app.get("/changepassword", (req,res) => {
   res.render("changepassword");
});

app.get("/savechangepassword", (req,res) => {
   const { email, oldpassword, newpassword} = req.query  
   console.log(oldpassword);
                let qry = "update user_table set password=? where email=? and password=?";
                mysql.query(qry, [ newpassword, email, oldpassword], (err, results) => {
                  if(err) throw err
                  else {                     

                     if (results.affectedRows>0) {                        
                        res.render("changepassword", {mesg1: true, mesg2: false})                        

                     } else {   
                        res.render("changepassword", {mesg1: false, mesg2: true})
                     }
                  }
   
                })             
});

app.get("/forgotpassword", (req,res) => {
   
   res.render("forgotpassword");
});

app.get("/saveforgotpassword", (req,res) => {
   const { fullname, email} = req.query
     
                let qry = "select password user_table where fullname=? and email=?";
                mysql.query(qry, [fullname, email], (err, results) => {
                  res.send(results)
                  
                  if(err) throw err
                  else {                     

                     if (results.affectedRows>0) {                        
                        res.render("forgotpassword", {mesg1: true, mesg2: false})                        

                     } else {   
                        res.render("forgotpassword", {mesg1: false, mesg2: true})
                     }
                  }
   
                })             
});
//create server
app.listen(port, (err) => {
    if (err)
      throw err
      else
         console.log("Server is running at port %d:", port );
});