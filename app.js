const { response, query } = require("express");
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

app.get("/register", (req,res) => {
   res.render("register");
   
});

app.get("/user_registration", (req,res) => {
   const { fullname, phonenumber, email, password, usertype} = req.query
   
                let qry = "insert into user_table values(?,?,?,?,?)";
                mysql.query(qry, [ fullname, phonenumber, email, password, usertype], (err, results) => {
                  if(err) throw err
                  else {                     

                     if (results.affectedRows>0) {                        
                        res.render("register", {mesg1: true, mesg2: false})                        

                     } else {   
                        res.render("register", {mesg1: false, mesg2: true})
                     }
                  }
   
                })             
});

app.get("/login", (req,res) => {
   res.render("login");
});

app.get("/validatelogin", (req, res) => {
   const { email, password} = req.query
   let qry = "select usertype,email from user_table where email=? and password=?";
   mysql.query(qry, [email, password], (err, results) => {
                  if(err) {
                     
                     res.render("login", {mesg1: false, mesg2: true})
                  }
                  else {
                     
                    
                     if (results[0].usertype== "Laundry user") {
                        
                        res.render("dashboardlaundryuser", {email: results[0].email})
                     } else {
                        
                        res.render("dashboardlaundryemployee")
                     }
                  }
      
       
   })
});

app.get("/dashboardlaundryuser", (req,res) => {
   res.render("dashboardlaundryuser");
});

app.get("/newrequest", (req,res) => {
   const {email} = req.query
   res.render("newrequest" , {email: email});
});

app.get("/savenewrequest", (req,res) => {
   const { pickupdate, topwear, bottomwear, otherwears, email} = req.query
   let status= "submitted";

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

app.get("/listofoldrequests", (req,res) => {
   const {email}= req.query

   let qry = "select * from request_table where email=?";
   mysql.query(qry, [email], (err, results) => {
      if(err) {
         
         res.render("dashboardlaundryuser", {email: email})
      }
      else {
         
        res.render("listofoldrequests", { data: results });
      }
})
});

app.get("/dashboardlaundryemployee", (req,res) => {
   res.render("dashboardlaundryemployee");
});

app.get("/retrievedataofsubmitedrequest", (req, res) => {
   let status="submitted"
   
   let qry = "select * from request_table where status=?";
   mysql.query(qry, [status], (err, results) => {
      
      if(err) throw err
       else { 
                     
            if (results.length > 0){
            res.render("updationofsubmitedrequest", {data: results});
         } else {
         
        res.render("updationofsubmitedrequest", {data: results});
      }
   }
})
});

app.get("/updationofsubmitedrequest", (req,res) => {
   res.render("updationofsubmitedrequest");
});

app.get("/updatestatus", (req,res) => {
   const { status, email} = req.query 
   
   let qry = "update request_table set status=? where email=?";
   mysql.query(qry, [status, email], (err, results) => {
      if (results.affectedRows>0) {
         res.render("showupdatestatus", {mesg1: true, mesg2: false})
      } else {
         res.render("showupdatestatus", {mesg1: true, mesg2: false})
      }

   })
});

app.get("/changepassword", (req,res) => {
   res.render("changepassword");
});

app.get("/savechangepassword", (req,res) => {
   const { email, oldpassword, newpassword} = req.query  
   
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

app.get("/showforgotpassword", (req,res) => {
   res.render("showforgotpassword");
});

app.get("/getforgotpassword", (req,res) => {
   const { fullname, email} = req.query
   
                let qry = "select password from user_table where fullname=? and email=?";
                mysql.query(qry, [fullname, email], (err, results) => {
                  
                  if(err) throw err
                  else {           
                     if (results.length > 0) { 
                        res.render("showforgotpassword", {mesg1: true, password: results[0].password, mesg2: false})
                     } else {   
                        res.render("showforgotpassword", {mesg1: false, mesg2: true})
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