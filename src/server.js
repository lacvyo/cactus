var express = require('express');
var path = require("path");
var mysql = require('mysql');
var bodyParser = require('body-parser');

var app = express()
app.use(bodyParser());
app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({extended:true}));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'BNC'
});

app.use(function (req, res, next) {
     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
     res.setHeader('Access-Control-Allow-Credentials', true);
     next();
 });

 //connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('Mysql connected..');
});

//get count
app.get('/getcount/:id', (req, res) =>{
    let range = `${req.params.id}`
    let remove = range.substring(1);
    console.log(remove)

    var cat;
    let sql;
    if(remove=="All"){
        sql = `select count(product_id) as count from Products`;

    }else {
        sql = `select count(product_id) as count from Products where product_category = '${remove}'`;

    }
    
    let query = db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    });

});

//get
app.get('/getposts/:id', (req, res) =>{

    let range = `${req.params.id}`
    let remove = range.substring(1);
    let category = remove.substring(1);
    let num


    console.log(range[1])
    console.log(category)
    if (range[1] == 1){
       num = range[1] * 0
    }
    else if(range[1] == 2) 
    {
        num =  8
    }
    else {
        num = ((range[1] - 1) * 8) + 1
    }

    let sql;
    if (category =="All"){
    sql = `select * from Products where product_active = 1 And quantity_availabe >= 1 order by product_id desc LIMIT ${num}, 8`;
    }
    else{
       sql = `select * from Products where product_category='${category}' and product_active = 1 And quantity_availabe >= 1 order by product_id desc LIMIT ${num}, 8`;

    }

    
    let query = db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});



