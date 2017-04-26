#!/usr/bin/env node

var browserify = require('browserify')
var fs = require('fs')
var brfs = require('brfs')
var path = require('path')
var http = require('http')
var ip = require('node-localip')


var b = browserify({ transform: [brfs] })
b.add(path.join(__dirname, 'index.js'))
var p = b.bundle().pipe(fs.createWriteStream(path.join(__dirname, 'bundle.js')))

var server = http.createServer(function (req, res) {
  if (/bundle.js/.test(req.url)) return fs.createReadStream(path.join(__dirname, 'bundle.js')).pipe(res)
  else return fs.createReadStream(path.join(__dirname, 'index.html')).pipe(res)
})

server.listen(7000, function () {
  ip(function (err, ip) {
    if (err) return console.error(err)
    console.log('http://' + ip + ':' + server.address().port)
  })
})
