let container = document.querySelector('#container')
const liens = []
let previus = document.querySelector('#previus')
let btnPrevius = document.querySelector('.btn-previus')
let description = document.querySelector('#description')
let sx = []
let lengthTab1 = 0
async function fetchImagesFromUl(url, ulId, acture = '') {


    liens.push(url)
    let lengthTab2 = liens.length

    if (lengthTab1 < lengthTab2) {
        lengthTab2 = 0
        lengthTab1 = 0
        sx.push(window.scrollY)
        window.scrollTo(0, 0)


    }
    if (liens.length >= 2) {
        btnPrevius.style.opacity = 1
        btnPrevius.style.position = 'relative'
    } else {
        btnPrevius.style.opacity = 0
        btnPrevius.style.position = 'absolute'
    }

    if (acture == '') {
        description.innerText = ''

    }
    const imgUrls = [];
    try {
        const response = await fetch(url);
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const ulElement = doc.querySelector(`ul.${ulId}`);
        if (!ulElement) {
            console.log(`No <ul> element with id "${ulId}" found.`);
            return;
        }
        const imgTags = ulElement.querySelectorAll('img');
        imgTags.forEach(img => {
            const imgUrl = img.getAttribute('data-src');
            const imgAlt = img.getAttribute('alt');
            const imgwidth = img.getAttribute('width');
            const imgheight = img.getAttribute('height');
            if (imgUrl && imgAlt) {
                let infoImg = {
                    src: imgUrl,
                    alt: imgAlt,
                    width: imgwidth,
                    height: imgheight,
                }
                imgUrls.push(infoImg);
            }
        });
        container.innerHTML = ''
        imgUrls.forEach(imgUrl => {
            let img = document.createElement('img');
            img.src = imgUrl.src
            img.alt = imgUrl.alt
            img.style.width = imgUrl.width + 'px'
            img.style.height = imgUrl.height + 'px'
            img.alt = imgUrl.alt
            img.classList = 'img'
            container.appendChild(img)
        });

        addEventListenerImage()
        if (lengthTab1 > lengthTab2) {
            lengthTab2 = 0
            lengthTab1 = 0
            window.scrollTo(0, sx[sx.length - 1])
            sx.splice(sx.length - 1, 1)

        }
    } catch (error) {
        console.error(`Failed to fetch the page: ${error}`);
    }
}
let categorie = ''
fetchImagesFromUl('https://www.pornpics.de/', 'wookmark-initialised');
let btns = document.querySelectorAll('.navbar-nav .btn')
let home = document.querySelector('#home')
btns.forEach(btn => {
    btn.addEventListener('click', () => {
        let content = btn.innerText;
        categorie = content
        fetchImagesFromUl(`https://www.pornpics.de/${content}/`, 'wookmark-initialised');
    })
})
home.addEventListener('click', () => {
    liens.splice(0, liens.length)
    categorie = ''
    fetchImagesFromUl(`https://www.pornpics.de/`, 'wookmark-initialised');
})
previus.addEventListener('click', () => {
    categorie = ''
    lengthTab1 = liens.length

    let index = liens.length - 2
    let Nurl = liens[index]
    liens.splice(index, 2)

    fetchImagesFromUl(Nurl, 'wookmark-initialised');
})

function addEventListenerImage() {
    setTimeout(function () {
        let imgs = document.querySelectorAll('img')
        imgs.forEach(img => {
            img.addEventListener('click', () => {
                let content = img.alt;
                mored(content, img.src)
            })
        })
    }, 1000)
}
function mored(alt, src) {
    let newAlt = alt.toLowerCase()
    if (categorie != '') {
        let idimg = src.split('/')[6]
        description.innerText = alt
        newAlt = newAlt.replace(/ /g, '-');
        newAlt = newAlt.replace(/,/g, '');
        let identifienrIMG = newAlt + '-' + idimg
        fetchImagesFromUl(`https://www.pornpics.de/galleries/${identifienrIMG}`, 'wookmark-initialised', 'acture');
    } else {
        let newalt = newAlt.split(' ')[0]
        categorie = newalt
        let url = `https://www.pornpics.de/${newalt}/`
        fetchImagesFromUl(url, 'wookmark-initialised', '');
    }
}


window.addEventListener('load', function () {
    let scrollYY = sessionStorage.getItem('scrolY')
    if (scrollYY != null) {
        this.scrollTo(0, scrollYY)
    }
})
window.addEventListener('scroll', function () {
    sessionStorage.setItem('scrolY', this.scrollY)
})
