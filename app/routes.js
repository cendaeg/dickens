var Family = require('./models/family');
module.exports = function(app) {
  app.get('/api/family/:key', function(req, res) {
    Family.find({key: req.params.key}, function(err, families) {
      if (err)
        res.send(err);
      console.log(families);
      res.json(families);
    });
  })
  .post('/api/family', function(req, res, next) {
    if(req.body.new) {
      Family.findOne({key:req.body.key}, function(err, data) {
        if(data){
          var err = new Error();
          res.status(409);
          res.json({
            message: "Element Found!",
          });
        } else {
          var new_family = new Family({
            key: req.body.key,
            f_name1: req.body.f_name1,
            l_name1: req.body.l_name1,
            f_name2: req.body.f_name2,
            l_name2: req.body.l_name2,
            alt_adult: req.body.alt_adult,
            phone1: req.body.phone1,
            phone2: req.body.phone2,
            alt_phone: req.body.alt_phone,
            address: req.body.address,
            apt_lot_po: req.body.apt_lot_po,
            city: req.body.city,
            zip: +req.body.zip,
            rural: req.body.rural || false,
            approved: req.body.approved || false,
            toys: req.body.toys || false,
            certificate: req.body.certificate || false,
            food: +req.body.food,
            notes: req.body.notes,
            children: req.body.children,
            others: req.body.others
          });
          new_family.save(function(err) {
            if(err) {
              console.log(err);
              res.status(409);
              res.json({
                message: "Something went wrong!",
              });
            } else {
              console.log("Done!");
              res.status(200);
              res.json(new_family);
            }
          });
        }
      });
    } else if (req.body.edit) {
      Family.findOne({key:req.body.key}, function(err, data) {
        if(!err) {
          console.log(req.body);
          data.key = req.body.key;
          data.f_name1 = req.body.f_name1;
          data.l_name1 = req.body.l_name1;
          data.f_name2 = req.body.f_name2;
          data.l_name2 = req.body.l_name2;
          data.alt_adult = req.body.alt_adult;
          data.phone1 = req.body.phone1;
          data.phone2 = req.body.phone2;
          data.alt_phone = req.body.alt_phone;
          data.address = req.body.address;
          data.apt_lot_po = req.body.apt_lot_po;
          data.city = req.body.city;
          data.zip = +req.body.zip;
          data.rural = req.body.rural || false;
          data.approved = req.body.approved || false;
          data.toys = req.body.toys || false;
          data.certificate = req.body.certificate || false;
          data.food = +req.body.food;
          data.notes = req.body.notes;
          data.children = req.body.children;
          data.others = req.body.others;
          data.save(function(err) {
            if(err) {
              console.log(err);
              res.status(409);
              res.json({
                message: "Something went wrong!",
              });
            } else {
              console.log("Done!");
              res.status(200);
              res.json(data);
            }
          });
        }
      });
    }
  })
  .get('/api/family', function(req, res) {
    Family.find(function(err, families) {
      if (err)
        res.send(err);
      res.json(families);
    });
  })
  .delete('/api/family/:key', function(req, res) {
    Family.findOneAndRemove({key: req.params.key}, function(err, family) {
      if (err)
        res.send(err);
      res.json({done: true});
    });
  })
  .get('/api/children', function(req, res) {
    Family.find({}, function(err, families) {
      if (err)
        res.send(err);
      var children = [];
      for(var i=0;i<families.length;i++) {
        for(var j=0;j<families[i].children.length;j++) {
          children.push(families[i].children[j]);
        }
      }
      res.json(children);
    });
  })
  .get('/masterlist.csv', function(req, res) {
    Family.find(function(err, families) {
      var arr = "Key, First Name 1, Last Name 1, First Name 2, Last Name 2,  Phone, Alt. Phone, Address, City, Zip, Approved, Rural, Food For, Notes, Date Added\n";
      for(var i=0;i<families.length;i++) {
        arr+=families[i].key+","+families[i].f_name1+","+families[i].l_name1+","+(families[i].f_name2?families[i].f_name2:"")+","+(families[i].l_name2?families[i].l_name2:"")+","+families[i].phone1+(families[i].phone2?" ("+families[i].phone2+")":"")+","+families[i].alt_phone+","+families[i].address+" "+(families[i].apt_lot_po?families[i].apt_lot_po:"")+","+families[i].city+","+families[i].zip+","+(families[i].approved?"Yes":"No")+","+(families[i].rural?"Yes":"No")+","+families[i].food+",\""+(families[i].notes?families[i].notes.replace(/(\r\n|\n|\r)/gm,""):"")+"\","+families[i].added+"\n";
      }
      res.send(new Buffer(arr));
    });
  })
  .get('/childlist.csv', function(req, res) {
    Family.find({}, function(err, families) {
      if (err)
        res.send(err);
      var arr = "Key, Name, Age, Gender, School, Shirt, Notes, Date Added\n";
      for(var i=0;i<families.length;i++) {
        for(var j=0;j<families[i].children.length;j++) {
          var child = families[i].children[j];
          arr+=families[i].key+","+child.name+","+child.age+","+child.gender+","+child.school+","+child.shirt_size+","+(child.notes||"").replace(/(\r\n|\n|\r)/gm,"")+","+families[i].added+"\n";
        }
      }
      res.send(new Buffer(arr));
    });
  })
  .get('/settings', function(req, res) {
    var settings = require('../config/settings');
    var config = settings.get("public");
    res.send(config);
  })
  .post('/settings', function(req, res) {
    var new_settings = req.body;
    var settings = require('../config/settings');
    settings.set("public", new_settings);
    var config = settings.get("public");
    res.send(config);
  })
};

