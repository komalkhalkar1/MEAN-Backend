var Express =require("express");
var MongoClient=require("mongodb").MongoClient;
var cors=require("cors");
const multer=require("multer");

var app=Express();
app.use(cors());

var CONNECTION_STRING="mongodb+srv://komalkhalkar:Komal%40123@cluster0.6nzkkrg.mongodb.net/todoappdb?retryWrites=true&w=majority&appName=Cluster0";

var DATABASENAME="todoappdb";

var database;

app.listen(4200,()=>{
    MongoClient.connect(CONNECTION_STRING,(error,client)=>{
        database=client.db(DATABASENAME);
        console.log("mongodb connection successfully...!");
    })
})

app.get('/api/todoappdb/GetNotes',(request,response)=>{
    database.collection("todoappdb").find({}).toArray((error,result)=>{
        response.send(result);
    });
})

app.post('/api/todoappdb/AddNotes',multer().none(),(request,response)=>{
database.collection("todoappdb").count({},function(error,numOfDocs){
    database.collection('todoappdb').insertOne({
        id:(numOfDocs +1).toString(),
        description:request.body.newNotes
    });
    response.json("Added Successfully");
});

})

app.delete('/api/todoappdb/DeleteNotes', (request,response)=>{
    database.collection("todoappdb").deleteOne({
        id:request.query.id
    });
    response.json("Delete Successfully");
})