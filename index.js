var hsl = require('float-hsl2rgb')

var quotes = require('fs').readFileSync('./quotes.txt', 'utf8').split('\n')

var loseSfx = document.createElement('audio')
document.body.appendChild(loseSfx)
loseSfx.src = require('./lose_sfx')

window.addEventListener('devicemotion', handleOrientation, true)

var prevOrientation = null

function handleOrientation (event) {
  var absolute = event.absolute
  var x    = event.acceleration.x
  var y    = event.acceleration.y
  var z    = event.acceleration.z

  var dist = Math.sqrt(x*x + y*y + z*z)

  checkLose(dist)
}

document.body.style.margin = 0
document.body.style.overflow = 'hidden'

var quote
var canvas
var ctx
var hue

function init () {
  if (quote) {
    document.body.removeChild(quote)
    quote = null
  }

  canvas = document.createElement('canvas')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  document.body.appendChild(canvas)
  ctx = canvas.getContext('2d')
  hue = Math.random()
}

setInterval(function () {
  if (!canvas) return

  var brightness = Math.sin(new Date().getTime() / 800) * 0.1 + 0.6
  var rgb = hsl([hue, 0.5, brightness]).map(function (v) { return Math.round(v * 255) })
  ctx.fillStyle = 'rgb(' + rgb.join(',') + ')'
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
}, 50)

function checkLose (force) {
  if (force > 10) {
    document.body.removeChild(canvas)
    canvas = null

    var rgb = hsl([hue, 0.5, 0.75]).map(function (v) { return Math.round(v * 255) })
    document.body.style.background = 'rgb(' + rgb.join(',') + ')'

    quote = document.createElement('quote')
    quote.innerText = quotes[Math.round(Math.random() * quotes.length)]
    quote.style.color = '#ffffff'
    quote.style['font-size'] = '4em'
    document.body.appendChild(quote)

    document.onclick = init

    loseSfx.play()
  }
}

init()
