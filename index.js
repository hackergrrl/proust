window.addEventListener("deviceorientation", handleOrientation, true)

function handleOrientation (event) {
  var absolute = event.absolute
  var alpha    = event.alpha
  var beta     = event.beta
  var gamma    = event.gamma

  // ...
}

document.body.style.margin = 0
document.body.style.overflow = 'hidden'

var canvas = document.createElement('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
document.body.appendChild(canvas)

var ctx = canvas.getContext('2d')
ctx.fillStyle = 'pink'
ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
