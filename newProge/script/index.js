document.addEventListener('DOMContentLoaded', function () {
    function getSpaceEntreDeuxElement(Element1, Element2) {
        Element1 = Element1.getBoundingClientRect();
        Element2 = Element2.getBoundingClientRect();
        let space = -(Element2.top - Element1.bottom - 5) + 'px'
        return space
    }


    function getImges() {
        let images = document.querySelectorAll('img')
        let elementLine = 0;
        let currentTop = null;
        images.forEach((Element, index) => {
            let image = images[index].getBoundingClientRect();
            let nextLi = images[index].getBoundingClientRect().top;

            if (currentTop === null) {
                currentTop = image.top;
            }

            if (currentTop == nextLi) {
                elementLine++
            } else {
                const space = getSpaceEntreDeuxElement(images[index - elementLine], Element)
                images[index].style.transform = `translate(0,${(space)})`
            }
        })


    }
    setTimeout(() => {
        getImges()
    }, 700)

    function removeTranslate() {
        let images = document.querySelectorAll('img')
        let elementLine =0
        let currentTop = null

        images.forEach((Element, index) => {
            let image = images[index].getBoundingClientRect();
            let nextLi = images[index].getBoundingClientRect().top;
            if (currentTop === null) {
                currentTop = image.top;
            }

            if (currentTop == nextLi) {
                elementLine++
            } else {
                images[index].style.removeProperty('transform')                
            }
        })

    }

    window.addEventListener('resize', () => {
        removeTranslate()
        getImges()

    })
})