app.get('/getorderprice/:id', (req, res) =>{

    let range = `${req.params.id}`
    let remove = range.substring(1);
    let test = remove.substring(1);
    let category = test.substring(1);
console.log("Test")
console.log(range)
console.log(test[0])
console.log(category)

    let num 

    if (range[1] == 1){
       num = range[1] * 0
    }
    else if(range[1] == 2) 
    {
        num =  8
    }
    else {
        num = ((range[1] - 1) * 8) + 1
    }
    
    let sql;

    if (test[0] == 1 && category != "All"){
      sql = `select * from Products where product_category = '${category}' order by sale_price desc LIMIT ${num}, 8`;

    }
    else if (test[0] == 2 && category != "All"){
    sql = `select * from Products where product_category = '${category}' order by sale_price asc LIMIT ${num}, 8`;
    }
    else if(test[0] == 3 && category != "All"){
        sql = `select * from Products where product_category = '${category}' order by product_name  LIMIT ${num}, 8`;
    }
    else if(test[0] == 4 && category != "All"){
        sql = `select * from Products where product_category = '${category}' order by product_name  desc LIMIT ${num}, 8`;
    }
    else if(test[0] == 6 && category != "All"){
        sql = `select * from Products where product_category = '${category}' and size ="Small"  LIMIT ${num}, 8`;
    }
    else if(test[0] == 7 && category != "All"){
        sql = `select * from Products where product_category = '${category}' and size ="Medium"  LIMIT ${num}, 8`;
    }
    else if(test[0] == 8 && category != "All"){
        sql = `select * from Products where product_category = '${category}' and size ="Large"  LIMIT ${num}, 8`;
    }

    if (test[0] == 1 && category == "All"){
        sql = `select * from Products order by sale_price desc LIMIT ${num}, 8`;
  
      }
      else if (test[0] == 2 && category == "All"){
      sql = `select * from Products order by sale_price asc LIMIT ${num}, 8`;
      }
      else if(test[0] == 3 && category == "All"){
          sql = `select * from Products  order by product_name  LIMIT ${num}, 8`;
      }
      else if(test[0] == 4 && category == "All"){
          sql = `select * from Products  order by product_name  desc LIMIT ${num}, 8`;
      }
      else if(test[0] == 6 && category == "All"){
          sql = `select * from Products where size ="Small"  LIMIT ${num}, 8`;
      }
      else if(test[0] == 7 && category == "All"){
          sql = `select * from Products where size ="Medium"  LIMIT ${num}, 8`;
      }
      else if(test[0] == 8 && category == "All"){
          sql = `select * from Products where size ="Large"  LIMIT ${num}, 8`;
      }




    let query = db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.get('/getsearch/:id', (req, res) =>{
    let range = `${req.params.id}` 
    console.log(range)

    let sql;
    if(range[1] == undefined){
        sql = `SELECT *
        FROM Products
        order by product_id desc
        LIMIT 0, 8`;
    }
    else { sql = `SELECT *
               FROM Products
               WHERE( product_name LIKE '%${range[1]}%')
               order by product_id desc
               LIMIT 0, 8`;}
        let query = db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.get('/getEditInfo/:id', (req, res) =>{
    let edit = `${req.params.id}` 
    let newVal = edit.substr(1);
    console.log(newVal);
     let sql = `SELECT * FROM Products WHERE product_id = ${newVal}`
     console.log(sql);
     let query = db.query(sql, (err, result) =>{
         if(err) throw err;
         console.log(result);
         res.send(result);
    });
 
  
});  

app.get('/getEditInfoCategory/:id', (req,res)=>{

    let edit = `${req.params.id}` 
    let newVal = edit.substr(1);
    console.log(newVal);

    let categoria = `SELECT product_category FROM Products WHERE product_id = ${newVal}`

   // console.log(categoria);
    let querys = db.query(categoria, (err, result) =>{
    
        if(err) throw err;
        if(result[0].product_category == 'Travel'){

            let travel = `SELECT * FROM Travel WHERE product_id = ${newVal}`
            let querys = db.query(travel, (err, result) =>{
                if(err) throw err;
                console.log(result);
                res.send(result); 
            });
    
        }else{

            let travel = `SELECT * FROM Porcelain WHERE product_id = ${newVal}`
            let querys = db.query(travel, (err, result) =>{
                if(err) throw err;
                console.log(result);
                res.send(result); 
            }); 
        }
        
   });

      

});

app.post('/editProducts', function(req,res){

    let edit = req.body.id;
    
    
     console.log(edit);
    let post = {product_name: req.body.name, product_description:req.body.description , quantity_availabe: req.body.quantity,
        size: req.body.sizep, initial_price: req.body.initialPrice, sale_price: req.body.salePrice, product_active: req.body.active,
        message_in_cup: req.body.message, colors: req.body.color, product_category: req.body.productCategory, img: req.body.image, 
        product_active: req.body.active};
    //product_active: req.body.disable
    let postCategotyTravel = { material: req.body.materials, therm: req.body.istherm};
    let postCategoryPorcelain = { paint_coat: req.body.paintCoat, tough: req.body.toughs};
    
   console.log(postCategotyTravel); 
   console.log(postCategoryPorcelain); 
    let sql = `UPDATE Products SET ? WHERE Products.product_id = ${edit}`; 
     
    let query = db.query(sql,post,(err, result) =>{
         if(err) throw err;
         console.log(result);

 
    });
    console.log(post.product_category); 
    if(post.product_category =='Travel'){

        console.log("That");

        let travel = `UPDATE Travel SET ? WHERE Travel.product_id = ${edit}`;
        console.log(travel); 
        let query = db.query(travel,postCategotyTravel,(err, result) =>{
            if(err) throw err;
            console.log(result);
           
        });
    }

     
    //  }else{

    //     let porcelain = `UPDATE Porcelain SET ? WHERE Products.product_id = ${edit}`; 
    //     console.log(porcelain);
    //     let query = db.query(sql,postCategoryPorcelain,(err, result) =>{
    //         if(err) throw err;
    //         console.log(result);
           
    //     });
    //  }
    

});

app.get('/prueba',function(req,res){


    let sql = 'SELECT * FROM Oredenes';

    let query = db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
       // res.send('Data inserted');
    });


});

app.post('/addProductQ',function(req,res){

    let post = {product_name: req.body.name, product_description:req.body.description , quantity_availabe: req.body.quantity,
        size: req.body.sizep, initial_price: req.body.initialPrice, sale_price: req.body.salePrice, product_active: req.body.active,
        message_in_cup: req.body.message, colors: req.body.color, product_category: req.body.productCategory, img: req.body.image,
    };


    let sql = 'INSERT INTO Products SET ?'; 
    //let sql = `INSERT INTO products (id, name, color, description, price, img) VALUES (name: ${req.body.name}, color: ${req.body.color}, description: ${req.body.description}, price: ${req.body.price}, img: ${req.body.img})`;
     
       let query = db.query(sql,post, (err, result) =>{
         if(err) throw err;
         console.log(result);
        // res.send('Data inserted');
     });




    console.log(post.product_category)
   if(post.product_category == 'Travel'){

        let id = 'SELECT product_id FROM Products ORDER BY product_id DESC LIMIT 1';
        
        var r ;
        something = '';
        let idQuery = db.query(id, (err, result) =>{
        
            if(err) throw err;
            console.log(result);

            r = result[0].product_id;
           
            
         console.log( r);     

            
            let categoryJ = { product_id: r , material: req.body.materials, therm: req.body.istherm};
            let sql = 'INSERT INTO Travel SET ?'; 
            let query = db.query(sql,categoryJ, (err, result) =>{
                if(err) throw err;
                console.log(result);
                res.send('Data inserted');

            });


        });
    }else{

        let id = 'SELECT product_id FROM Products ORDER BY product_id DESC LIMIT 1';
        var r ;
        something = '';
        let idQuery = db.query(id, (err, result) =>{
        
            if(err) throw err;
            console.log(result);

            r = result[0].product_id;
           
            
         console.log( r);     

            
            let categoryJ = { product_id: r , paint_coat: req.body.paintCoat, tough: req.body.toughs};
            let sql = 'INSERT INTO Porcelain SET ?'; 
            let query = db.query(sql,categoryJ, (err, result) =>{
                if(err) throw err;
                console.log(result);
                res.send('Data inserted');

            });


        });


    }
    

});

//------------------josean---------------------------------------------------------------------------------
//Progresso mio
app.post('/login', function (req, res) {
    console.log(req.body.email + req.body.password)
    
    let sql = `SELECT user_id, rol FROM users WHERE email = "${req.body.email}" and password = "${req.body.password}"`;
    let query = db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
  });
  app.post('/registerUser', function (req, res) {
    let checkUser = `SELECT count(user_id) as userBool FROM users WHERE email = "${req.body.tempEmail}"`;
    var userbool;
  
  
    let verify = db.query(checkUser, (err, result) => {
      if (err) throw err;
      userbool = result[0].userBool;
      console.log(userbool);
  
      let post = {
        first_name: req.body.tempFirstName,
        last_name: req.body.tempLastName,
        email: req.body.tempEmail,
        password: req.body.tempPassword,
        phone_number: req.body.tempPhone,
        date_of_birth: req.body.tempDate
      };
  
      if (userbool == 0) {
        let insertUser = `INSERT INTO users SET ?`;
        console.log("etrjalfg");
        let insertQuery = db.query(insertUser, post, (err, result) => {
          if (err) throw err;
          console.log("aqui");
          res.send("User Added to the database");
        });
      }
    });
  });
  
  app.post(`/getUserInformation`, function (req, res) {
    let sql = `select * from Users where User_id = "${req.body.userId}"`;
    let query = db.query(sql, (err, result)=> {
      if (err) throw err;
      console.log(result);
      res.send(result);
    }); 
  });
  
app.post(`/updateUserAddress`, function (req, res) {
    console.log("update is starting");
    console.log(req.body.User_id);

    let sql = `UPDATE Shipping_Address SET
     street_address = "${req.body.street_address}", 
     city = "${req.body.city}", 
    state = "${req.body.state}", zip_code = "${req.body.zip_code}", 
    active_shipping= "${req.body.active_shipping}"
    WHERE 
    User_id = "${req.body.User_id}" and street_address= "${req.body.pstreet_address}" 
    and city= "${req.body.pcity}" and state= "${req.body.pstate}" 
    and zip_code= "${req.body.pzip_code}"`;
  
    let query = db.query(sql, (err, result)=> {
      if (err) throw err;
      
      console.log(result);
      res.send({status :"User information is updated"});
    });
});
 
app.post('/registerUserAdmin', function (req, res) {
    let checkUser = `SELECT count(user_id) as userBool FROM users WHERE email = "${req.body.tempEmail}"`;
    var userbool;
  
  
    let verify = db.query(checkUser, (err, result) => {
      if (err) throw err;
      userbool = result[0].userBool;
      console.log(userbool);
  
      let post = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        phone_number: req.body.phone_number,
        date_of_birth: req.body.date_of_birth,
        rol: req.body.rol
      };
  
      if (userbool == 0) {
        let insertUser = `INSERT INTO users SET ?`;
        console.log("entro");
        let insertQuery = db.query(insertUser, post, (err, result) => {
          if (err) throw err;
          console.log("aqui");
          res.send("User Added to the database");
        });
      }
    });
  });
 
 
 
 
 
 
  app.post(`/updateUserInformation`, function (req, res) {
    console.log("update is starting");
   // console.log(req.body.user_active)

    let a;
    a = +req.body.user_active;
    
  console.log(a);
    
    let sql = `UPDATE Users SET 
    first_name= "${req.body.first_name}", last_name="${req.body.last_name}",
    email="${req.body.email}",password="${req.body.password}",
    phone_number= "${req.body.phone_number}",date_of_birth ="${req.body.date_of_birth}",rol ="${req.body.rol}", user_active = '${a}'
    WHERE User_id= "${req.body.user_id}" `;
  
    let query = db.query(sql, (err, result)=> {
      if (err) throw err;
      console.log(result);
      res.send({status :"User information is updated"});
    });
  });

  
  app.post('/getUserAddress', function (req, res){
    console.log(req.body.user_id)
    let sql = `select * from shipping_address where USER_ID = "${req.body.user_id}" and active_shipping = 1`;
    let query = db.query(sql, (err, result)=> {
      if (err) throw err;
      console.log(result);
      res.send(result);
    }); 
  });

//------------------____RAmon__________________


app.get('/getallproducts', (req, res) =>{
    let range = `${req.params.id}`
    let num
  
    if (range[1] == 1){
       num = range[1] * 0
    }
    else if(range[1] == 2)
    {
        num =  3
    }
    else {
        num = ((range[1] - 1) * 3) + 1
    }
    let sql = `select * from products`;
  
    let query = db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
  });
  
  app.get('/getallorders', (req, res) =>{
  
    let sql = 'select * from ordenes';
  
    let query = db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
  });
  
  app.get('/getallaccounts', (req, res) =>{
  
  
    let range = `${req.params.id}`
    let num
  
    if (range[1] == 1){
       num = range[1] * 0
    }
    else if(range[1] == 2)
    {
        num =  3
    }
    else {
        num = ((range[1] - 1) * 3) + 1
    }
    let sql = `select * from users`;
  
    let query = db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
  });
  

//   app.get('/salesByProduct', (req, res) =>{

    
//     let range = req.body
//     console.log(range)
//     // let sql = `SELECT product_name, count(product_id), sum(quantity_availabe), sum(quantity_availabe * price)
//     // FROM Ordenes NATURAL JOIN Item natural join Products`
//     // let sql =  `SELECT product_id, product_name, SUM(quantity_availabe), price,  SUM(quantity_availabe) * sale_price
//     // FROM Ordenes natural join item natural join products
//     // WHERE order_time  between "${dateTo}" and "${dateFrom}"`
    
//     // let query = db.query(sql, (err, result) =>{
//     //     if(err) throw err;
//     //     console.log(result);
//     //     res.send(result);
//     // });
    
//   });
app.post('/salesByProduct', function (req, res){


    x = req.body.data1
    y = req.body.data2
   x = x+' 00:00:00'
   y = y+' 00:00:00'
    console.log(x)
    console.log(y)
   //  let sql = `SELECT product_name, count(product_id), sum(quantity_availabe), sum(quantity_availabe * price)
   //    FROM Ordenes NATURAL JOIN Item natural join Products`
   let sql = `SELECT product_id, product_name, quantity_availabe, sale_price, product_category ,SUM(item.quantity) as sum_quantity, sum(item.quantity * sale_price) as income,
   sum(item.quantity * sale_price) - sum(item.quantity * initial_price) as productRevenue
   FROM Ordenes natural join item natural join Products
   WHERE order_time between "${x}" and "${y}" GROUP BY product_id`
   
   let query = db.query(sql, (err, result) =>{
       if(err) throw err;
       console.log(result);
       res.send(result);
   });


 });

 app.post('/salesReport', function (req, res){


   x = req.body.data1
   y = req.body.data2
  x = x+' 00:00:00'
  y = y+' 00:00:00'
   console.log(x)
   console.log(y)
  //  let sql = `SELECT product_name, count(product_id), sum(quantity_availabe), sum(quantity_availabe * price)
  //    FROM Ordenes NATURAL JOIN Item natural join Products`
  let sql = `SELECT  sum(quantity_availabe) as quantityAvailable, sum(Item.quantity) as sumQuantity, sum(Item.quantity * sale_price) as sumItemSale
  FROM Ordenes natural join Item natural join Products
  WHERE order_time between '${x}' and '${y}'`

  
  
  let query = db.query(sql, (err, result) =>{
      if(err) throw err;
      console.log(result);
      res.send(result);
  });


});

app.post('/revenueReport', function (req, res){


   x = req.body.data1
   y = req.body.data2
  x = x+' 00:00:00'
  y = y+' 00:00:00'
   console.log(x)
   console.log(y)
  //  let sql = `SELECT product_name, count(product_id), sum(quantity_availabe), sum(quantity_availabe * price)
  //    FROM Ordenes NATURAL JOIN Item natural join Products`
  let sql = `SELECT sum(quantity_availabe) as quantityAvailabe ,sum(Item.quantity) as soldQuantity, sum(Item.quantity * sale_price) - sum(Item.quantity * initial_price) as revenue
  FROM Ordenes natural join Item natural join Products
  WHERE order_time between '${x}' and '${y}'`

  
  
  let query = db.query(sql, (err, result) =>{
      if(err) throw err;
      console.log(result);
      res.send(result);
  });


});



app.post('/statusUpdate', function (req, res){

   edit = req.body.id
   y = req.body.data1
   z = req.body.data2
   // y = req.body.data2
   console.log(edit);
   console.log(y);
   console.log(z);



    let post = { status: req.body.data2, order_status: req.body.data1};

    let sql = `UPDATE Ordenes SET ? WHERE Ordenes.order_id = ${edit}`; 
    
    let query = db.query(sql,post,(err, result) =>{
        if(err) throw err;
        console.log(result);
        
   });
  
  
});






app.post('/payment',function(req,res){

    products = req.body

     var sql = `INSERT INTO \`Ordenes\` (\`order_id\`, \`user_id\`,\`shipping_method\`, \`status\`,\`total\`, \`payment_method\`, \`order_time\`, \`order_status\`) VALUES (order_id,${req.body[0].user_id}, "${req.body[0].shipping_method}",'0', ${req.body[0].total},"${req.body[0].payment_method}", CURRENT_TIMESTAMP,'In Progress')`;
                let query = db.query(sql,(err, result) =>{
                      if(err) throw err;
                     // console.log(result);
                      id = result.insertId  
 
                 this.products.forEach(element => {

                         let sql = `INSERT INTO \`Item\`(\`order_id\`, \`product_id\`, \`quantity\`, \`price\`) VALUES ('${id}', ${element.product_id}, ${element.quantity},${element.price})`; 
                         let query = db.query(sql,(err, result) =>{
                                  if(err) throw err;
                                //  console.log(result);   
                              });

                        

                             // console.log(element.product_id)
                              let sq = `SELECT quantity_availabe FROM Products WHERE product_id = ${element.product_id}`; 
                         
                              let qu = db.query(sq,(err, result) =>{
                                         if(err) throw err;

                                         qty = result;
                                         newQty = qty[0].quantity_availabe - element.quantity


                                        if(newQty > 0){
                                            let s = `UPDATE Products SET quantity_availabe = ${newQty} WHERE product_id = ${element.product_id}`; 
                              
                                            let q = db.query(s,(err, result) =>{
                                                       if(err) throw err;
                                                      // console.log(result);
                                                      
                                                   });
                                        }
                                      
                                       
                                     });


                     
                          
                 });
             });
  });
 
  app.get('/getorders/:id', (req, res) =>{
    let range = `${req.params.id}` 
     let sql = `SELECT *   FROM \`Ordenes\` natural join \`Item\` WHERE user_id = ${range[1]} group by order_id order by order_id desc`;
     let query = db.query(sql, (err, result) =>{
         if(err) throw err;
         console.log(result)
         res.send(result);
     });
 });

 app.get('/getproduct/:id', (req, res) =>{
    let range = `${req.params.id}` 
    let id= range.substring(1);
    let sql = `SELECT * FROM \`Ordenes\` natural join \`Item\` natural join \`Products\` WHERE order_id = ${id}`;
    console.log(sql)
    
    let query = db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result)
        res.send(result);
    });
});


 app.get('/getshippingaddress/:id', (req, res) =>{
    let range = `${req.params.id}` 
    console.log(range[1])
    let sql = `SELECT * FROM \`Shipping_Address\` WHERE active_shipping = 1 AND user_id = '${range[1]}'`;
    let query = db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result)
        res.send(result);
    });
});


app.post('/postshippingaddress',function(req,res){

    products = req.body
    //console.log(products)
     var sql = 'INSERT INTO Shipping_Address SET ?';
                let query = db.query(sql,products,(err, result) =>{
                      if(err) throw err;
                      console.log(result);
             });
  });
 

  
  

app.listen(8080, function () {

 console.log('Listening on port 8080!')
})


