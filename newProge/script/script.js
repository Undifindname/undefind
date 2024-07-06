let container = document.querySelector('#container')
async function fetchImagesFromUl(url, ulId, folderName = 'images') {
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
        const imgUrls = [];
        imgTags.forEach(img => {
            const imgUrl = img.getAttribute('data-src');
            if (imgUrl) {
                imgUrls.push(imgUrl);
            }
        });

        imgUrls.forEach(imgUrl => {
            console.log(imgUrl);
            let img = document.createElement('img');
            img.src = imgUrl
            img.classList = 'img'
            container.appendChild(img)
        });
    } catch (error) {
        console.error(`Failed to fetch the page: ${error}`);
    }
}

// مثال على استخدام الدالة
fetchImagesFromUl('https://www.pornpics.de/', 'tiles');
window.addEventListener('load',function(){
    let scrollY = sessionStorage.getItem('scrolY')
    if(scrollY != null){
        this.scrollTo(0,scrollY)
    }
})
window.addEventListener('scroll',function(){
     sessionStorage.setItem('scrolY',this.scrollY)
})
