let container = document.querySelector('#container')
async function fetchImagesFromUl(url, ulId, folderName = 'images') {
    const imgUrls = [];
    try {
        const response = await fetch(url);
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');

        const ulElement = doc.querySelector(`ul#${ulId}`);
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
               window.scrollTo(0, 0)
                 
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
                img.alt = imgUrl.alt
                 img.style.width = imgUrl.width+'px'
                img.style.height = imgUrl.height+'px'
                img.classList = 'img'
                container.appendChild(img)
            });
            addEventListenerImage()
        


    } catch (error) {
        console.error(`Failed to fetch the page: ${error}`);
    }
}
let categorie = ''
fetchImagesFromUl('https://www.pornpics.de/', 'tiles');


let btns = document.querySelectorAll('.navbar-nav .btn')
let home = document.querySelector('#home')
let home2 = document.querySelector('#home2')

btns.forEach(btn => {
    btn.addEventListener('click', () => {
        let content = btn.innerText;
        categorie = content
        fetchImagesFromUl(`https://www.pornpics.de/${content}/`, 'tiles');

    })
})

home.addEventListener('click', () => {
    categorie = ''
    fetchImagesFromUl(`https://www.pornpics.de/`, 'tiles');
})
home2.addEventListener('click', () => {
    categorie = ''
    fetchImagesFromUl(`https://www.pornpics.de/`, 'tiles');
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
    // fetchImagesFromUl(`https://www.pornpics.de/${content}/`, 'tiles');
}

function mored(alt, src) {
    let newAlt = alt.toLowerCase()
    if (categorie != '') {
        let idimg = src.split('/')[6]
        newAlt = newAlt.replace(/ /g, '-');
        let identifienrIMG = newAlt + '-' + idimg
        fetchImagesFromUl(`https://www.pornpics.de/galleries/${identifienrIMG}/`, 'tiles');
    } else {
        let newalt = newAlt.split(' ')[0]
        categorie = newalt
        let url = `https://www.pornpics.de/${newalt}/`
        fetchImagesFromUl(url, 'tiles', '', 'false');
    }
}
window.addEventListener('load', function () {
    let scrollY = sessionStorage.getItem('scrolY')
    if (scrollY != null) {
        this.scrollTo(0, scrollY)
    }
})
window.addEventListener('scroll', function () {
    sessionStorage.setItem('scrolY', this.scrollY)
})
