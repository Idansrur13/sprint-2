var gElCanvas
var gCtx
var gIsMouseDown
function renderMeme() {
  const editorDiv = document.querySelector('.editor')
  const galeryDiv = document.querySelector('.galery')
  const backButton = document.querySelector('.back-button')

  editorDiv.style.display = 'flex'
  backButton.style.display = 'flex'

  galeryDiv.style.display = 'none'

  const imgObj = gImgs.find((i) => i.id === gMeme.selectedImgId)

  getCanvas(imgObj)
  addLissener()
}

function closeEditor() {
  const editorDiv = document.querySelector('.editor')
  const galeryDiv = document.querySelector('.galery')
  const backButton = document.querySelector('.back-button')
  setFilter('')

  editorDiv.style.display = 'none'
  backButton.style.display = 'none'
  galeryDiv.style.display = 'flex'

  gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [],
    svgs: [],
  }
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

  if (clickedIdx !== false) {
    gMeme.selectedLineIdx = clickedIdx
    gIsMouseDown = true
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
      gMeme.selectedType = 'lines'
      return i
    }
  }
  for (let i = 0; i < gMeme.svgs.length; i++) {
    const svg = gMeme.svgs[i]

    if (
      x > svg.x &&
      x < svg.x + svg.size &&
      y > svg.y &&
      y < svg.y + svg.size
    ) {
      gMeme.selectedType = 'svgs'
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
  // addText(pos.x, pos.y)
  // gStartPos = pos
  const currentLine = gMeme.lines[gMeme.selectedLineIdx]
  currentLine.x = pos.x
  currentLine.y = pos.y
  drawMeme()
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
  gCtx = gElCanvas.getContext('2d')
  if (imgObj) {
    const img = new Image()

    img.src = imgObj.url

    img.onload = () => {
      const ratio = img.naturalHeight / img.naturalWidth
      gElCanvas.width = 400
      gElCanvas.height = 400 * ratio
      gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }
  }
}

// ______________ controlersssss_______

function setPlusLine(x = 200, y = 100) {
  const newLine = { txt: 'הקלד כאן..', size: 30, color: '#000f4', x, y }
  gMeme.lines.push(newLine)
  gMeme.selectedLineIdx = gMeme.lines.length - 1
  gCtx.font = `${newLine.size || 30}px Arial`
  gCtx.fillStyle = newLine.color || 'black'
  gCtx.fillText(newLine.txt, x, y)
  drawMeme()

  return
}
function setMinusLine() {
  gMeme.lines.splice(gMeme.selectedLineIdx, 1)
  drawMeme()

  return
}
function setGoTextUp() {
  if (gMeme.selectedType === 'lines') {
    const currentLine = gMeme.lines[gMeme.selectedLineIdx]
    currentLine.y -= 20
  } else {
    const currentLine = gMeme.svgs[gMeme.selectedLineIdx]
    currentLine.y -= 20
  }
  drawMeme()

  return
}
function setTextBold() {
  const textWidth = gCtx.measureText(selectedLine.txt).width
  textWidth.return
}
function setGoTextRight() {
  const currentLine = gMeme.lines[gMeme.selectedLineIdx]
  currentLine.x += 20
  drawMeme()
  return
}
function setGoTextLeft() {
  const currentLine = gMeme.lines[gMeme.selectedLineIdx]
  currentLine.x -= 20
  drawMeme()
  return
}
function setGoTextDown() {
  const currentLine = gMeme.lines[gMeme.selectedLineIdx]
  currentLine.y += 20
  drawMeme()
  return
}

function setNextLine() {
  if (gMeme.selectedLineIdx === gMeme.lines.length - 1) {
    gMeme.selectedLineIdx = 0
  } else {
    gMeme.selectedLineIdx = gMeme.selectedLineIdx + 1
  }
  document.querySelector('.inputText').value =
    gMeme.lines[gMeme.selectedLineIdx].txt
  drawMeme()

  return
}
function setPrevLine() {
  if (gMeme.selectedLineIdx === 0) {
    gMeme.selectedLineIdx = gMeme.lines.length - 1
  } else {
    gMeme.selectedLineIdx = gMeme.selectedLineIdx - 1
  }
  document.querySelector('.inputText').value =
    gMeme.lines[gMeme.selectedLineIdx].txt
  drawMeme()
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

function changeSizeText(val) {
  gMeme.lines[gMeme.selectedLineIdx].size = val
  drawMeme()

  return
}

function downloadMeme() {
  const link = document.createElement('a')
  link.download = 'meme.png'
  link.href = gElCanvas.toDataURL()
  link.click()
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

    gMeme.svgs.forEach((svgs) => {
      const img = new Image()
      img.src = svgs.url
      img.onload = () => {
        gCtx.drawImage(img, svgs.x, svgs.y, svgs.size, svgs.size)
      }
    })

    const selectedLine = gMeme.lines[gMeme.selectedLineIdx]
    if (selectedLine) {
      const textWidth = gCtx.measureText(selectedLine.txt).width
      gCtx.strokeStyle = '#84cb7da4'
      gCtx.lineWidth = 1
      gCtx.strokeRect(
        selectedLine.x - textWidth,
        selectedLine.y - selectedLine.size,
        textWidth + 4,
        selectedLine.size,
      )
    }
  }
}

function saveMemeToDb() {
  const canvasDataUrl = gElCanvas.toDataURL()
  saveMeme(gMeme, canvasDataUrl)
}

function saveMeme(meme, canvasDataUrl) {
  const saved = getSavedMemes()
  saved.push({
    meme: JSON.parse(JSON.stringify(meme)),
    url: canvasDataUrl,
    keywords: ['saved'],
    name: Date.now().toString(),
  })
  localStorage.setItem('savedMemes', JSON.stringify(saved))
}

function onSvgSelect(imgId) {
  const imgObj = gImgs.find((i) => i.id === imgId)
  console.log('hiiii')
  const svg = new Image()
  svg.src = imgObj.url

  // svg.onload = () => {
  //   gCtx.drawImage(svg, 30, 30, gElCanvas.width, gElCanvas.height)
  // }
  gMeme.svgs.push({ url: imgObj.url, x: 50, y: 50, size: 80 })
  drawMeme()
}
