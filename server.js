require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const port = 3000;
const productsData = require("./src/db/products.json");
const users = require("./src/db/usersData.json");
const fs = require('fs');


app.use(cors());
app.use(express.json());


app.post("/login", (req, res) => {
    const { username, password } = req.body;
    let user = {}
    if (users.list.some(i => {
        user = i
        return (i.username === username && i.password === password)
    })) {
        const token = jwt.sign(user, process.env.JWT_KEY,{
            expiresIn: "1h",
        });
        res.status(200)
        res.json({
            message:"OK",
            token,
            user,
        });
    } else {
        res.status(200)
        res.json({
            message: "Wrong login information !",
        });
    }
});

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  let user = {}
  fs.readFile('./src/db/usersData.json', 'utf8', (err, jsonString) => {
    if (err) {
      res.status(403);
      res.json({
        message: `Data error in server: ${err}`,
      });
    }
    try {
      const usersData = JSON.parse(jsonString).list
      const {[usersData.length - 1]:last} = usersData
      user = {
        id: last.id+1,
        username,
        password,
        wishlist: []
      }
      usersData.push(user)
      const result = JSON.stringify({
        list:usersData
      })
      fs.writeFile('./src/db/usersData.json', result, err => {
        if (err) {
          res.status(403);
          res.json({
            message: `Data error in server: ${err}`,
          });
        } else {
          const token = jwt.sign(user, process.env.JWT_KEY,{
            expiresIn: "1h",
          });
            res.status(200)
            res.json({
              token,
              user,
            });
        }
      })
    } catch(err) {
      res.status(403);
      res.json({
        message: `Data error in server: ${err}`,
      });
    }
  })
});

app.post("/verify", (req, res)=>{
  const {token} = req.body;
  jwt.verify(token, process.env.JWT_KEY, (err, verifiedJwt) => {
    if(err){
      console.log(err)
      res.send(err.message)
    }else{
      console.log(verifiedJwt)
      res.send(verifiedJwt)
    }
  })

})

app.post("/wishlist", (req,res)=>{
  const {itemId, userId, token} = req.body;
  const list = users.list;
  let index = 0;
  if(list.some((i, listIndex) =>{
    index = listIndex
    return (i.id === userId)
  })){
    let wishlist = list[index].wishlist
    const itemIndex = wishlist.indexOf(itemId)
    if(itemIndex>-1){
      wishlist.splice(itemIndex, 1)
    }else{
      wishlist.push(itemId)
    }
    list[index].wishlist = wishlist
    const result = JSON.stringify({
      list:list
    })
    fs.writeFile('./src/db/usersData.json', result, err => {
      if (err) {
        res.status(403);
        res.json({
          message: `Data error in server: ${err}`,
        });
      } else {
        jwt.verify(token, process.env.JWT_KEY, (err, verifiedJwt) => {
          if(err){
            res.status(403);
            res.json({
              message: `Data error in server: ${err}`,
            });
          }else{
            verifiedJwt.wishlist = wishlist
            const updatedToken = jwt.sign(verifiedJwt, process.env.JWT_KEY);
            res.status(200)
            res.json({
              updatedToken: updatedToken,
              user: list[index]
            });
          }
        })
          res.status(200)
          res.json({
            message: "successful"
          });
      }
    })
    

  }
})

app.get("/wish",(req,res)=>{
  //for a local user, get wishlist array from token and update the products, wishlisted
  const {id} = req.query
  let index = 0;
  const list = users.list;
  if(list.some((i, listIndex) =>{
    index = listIndex
    return (i.id == id)
  })){
    const results = productsData.products.filter(product => {
      if(list[index].wishlist.indexOf(product.id)>-1){
        product.wishlisted = true
        return product
      }
    })
    res.send(results)
  }
  
})

app.get("/products",(req, res)=>{
  const {cat, subcat, supercat, type} = req.query
  const results = productsData.products.filter(product => ((product.cat_slug === cat) && (product.subcat_slug === subcat) && (product.supercat_slug === supercat) && (product.type_slug === type)));
  res.send(results)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});