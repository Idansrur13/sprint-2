var gElCanvas
var gCtx
var gIsMouseDown
function renderMeme() {
  const editorDiv = document.querySelector('.editor')
  editorDiv.style.display = 'flex'

  const imgObj = gImgs.find((i) => i.id === gMeme.selectedImgId)

  const ff = `<div class="editor-div">
  <div class="action-editor">
  <p>

                  <canvas class="main-canvas"></canvas>

   <div>
   <input value="ggg" />
   <div class="editor-settings">


   <button class="button-img"><i class="fa-solid fa-plus"></i></button>
   <button class="button-img"><i class="fa-solid fa-minus"></i></button>
   <button class="button-img"><i class="fa-solid fa-text-height"></i></button>
   <button class="button-img"><i class="fa-solid fa-align-center"></i></button>
   <button class="button-img"><i class="fa-solid fa-align-justify"></i></button>
   <button class="button-img"><i class="fa-solid fa-align-left"></i></button>
   <button class="button-img"><i class="fa-solid fa-align-right"></i></button>
   <button class="button-img" onclick="changeColor()"><i class="fa-solid fa-fill-drip" ></i></button>
    <a href="${imgObj.url}" download><button class="button-img"><i class="fa-solid fa-download"></i></button></a>
    </div>
   </div>
   </div>
</div>`

  editorDiv.innerHTML = ff
  getCanvas(imgObj)
  addLissener()
}

function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container')
  gElCanvas.width = elContainer.clientWidth
}

function addLissener() {
  addMoushLisener()
}

function addMoushLisener() {
  gElCanvas.addEventListener('mousedown', onDown)
  gElCanvas.addEventListener('mousemove', onMove)
  gElCanvas.addEventListener('mouseup', onUp)
}

function onDown(ev) {
  const pos = getEvPos(ev)
  console.log('sdfg', pos)
  console.log('canvas size:', gElCanvas.width, gElCanvas.height)
  console.log('canvas CSS size:', gElCanvas.clientWidth, gElCanvas.clientHeight)
  addText(pos.x, pos.y)
}

function getEvPos(ev) {
  const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

  let pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }

  if (TOUCH_EVS.includes(ev.type)) {
    ev.preventDefault()
    ev = ev.changedTouches[0]
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    }
  }
  return pos
}

function onMove(ev) {
  if (!gIsMouseDown) return
  const pos = getEvPos(ev)
  addText(pos.x, pos.y)
  gStartPos = pos
}

function addText(x, y) {
  const inputText = document.querySelector('input')
  const line = gMeme.lines[gMeme.selectedLineIdx]
  //   const line = { txt: 'asdg', size: 20, color: '#000f4' }
  gCtx.font = `${line.size || 30}px Arial`
  gCtx.fillStyle = line.color || 'black'
  gCtx.fillText(line.txt, x, y)

  inputText.value = line.txt
  inputText.addEventListener('input', onTextChange)
  //   gMeme.lines.push(line)
}

function onTextChange(ev) {
  console.log('sdg', gMeme.lines)
  gMeme.lines[gMeme.selectedLineIdx].txt = ev.target.value
  //   renderMeme()
}

function onUp() {
  gIsMouseDown = false
}

function getCanvas(imgObj) {
  gElCanvas = document.querySelector('.main-canvas')
  gElCanvas.width = 400
  gElCanvas.height = 400
  gCtx = gElCanvas.getContext('2d')
  const img = new Image()

  img.src = imgObj.url

  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
  }
}
