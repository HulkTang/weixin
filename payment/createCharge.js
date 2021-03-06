'use strict';
// Ping++ Server SDK
var orderController = require('../controller/orderController');

var API_KEY = "sk_test_rDa1e5env5aPqPqHC8v1azv9";
var APP_ID = "app_8en54GC0iHmH1ajL";

var crypto = require('crypto');
var pingpp = require('pingpp')(API_KEY);

exports.createNew = function (req,res,next) 
{
  pingpp.parseHeaders(req.headers); // 把从客户端传上来的 Headers 传到这里
  // 设置你的私钥路径，用于请求的签名，对应的公钥请填写到 Ping++ 管理平台
  pingpp.setPrivateKeyPath(__dirname + "/your_rsa_private_key.pem");
  req.setEncoding('utf-8');
  var data = req.body;
  data.open_id = req.session.openid || '123';
  console.log('session id ' + req.session.openid);
  var channel = data.channel;
  var openid = data.open_id;
  var amount = data.amount;
  //var client_ip = req.connection.remoteAddress;
  var client_ip = '127.0.0.1';
  var extra = {};
  switch (channel) {
    case 'alipay_wap':
      extra = {
        'success_url': 'http://mddm.qiancs.cn',
        'cancel_url': 'http://mddm.qiancs.cn'
      };
      break;
    case 'wx_pub':
      extra = {
        'open_id': openid
      };
      break;
  }

  orderController.createOrderInfoNew(data,function(err,order_id){
      if(err){
	    console.log('err' + err);
        res.end();
        return;
      }
      pingpp.charges.create({
      order_no:  order_id,
      app:       {id: APP_ID},
      channel:   channel,
      amount:    amount,
      client_ip: client_ip,
      currency:  "cny",
      subject:   "Charge Subject",
      body:      "Charge Body",
      extra:     extra
      }, function(err,charge){
      if(err){
        console.log("生成charge失败" + err);
        res.end();
        return;
      }
      console.log('生成charge成功');
      res.send(charge);
      res.end();
    });
  });  
              
}

exports.create = function (req,res,next) 
{
  
  pingpp.parseHeaders(req.headers); // 把从客户端传上来的 Headers 传到这里
  // 设置你的私钥路径，用于请求的签名，对应的公钥请填写到 Ping++ 管理平台
  pingpp.setPrivateKeyPath(__dirname + "/your_rsa_private_key.pem");
  req.setEncoding('utf-8');
  var data = req.body;
  data.open_id = req.session.openid || '123';
  console.log('session id ' + req.session.openid);
  var channel = data.channel;
  var openid = data.open_id;
  var amount = data.amount;
  var client_ip = req.connection.remoteAddress;
  var extra = {};
  switch (channel) {
    case 'alipay_wap':
      extra = {
        'success_url': 'http://wechat.qiancs.cn',
        'cancel_url': 'http://wechat.qiancs.cn'
      };
      break;
    case 'wx_pub':
      extra = {
        'open_id': openid
      };
      break;
  }

  orderController.createOrderInfo(data,function(err,order_id){
      if(err){
	console.log('err' + err);
        res.end();
        return;
      }
      pingpp.charges.create({
      order_no:  order_id,
      app:       {id: APP_ID},
      channel:   channel,
      amount:    amount,
      client_ip: client_ip,
      currency:  "cny",
      subject:   "Charge Subject",
      body:      "Charge Body",
      extra:     extra
      }, function(err,charge){
      if(err){
        console.log("生成charge失败" + err);
        res.end();
        return;
      }
      console.log('生成charge成功');
      res.send(charge);
      res.end();
    });
  });  
              
}

exports.createForUnfinishedOrder = function (req,res,next)
{

    pingpp.parseHeaders(req.headers);
    pingpp.setPrivateKeyPath(__dirname + "/your_rsa_private_key.pem");
    req.setEncoding('utf-8');
    var data = req.body;
    data.open_id = req.session.openid ||123;
    console.log('session id ' + req.session.openid);
    var order_id = data.order_id;
    var channel = data.channel;
    var openid = data.open_id;
    var amount = data.amount;
    var client_ip = req.connection.remoteAddress;
    var extra = {};
    switch (channel) {
        case 'alipay_wap':
            extra = {
                'success_url': 'http://wechat.qiancs.cn',
                'cancel_url': 'http://wechat.qiancs.cn'
            };
            break;
        case 'wx_pub':
            extra = {
                'open_id': openid
            };
            break;
    }

        pingpp.charges.create({
            order_no:  order_id,
            app:       {id: APP_ID},
            channel:   channel,
            amount:    amount,
            client_ip: client_ip,
            currency:  "cny",
            subject:   "Charge Subject",
            body:      "Charge Body",
            extra:     extra
        }, function(err,charge){
            if(err){
                console.log("生成charge失败" + err);
                res.end();
                return;
            }
            console.log('生成charge成功');
            res.send(charge);
            res.end();
        });


}
