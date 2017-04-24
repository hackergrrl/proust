var hsl = require('float-hsl2rgb')

window.addEventListener("deviceorientation", handleOrientation, true)

var prevOrientation = null
function handleOrientation (event) {
  var absolute = event.absolute
  var roll     = event.alpha
  var pitch    = event.beta
  var yaw      = event.gamma

  // Convert to relative
  if (absolute) {
    if (!prevOrientation) {
      roll = pitch = yaw = 0
    } else {
      roll = roll - prevOrientation[0]
      pitch = pitch - prevOrientation[1]
      yaw = yaw - prevOrientation[2]
    }
    prevOrientation = [roll, pitch, yaw]
  }

  console.log(absolute, roll, pitch, yaw)
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
