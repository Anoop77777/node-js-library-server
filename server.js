console.log("start");
var express= require("express");
var mysql= require("mysql");
var cors=require("cors");
var bodyParser = require('body-parser');

var app= express();
app.use(cors());
// middleware for json
app.use(express.json());
// middleware for urlencoded

app.use(express.urlencoded({
    extended: true
  }));
// sever port
app.listen(9000,function(){
    console.log("server created");
});
// db connection object
var con=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"book_db"
});
// db connection
con.connect(function(err){
    if (err) throw err;
    console.log("Connected!");
})

// welcome page//

app.get("/",function(req,res){
  res.send("<h1> welcome</h2>");
});

// get book list //

app.get("/books",function(req,res){
    con.query("select * from books ",(err,result,feilds)=>{
        if (err) throw err;
        res.send(result).statusCode(200);
    });
});

// get single book

app.get("/books/:id",function(req,res){
    let id=req.params.id;
    con.query("select * from books where id="+id,(err,result,feilds)=>{
        if (err) throw err;
        res.send(result);
    });
});

// add book into booklist

app.post("/book",function(req,res){
    let titile=req.body.titile;
    let description=req.body.description;
    let author= req.body.author;
    let price=req.body.price;

    let qu=`INSERT INTO books( book_titile,description,author,price) VALUES('${titile}','${description}','${author}',${price})`;
    con.query(qu,(err,result)=>{
        if(err){
            res.send({error:"operation failed"})
        }
        else{
            res.send({success:"operation completed"})
        }
    })

})

// update book details

app.patch("/books",function(req,res){
    let titile=req.body.titile;
    let description=req.body.description;
    let author= req.body.author;
    let price=req.body.price;
    let id=req.body.id;

    let query=`UPDATE  books SET  book_titile='${titile}',description='${description}',author='${author}',price=${price} WHERE  id= ${id} `;

    con.query(query,(err,result)=>{
        if(err){
            res.send({error:"operation failed"})
        }
        else{
            res.send({success:"update completed"})
        }
    })

})

// delete book

app.delete("/books",function(req,res){
    let id=req.body.id; 
    let qur=`DELETE FROM books WHERE id = ${id}`;
    con.query(qur,(err,result)=>{
        if(err){
            res.send({error:"operation failed"})
        }
        else{
            res.send({success:"record deleted"})
        }
    })
})


