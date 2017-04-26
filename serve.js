#!/usr/bin/env node

var browserify = require('browserify')
var fs = require('fs')

var b = browserify({ transform: ['brfs'] })
b.add('./index.js')
b.bundle().pipe(fs.createWriteStream('./bundle.js'))
