//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//

'use strict'
var http = require('http');
var path = require('path');

var serveStatic = require("serve-static")
var express = require('express');
var bodyParser=require("body-parser")
var lib=require("./primeImageGen")
var shuffle = require('shuffle-array')

var Telegram = require("node-telegram-bot-api")
var mongoose = require('mongoose');
mongoose.connect('mongodb://aruggiero16:726915casa@ds025180.mlab.com:25180/prankusers')

var Entry = mongoose.model('photos', { name:String, file_id: String });

//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var express = express();
var server = http.createServer(express);

express.use(serveStatic(path.resolve(__dirname, 'public')));


express.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://gruenbergersprimes-antonio-ruggiero.c9users.io:8081");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //res.header('Access-Control-Allow-Credentials',true);
  next();
});

express.use(bodyParser())

var token="264453332:AAFwdv2k6wsDRC2PMzyteEJ-kINJtGJwrfA"

var bot = new Telegram(token,{polling:true})


var doggo_ids=[]


class Photo{
  constructor(name,file_id){
    this.name=name
    this.file_id=file_id
  }
}

Entry.find({},function(err,photos){
  photos.forEach(function(elem){
    doggo_ids.push(new Photo(elem.name,elem.file_id))
  })
  //console.log(doggo_ids)
})


bot.onText(/\/getimage/,function(msg,match){
  bot.sendMessage(msg.chat.id,"Working....")
  //console.log(msg.chat)
  console.log("image requested by "+msg.from.id + "("+msg.from.first_name+")")
  setTimeout(function() {
  lib.imagefunctionsave(null,msg.from.id,function(filename){
    console.log("sending to client")
    console.log(filename)
    setTimeout(function(){
        bot.sendPhoto(msg.chat.id,filename,{caption:"hello world!"})
        console.log("image sended to "+msg.from.id + "("+msg.from.first_name+")")
    },500)
  })
  },100)
})


bot.on("photo",function (argument) {
  //console.log(argument)
  console.log("loading iamge by "+argument.from.id + "("+argument.from.first_name+")")
  doggo_ids.push(new Photo(argument.from.first_name,argument.photo[argument.photo.length-1].file_id))
  var kitty = new Entry({ name: argument.from.first_name,file_id: argument.photo[argument.photo.length-1].file_id });
  kitty.save().then(function (doc) {
  if (!doc) {
    console.log("errore");
  } else {
    console.log('meow');
  }
  });
  bot.sendMessage(argument.chat.id,"Saved!")
})


bot.onText(/\/showdoggo/,function(msg,match){
  console.log("image requested by "+msg.from.id + "("+msg.from.first_name+")")
  var filename="doggo.jpg"
  shuffle(doggo_ids)
  bot.sendPhoto(msg.chat.id,doggo_ids[0].file_id)
})

express.post("/genImage",function(req,res){
  console.log("plpplplplpppplp")
  console.log(req.body)
  res.end(lib.imagefunctionhtml(req.body))
})

express.get("/getdoggolink",function(req,res){
  shuffle(doggo_ids)
  bot.getFileLink(doggo_ids[0].file_id).then(function(link){
    res.end(link)
  })
})

server.listen(process.env.PORT || 8080, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});
