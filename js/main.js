'use strict'
const gImgs = getImgs()
const gMeme = {
  selectedImgId: 0,
  selectedLineIdx: 0,
  lines: [],
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
}

function initGalery() {
  const galeryDiv = document.querySelector('.galery')
  let htmlInner = ''
  for (let i = 0; i < gImgs.length; i++) {
    const img = gImgs[i]
    const ff = `<div class="galery-img"><img src="${img.url}" alt="תמונה" class='img-${img.id} img-galery' data-id="${img.id}">
   <div class="action-img">

   <button class="button-img" onclick="onImgSelect(${img.id})"><i class="fa-solid fa-pencil"></i></button>
   <button class="button-img"><i class="fa-solid fa-eye"></i></button>
    <a href="${img.url}" download><button class="button-img"><i class="fa-solid fa-download"></i></button></a>
   </div>
</div>`
    htmlInner += ff
  }

  galeryDiv.innerHTML += htmlInner
}
