'use strict'

var gImgs = getImgs()
var gCommonSerch = []
var gMeme = {
  selectedImgId: 0,
  selectedLineIdx: 0,
  selectedType: 'lines',
  lines: [],
  svgs: [],
}
function setFilter(f) {
  gCommonSerch.push(f)

  gImgs = getImgs(f)
  initGalery()
  initCommonSerch()
}
function onImgSelect(imgId) {
  gMeme.selectedImgId = imgId
  renderMeme()
}

function getMeme() {
  return lines
}

function oninit() {
  initGalery()
  initSvg()
  initCommonSerch()
}

function viewImg(img) {
  gMeme.selectedImgId = img
  openModalImg()
  console.log(img)
}

function closeModal() {
  const modal = document.querySelector('.backdrop-modal')

  modal.style.opacity = 0
  modal.style.zIndex = -10
}

function openModalImg() {
  const modal = document.querySelector('.backdrop-modal')
  const img = document.querySelector('.imgShow')
  const imgObj = gImgs.find((i) => i.id === gMeme.selectedImgId)

  img.src = imgObj.src
  modal.style.opacity = 1
  modal.style.zIndex = 1
  console.log(img.src, 'asdgi', imgObj.url)
  return
}

function initGalery() {
  const galeryDiv = document.querySelector('.galery')
  let htmlInner = ''
  for (let i = 0; i < gImgs.length; i++) {
    const img = gImgs[i]
    const ff = `<div class="galery-img"><img src="${img.url}" alt="תמונה" class='img img-${img.id} img-galery' data-id="${img.id}">
   <div class="action-img">

   <button class="button-img" onclick="onImgSelect(${img.id})"><i class="fa-solid fa-pencil"></i></button>
   <button class="button-img"><i class="fa-solid fa-eye" onclick="viewImg(${img.id})"></i></button>
    <a href="${img.url}" download><button class="button-img"><i class="fa-solid fa-download"></i></button></a>
  ${
    img.keywords?.includes('saved')
      ? `<button class='button-img'  onclick="deleteMemeToDb(${img.name})">
<i class="fa-solid fa-circle-minus"></i>     </button>`
      : ''
  }
   </div>
</div>`
    htmlInner += ff
  }

  galeryDiv.innerHTML = htmlInner
}

function initSvg() {
  const svgsDiv = document.querySelector('.select-svg')
  let htmlInner = ''
  for (let i = 0; i < gImgs.length; i++) {
    const img = gImgs[i]
    const ff = `<div class="galery-svg" onclick="onSvgSelect(${img.id})">
    <img src="${img.url}" alt="svg" class='imgSVG imgSVG-${img.id} '></div>
    <div class="action-img">
    <button class="button-img" ><i class="fa-solid fa-add"></i></button>
    </div>
    `
    htmlInner += ff
  }

  svgsDiv.innerHTML += htmlInner
}

function initCommonSerch() {
  const commonSerchDiv = document.querySelector('.common-serch')
  let htmlInner = ''

  const commonSr = getCommonSerch()
  for (let i = 0; i < commonSr.length; i++) {
    const comSerch = commonSr[i]
    const ff = `<span class="comSerch" onclick="setFilter('${comSerch}')">${comSerch}</span>
    `
    htmlInner += ff
  }

  commonSerchDiv.innerHTML = htmlInner
}
