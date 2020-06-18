var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var db = mongoose.connect("mongodb://localhost/swag-shop");

var Product = require("./model/product");
var WishList = require("./model/wishlist");

var cors = require("cors");
app.use(cors());

app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/product", function (request, res) {
  var product = new Product();
  product.title = request.body.title;
  product.price = request.body.price;
  product.save(function (err, savedProduct) {
    if (err) {
      res.status(500).send({ error: "Could not save product" });
    } else {
      res.status(200).send(savedProduct);
    }
  });
});

app.get("/product", function (request, response) {
  Product.find({}, function (err, products) {
    if (err) {
      response.status(500).send({ error: "Could not find" });
    } else {
      response.send(products);
    }
  });
});

app.get("/wishlist", function (request, response) {
  WishList.find({})
    .populate({ path: "products", model: "Product" })
    .exec(function (err, wishLists) {
      if (err) {
        response.status(500).send({ error: "Could not fetch Wishlist" });
      } else {
        response.status(200).send(wishLists);
      }
    });
});
app.get("/wishlist", function (request, response) {
  WishList.find({}, function (err, wishlist) {
    if (err) {
      response.status(500).send({ error: "Could not find" });
    } else {
      response.send(wishlist);
    }
  });
});
app.post("/wishlist", function (request, res) {
  var wishlist = new WishList();
  wishlist.title = request.body.title;
  wishlist.save(function (err, newWishlist) {
    if (err) {
      res.status(500).send({ error: "Could not create Wishlist" });
    } else {
      res.status(200).send(newWishlist);
    }
  });
});

app.put("/wishlist/product/add", function (request, response) {
  Product.findOne({ _id: request.body.productId }, function (err, product) {
    if (err) {
      response.status(500).send({ error: "Could not add item to wishlist" });
    } else {
      WishList.update(
        { _id: request.body.wishListId },
        { $addToSet: { products: product._id } },
        function (err, wishList) {
          if (err) {
            response
              .status(500)
              .send({ error: "Could not add item to wishlist" });
          } else {
            response.send(wishList);
          }
        }
      );
    }
  });
});
app.listen(3001, function () {
  console.log("Swag Shop API running on port 3001....");
});
