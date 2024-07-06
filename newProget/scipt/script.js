let container = document.querySelector('#container')
for (let index = 1; index < 26; index++) {
    let img = document.createElement('img');
    img.src = `images/${index}.jpg`
    img.classList = 'img'
    container.appendChild(img)
}
window.addEventListener('load',function(){
    let scrollY = sessionStorage.getItem('scrolY')
    if(scrollY != null){
        this.scrollTo(0,scrollY)
    }
})
window.addEventListener('scroll',function(){
     sessionStorage.setItem('scrolY',this.scrollY)
})
