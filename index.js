var hsl = require('float-hsl2rgb')

// window.addEventListener("deviceorientation", handleOrientation, true)
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

var canvas = document.createElement('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
document.body.appendChild(canvas)

var ctx = canvas.getContext('2d')

var hue = Math.random()

setInterval(function () {
  var brightness = Math.sin(new Date().getTime() / 800) * 0.1 + 0.6
  var rgb = hsl([hue, 0.5, brightness]).map(function (v) { return Math.round(v * 255) })
  ctx.fillStyle = 'rgb(' + rgb.join(',') + ')'
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
}, 50)

function checkLose (force) {
  if (force > 10) {
    document.body.removeChild(canvas)
    var p = document.createElement('p')
    p.innerText = quotes[Math.round(Math.random() * quotes.length)]
    var rgb = hsl([hue, 0.5, 0.75]).map(function (v) { return Math.round(v * 255) })
    document.body.style.background = 'rgb(' + rgb.join(',') + ')'
    p.style.color = '#ffffff'
    p.style['font-size'] = '2em'
    document.body.appendChild(p)
  }
}

