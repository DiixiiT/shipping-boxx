const express=require('express');
const bodyParser=require('body-parser');
const hexRgb = require('hex-rgb');
const cors=require('cors');
const app=express();
const PORT= 5000;

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://ship:ship@cluster0.c8fjy.mongodb.net/shippingbox?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
let collection=null;
client.connect(err => {
    if(err){
        console.log('error while connecting')
    }
    console.log('connected')
   collection = client.db("shippingbox").collection("orders");
  // perform actions on the collection object

});

app.post("/create",async(req,res)=>{
    const data={name:req.body.name,
        Weight:req.body.Weight,
        color: hexRgb(req.body.Color, { format: 'css' }),
        Country:req.body.Country,
        coast:req.body.coast,
    };
    
   console.log(data)

    try{
        await collection.insertOne(data);
        console.log('inserted')
        res.status(200).send('success');
    }
    catch(err){
        res.status(400).send('failed');
    }
    
    
})


{/*-----------------------------------------------------------------------------------------------*/}

 app.get("/get-orders", async (req, res) => {
    try {
        const data = [];
        const cursor = await collection.find()

        await cursor.forEach(doc => {
            console.log(doc);
            data.push(doc)
        })
        res.send(data).status(200)
    } catch (err) {
        console.log(err);
        res.send(err).status(500)
    }
}) 

{/*-----------------------------------------------------------------------------------------------*/}

client.close();
app.listen(PORT,()=>{
    console.log('running')
}) 

  