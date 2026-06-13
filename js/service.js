function getImgs(filter = '') {
  const savedImgs = getSavedMemes()
  console.log('sadg', savedImgs)
  const collectionImgs = [
    { id: 1, url: 'meme-imgs/2.jpg', keywords: ['funny', 'classic', 'meme'] },
    { id: 2, url: 'meme-imgs/5.jpg', keywords: ['funny', 'reaction', 'meme'] },
    { id: 3, url: 'meme-imgs/8.jpg', keywords: ['funny', 'classic', 'meme'] },
    { id: 4, url: 'meme-imgs/9.jpg', keywords: ['funny', 'reaction', 'meme'] },
    { id: 5, url: 'meme-imgs/12.jpg', keywords: ['funny', 'classic', 'meme'] },
    { id: 6, url: 'meme-imgs/19.jpg', keywords: ['funny', 'reaction', 'meme'] },
    { id: 7, url: 'meme-imgs/003.jpg', keywords: ['funny', 'meme', 'classic'] },
    {
      id: 8,
      url: 'meme-imgs/004.jpg',
      keywords: ['funny', 'meme', 'reaction'],
    },
    { id: 9, url: 'meme-imgs/005.jpg', keywords: ['funny', 'meme', 'classic'] },
    {
      id: 10,
      url: 'meme-imgs/006.jpg',
      keywords: ['funny', 'meme', 'reaction'],
    },
    {
      id: 11,
      url: 'meme-imgs/img2.jpg',
      keywords: ['funny', 'classic', 'meme'],
    },
    {
      id: 12,
      url: 'meme-imgs/img4.jpg',
      keywords: ['funny', 'reaction', 'meme'],
    },
    {
      id: 13,
      url: 'meme-imgs/img5.jpg',
      keywords: ['funny', 'classic', 'meme'],
    },
    {
      id: 14,
      url: 'meme-imgs/img6.jpg',
      keywords: ['funny', 'reaction', 'meme'],
    },
    {
      id: 15,
      url: 'meme-imgs/img11.jpg',
      keywords: ['funny', 'classic', 'meme'],
    },
    {
      id: 16,
      url: 'meme-imgs/img12.jpg',
      keywords: ['funny', 'reaction', 'meme'],
    },
    {
      id: 17,
      url: 'meme-imgs/meme1.jpg',
      keywords: ['funny', 'classic', 'meme'],
    },
    {
      id: 18,
      url: 'meme-imgs/Ancient-Aliens.jpg',
      keywords: ['aliens', 'conspiracy', 'classic'],
    },
    {
      id: 19,
      url: 'meme-imgs/One-Does-Not-Simply.jpg',
      keywords: ['lotr', 'classic', 'boromir'],
    },
    {
      id: 20,
      url: 'meme-imgs/Oprah-You-Get-A.jpg',
      keywords: ['oprah', 'classic', 'funny'],
    },
    {
      id: 21,
      url: 'meme-imgs/X-Everywhere.jpg',
      keywords: ['buzz', 'everywhere', 'classic'],
    },
    {
      id: 22,
      url: 'meme-imgs/drevil.jpg',
      keywords: ['evil', 'classic', 'funny'],
    },
    {
      id: 23,
      url: 'meme-imgs/leo.jpg',
      keywords: ['leo', 'smile', 'classic'],
    },
    {
      id: 24,
      url: 'meme-imgs/patrick.jpg',
      keywords: ['patrick', 'spongebob', 'funny'],
    },
    {
      id: 25,
      url: 'meme-imgs/putin.jpg',
      keywords: ['putin', 'political', 'funny'],
    },
    ...savedImgs,
  ]

  const filterdImgs = filter
    ? collectionImgs.filter((i) => i.keywords?.includes(filter))
    : collectionImgs
  return filterdImgs
}

function getCommonSerch() {
  // const common = ['saved', 'putin', 'funny', 'classic', ...gCommonSerch]
  return [...new Set(['saved', 'putin', 'funny', 'classic', ...gCommonSerch])]

  // return common
}

function saveMemeToDb(meme, canvasDataUrl) {
  const saved = getSavedMemes()
  saved.push({ meme, img: canvasDataUrl, savedAt: Date.now() })
  localStorage.setItem('savedMemes', JSON.stringify(saved))
}
function deleteMemeToDb(imgUrl) {
  console.log(imgUrl)

  const saved = getSavedMemes()
  const selectedImg = saved.filter((i) => i.name !== String(imgUrl))

  console.log(saved, 'saved', selectedImg)

  localStorage.setItem('savedMemes', JSON.stringify(selectedImg))
  setFilter()
}

function getSavedMemes() {
  return JSON.parse(localStorage.getItem('savedMemes') || '[]')
}
