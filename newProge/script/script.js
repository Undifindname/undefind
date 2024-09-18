let container = document.querySelector('#container')
const liens = []
let previus = document.querySelector('#mydiv')
let btnPrevius = document.querySelector('#mydivheader')
let description = document.querySelector('#description')
let sx = []
let lengthTab1 = 0
var statuss = 200
let categorie = ''
async function fetchImagesFromUl(url, ulId, acture = '', keyWords = '') {

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
    if (url.split('/')[3] != 'galleries') {
        description.innerText = ''

    };
    const imgUrls = [];
    try {
        const response = await fetch(url);
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const ulElement = doc.querySelector(`ul.${ulId}`);
        
        if (!ulElement) {

            let keyWord1 = keyWords.split(' ')[0]
            let keyWord2 = keyWords.split(' ')[1]
            if (url.split('/')[3] == keyWord1) {
                let url = `https://www.pornpics.de/${keyWord1 + '-' + keyWord2}/`
                fetchImagesFromUl(url, 'wookmark-initialised');
            } else {
                if (statuss == 200) {

                    let urlf = `https://www.pornpics.de/tags/${url.split('/')[3]}/`
                    fetchImagesFromUl(urlf, 'wookmark-initialised');
                    statuss = 404

                } else {
                    statuss == 200
                    console.log(`No <ul> element with id "${ulId}" found.`);
                    return;
                }

            }

        }
        statuss == 200
        const imgTags = ulElement.querySelectorAll('img');
        
        const allA = ulElement.querySelectorAll(`ul.${ulId} a`);
        let aHref = []
        allA.forEach(a => {
            if (a.href.split('/')[4].length > 3) {
                let href = a.href.split('/')[4]
                aHref.push(href)
            } else {
                let href = a.href.split('/')[3]
                aHref.push(href)
            }

        })

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
        imgUrls.forEach((imgUrl, index) => {
            
            let div = document.createElement('div');


            let img = document.createElement('img');
            img.src = imgUrl.src
            img.alt = imgUrl.alt
            img.style.width = imgUrl.width + 'px'
            img.style.height = imgUrl.height + 'px'

            div.style.width = imgUrl.width + 'px'
            div.style.height = imgUrl.height + 'px'


            img.alt = imgUrl.alt
            img.id = `IMG${index}`
            img.setAttribute('data-src', aHref[index])

            if (url.slice(0, 33) !== "https://www.pornpics.de/galleries") {
                img.addEventListener('click', () => {
                    let content = img.alt;
                    let dataSrc = img.getAttribute('data-src')
                    mored(content, dataSrc)
                })
            } else {
                img.addEventListener('click', () => {
                    window.open(imgUrl.src , "_blank")
                })
            }


            div.classList = 'img div-img bg-danger'
            div.appendChild(img)

            if (categorie === '') {
                let p = document.createElement('p');
                p.innerText = imgUrl.alt.split(' ')[0]
                p.classList = 'info-img'
                div.appendChild(p)

            }

            container.appendChild(div)

        });

        if (lengthTab1 > lengthTab2) {
            lengthTab2 = 0
            lengthTab1 = 0
            window.scrollTo(0, sx[sx.length - 1])
            sx.splice(sx.length - 1, 1)

        }



    } catch (error) {

        function checkInternetConnection() {
            return fetch("https://www.google.com", { mode: 'no-cors' })
                .then(() => true)
                .catch(() => false);
        }

        checkInternetConnection().then(isConnected => {
            if (isConnected) {
                console.log(error);
            } else {
                document.querySelector('#error').innerText = "'auchun access internite'"
                document.querySelector('#error').style.backgroundColor = 'gainsboro'
                document.querySelector('#error').style.color = '#4c1a3a'
                document.querySelector('#error').style.textAlign = 'center'
                for (let index = 0; index < 50; index++) {


                }
                let px = 0
                let interval = setInterval(() => {
                    px++
                    document.querySelector('#error').style.padding = px + 'px'
                    clearIntervale(px)
                }, 10);
                function clearIntervale(px) {
                    if (px == 5) {
                        clearInterval(interval)
                    }
                }

                console.error(`Failed to fetch the page: ${error}`);


            }
        });
    }
}

let conected = false
if (conected) {

    let cat = ["Home", "solo", "pussy", "shower", "tattoo", "lesbian", "orgasm", "cowgirl", "cum-in-pussy", "tribbing"]
    let index = Math.random() * 10
    let cate = ''
    if (index < 10) {
        cate = cat[parseInt(index)]

    } else {
        cate = cat[parseInt(index - 1)]

    }
    document.querySelector('title').innerText = cate

    if (cate == "Home") {
        fetchImagesFromUl(`https://www.pornpics.de/`, `wookmark-initialised`);

    } else {
        fetchImagesFromUl(`https://www.pornpics.de/${cate}/`, `wookmark-initialised`);

    }
} else {
    fetchImagesFromUl('https://www.pornpics.de', 'wookmark-initialised');

}







let btns = document.querySelectorAll('.navbar-nav .btn')
let home = document.querySelector('#home')
btns.forEach(btn => {
    btn.addEventListener('click', () => {
        let content = btn.innerText;
        categorie = content
        document.querySelector('title').innerText = categorie
        fetchImagesFromUl(`https://www.pornpics.de/${content}/`, 'wookmark-initialised');
    })
})
home.addEventListener('click', () => {
    liens.splice(0, liens.length)
    sx.splice(0, liens.length)
    categorie = ''
    document.querySelector('title').innerText = "Best Images"
    fetchImagesFromUl(`https://www.pornpics.de/`, 'wookmark-initialised');
})
previus.addEventListener('click', () => {
    lengthTab1 = liens.length
    if (lengthTab1 == 2) {
        categorie = ''
        document.querySelector('title').innerText = "Best Images"


    } else {
        document.querySelector('title').innerText = categorie

    };

    let index = liens.length - 2
    let Nurl = liens[index]
    liens.splice(index, 2)

    fetchImagesFromUl(Nurl, 'wookmark-initialised');
})



function mored(alt, dataSrc) {
    if (categorie != '') {
        document.querySelector('title').innerText = categorie

        description.innerText = alt
        document.querySelector('title').innerText = alt

        description.style.textTransform = 'capitalize'
        let identifienrIMG = dataSrc
        let url = `https://www.pornpics.de/galleries/${identifienrIMG}`

        fetchImagesFromUl(url, 'wookmark-initialised', 'acture');
    } else {

        categorie = dataSrc
        document.querySelector('title').innerText = categorie

        let url = `https://www.pornpics.de/${categorie}/`

        fetchImagesFromUl(url, 'wookmark-initialised');
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



1
function hidNavBAR() {
    const navbarNavAltMarkup = document.querySelectorAll('#navbarNavAltMarkup')
    navbarNavAltMarkup.classList.remove('show')
    btn1.classList.add("collapsed")
    console.log(btn1);

}


const navbarBtn = document.querySelectorAll('.navbar-nav button')
navbarBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        hidNavBAR()
        

    })
})
