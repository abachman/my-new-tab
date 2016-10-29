// Image handling

const imageFit = function (w1, h1, w2, h2) {
  // console.log('fit', {w: w1, h:h1}, 'into', {w: w2, h: h2})

  let wscale = 1, hscale = 1;

  if (w1 >= w2) {
    // scale for a snug width
    wscale = w2 / w1
  }

  if (h1 >= h2) {
    // scale for a snug height
    hscale = h2 / h1
  }

  // choose smallest scale
  var scale = hscale < wscale ? hscale : wscale;
  // console.log('constrain, chose scale', scale)

  let w3 = w1 * scale
  let h3 = h1 * scale

  // center new rect in w2
  let x3 = (w2 / 2.0) - (w3 / 2.0)
  let y3 = (h2 / 2.0) - (h3 / 2.0)

  var measure = {
    // offsets
    ox: x3,
    oy: y3,
    // sizes
    width: w3,
    height: h3
  }
  // console.log('final measure', measure)

  return measure
}

const setImageOnCanvas = function (canvas, dataUrl) {
  var img = new Image()
  img.onload = function(){
    var ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // fit centered within the canvas having the appropriate aspect ratio
    var newSize = imageFit(img.width, img.height, canvas.width, canvas.height)

    // console.log('fit image', {width: img.width, height: img.height}, 'with size', newSize)
    ctx.drawImage(img, newSize.ox, newSize.oy, newSize.width, newSize.height) // destination rectangle

    // console.log('[ImageUploadToCanvas] store', canvas.toDataURL())
  }
  img.src = dataUrl
}

const uploadImage = function (target, callback) {
  var reader = new FileReader()
  // display file when it finishes loading
  reader.onload = function(event){
    callback(event.target.result)
  }
  reader.readAsDataURL(target.files[0])
}

export { setImageOnCanvas, uploadImage }

