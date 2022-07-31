import { animateCanvas } from "./js/animateCanvas.js";

animateCanvas()

const animItems = document.querySelectorAll('._anim-items')

if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll)
    function animOnScroll(params) {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index]
            const animItemHeight = animItem.offsetHeight
            const animItemOffset = offset(animItem).top
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart
            }

            if ((scrollY > animItemOffset - animItemPoint) && scrollY < (animItemOffset + animItemHeight)) {
                animItem.classList.add('_active')
            }

        }
    }
    function offset(el) {
        const rect = el.getBoundingClientRect()
        const scrollLeft = window.scrollX || document.documentElement.scrollLeft
        const scrollTop = window.scrollY || document.documentElement.scrollTop
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }
    animOnScroll()
}

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > document.documentElement.clientHeight || document.documentElement.scrollTop > document.documentElement.clientHeight) {
        document.getElementsByClassName("home__menu")[0].classList.add('_fixed')
    } else {
        document.getElementsByClassName("home__menu")[0].classList.remove('_fixed')
    }
    let scrollDistance = window.scrollY

    document.querySelectorAll('._container').forEach((el, i) => {
        if (el.offsetTop - document.querySelector('.home__menu').clientHeight <= scrollDistance) {
            document.querySelectorAll('.menu__link').forEach((el, i) => {
                if (el.classList.contains('active')) {
                    el.classList.remove('active')
                }
            });
            document.querySelectorAll('.menu__item')[i].querySelector('.menu__link').classList.add('active')
        }
    })
}

const form = document.querySelector('form')
const TOKEN = "5599428939:AAHwu2AlosFfXZBvVSziyf3FplOpT9N4w5I";
const CHAT_ID = "-608296678";
const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`
form.addEventListener("submit", function (e) {
    e.preventDefault()


    let message = `<b>Заявка с сайта</b>\n`
    message += `<b>Отправитель: </b>${this.name.value}\n`
    message += `<b>Mail: </b>${this.email.value}\n`
    message += `<b>Message: </b>${this.message.value}`
    console.log(message)
    axios.post(URI_API, {
        chat_id: CHAT_ID,
        parse_mode: 'html',
        text: message
    })
        .then(res => {
            document.getElementById('contact__success').style.height = '40px'
            setTimeout(() => {
                document.getElementById('contact__success').style.height = '0'
            }, 2000)
            form.reset()
        })
        .catch(err => {
            console.log('ERROR', err)
        })
        .finally(() => {

        })
})

