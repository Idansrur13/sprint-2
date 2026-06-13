var gElCanvas
var gCtx
var gIsMouseDown
function renderMeme() {
  const editorDiv = document.querySelector('.editor')
  const galeryDiv = document.querySelector('.galery')

  editorDiv.style.display = 'flex'
  galeryDiv.style.display = 'none'

  const imgObj = gImgs.find((i) => i.id === gMeme.selectedImgId)

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
  const clickedIdx = checkClick(pos.x, pos.y)
  console.log('hihi', clickedIdx)
  if (clickedIdx) {
    gMeme.selectedLineIdx = clickedIdx
    return
  }
  addText(pos.x, pos.y)
}

function checkClick(x, y) {
  for (let i = 0; i < gMeme.lines.length; i++) {
    const line = gMeme.lines[i]

    const textWidth = gCtx.measureText(line.txt).width

    if (
      x > line.x - textWidth / 2 &&
      x < line.x + textWidth / 2 &&
      y > line.y - line.size &&
      y < line.y
    ) {
      return i
    }
  }
  return false
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
  // const inputText = document.querySelector('input')
  // const line = gMeme.lines[gMeme.selectedLineIdx]
  //   const line = { txt: 'asdg', size: 20, color: '#000f4' }
  // gCtx.font = `${line.size || 30}px Arial`
  // gCtx.fillStyle = line.color || 'black'

  // inputText.value = line.txt
  // inputText.addEventListener('input', onTextChange)
  //   gMeme.lines.push(line)
  setPlusLine(x, y)
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

// ______________ controlersssss_______

function setPlusLine(x, y) {
  const newLine = { txt: 'הקלד כאן..', size: 30, color: '#000f4', x, y }
  gMeme.lines.push(newLine)
  gMeme.selectedLineIdx = gMeme.lines.length - 1
  gCtx.font = `${newLine.size || 30}px Arial`
  gCtx.fillStyle = newLine.color || 'black'
  gCtx.fillText(newLine.txt, x, y)

  return
}
function setMinusLine() {
  gMeme.lines.splice(gMeme.selectedLineIdx, 1)

  return
}
function setAlingSpreed() {
  return
}
function setAlingCenter() {
  return
}
function setTextHight() {
  return
}
function setAlingLeft() {
  const currentLine = gMeme.lines[gMeme.selectedLineIdx]

  return
}
function setAlingRight() {
  return
}
function changeText(e) {
  if (!e) return

  gMeme.lines[gMeme.selectedLineIdx].txt = e
  drawMeme()
}
function changeColorText(e) {
  if (!e) return

  const currentLine = gMeme.lines[gMeme.selectedLineIdx]

  currentLine.color = e
  drawMeme()

  return
}

function drawMeme() {
  const imgObj = gImgs.find((i) => i.id === gMeme.selectedImgId)
  const img = new Image()
  img.src = imgObj.url

  img.onload = () => {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

    gMeme.lines.forEach((line) => {
      gCtx.font = `${line.size}px Arial`
      gCtx.fillStyle = line.color
      gCtx.fillText(line.txt, line.x, line.y)
    })
  }
  console.log('asdg', gMeme)
}
