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

// const form = document.querySelector('form')
// form.addEventListener("submit", e => {
//     e.preventDefault()

//     let formData = new FormData(form)
//     formSent(formData)
// })

// const formSent = async (form) => {
//     let response = await fetch('sendmail.php', {
//         method: "POST",
//         body: form
//     })
//     if (response.ok) {
//         document.getElementById('contact__success').style.height = '40px'
//         setTimeout(() => {
//             document.getElementById('contact__success').style.height = '0'
//         }, 2000)
//         form.reset()
//     } else {
//         alert('ERROR')
//     }
// }

$('.contact__form').on('submit', function (event) {

    event.stopPropagation();
    event.preventDefault();

    let form = this,
        submit = $('.submit', form),
        data = new FormData(),
        files = $('input[type=file]')


    $('.submit', form).val('Отправка...');
    $('input, textarea', form).attr('disabled', '');

    data.append('name', $('[name="name"]', form).val());
    data.append('email', $('[name="email"]', form).val());
    data.append('text', $('[name="message"]', form).val());


    files.each(function (key, file) {
        let cont = file.files;
        if (cont) {
            $.each(cont, function (key, value) {
                data.append(key, value);
            });
        }
    });

    $.ajax({
        url: 'sendmail.php',
        type: 'POST',
        data: data,
        cache: false,
        dataType: 'json',
        processData: false,
        contentType: false,
        xhr: function () {
            let myXhr = $.ajaxSettings.xhr();

            if (myXhr.upload) {
                myXhr.upload.addEventListener('progress', function (e) {
                    if (e.lengthComputable) {
                        let percentage = (e.loaded / e.total) * 100;
                        percentage = percentage.toFixed(0);
                        $('.submit', form)
                            .html(percentage + '%');
                    }
                }, false);
            }

            return myXhr;
        },
        error: function (jqXHR, textStatus) {
            // Тут выводим ошибку
        },
        complete: function () {
            // Тут можем что-то делать ПОСЛЕ успешной отправки формы
            console.log('Complete')
            form.reset()
        }
    });

    return false;
});

