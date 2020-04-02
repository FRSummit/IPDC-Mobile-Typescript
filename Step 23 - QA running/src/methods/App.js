export default class PostService{
    removeNavbar2() {
        let userNav = document.querySelector('.v-menu__content--fixed')
        let userNav2 = document.querySelector('.v-menu__content')
        if(userNav) {
            userNav.classList.add('hide')
            userNav.click()
        }
        else if(userNav2) {
            userNav2.classList.add('hide')
            userNav2.click()
        }
    }
    removeNavbar() {
        document.querySelector('.navbar').classList.add('hide')
    }
    removeHelp() {
    }
}