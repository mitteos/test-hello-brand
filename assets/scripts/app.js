const headerBurger = document.querySelector(".header__burger")
const headerMobile = document.querySelector(".header__container")
headerBurger.addEventListener("click", () => {
    window.scrollTo(0, 0)
    document.body.classList.toggle("active")
    headerBurger.classList.toggle("active")
    headerMobile.classList.toggle("active")
})


const reserve = {
    modalBtn: document.querySelector(".greetings__nav-link"),
    modal: document.querySelector(".reserve"),
    content: document.querySelector(".reserve__content"),
    close: document.querySelector(".reserve__close")
}

reserve.content.addEventListener("click", (e) => {
    e.stopPropagation()
})
reserve.modalBtn.addEventListener("click", () => {
    reserve.modal.classList.add("active")
    document.body.classList.add("active")
})

const reserveCloses = [reserve.close, reserve.modal]
reserveCloses.forEach((el) => {
    el.addEventListener("click", () => {
        reserve.modal.classList.remove("active")
        document.body.classList.remove("active")
        reserveFormError.textContent = ""
        reserveFormSuccess.classList.remove("active")
        const formFields = [document.querySelector(".reserve__input-name"), document.querySelector(".reserve__input-phone")]
        formFields.forEach((el) => el.classList.remove("invalid"))
    })
})

const reserveForm = document.querySelector(".reserve__form")
const reserveFormError = document.querySelector(".reserve__error")
const reserveFormSuccess = document.querySelector(".reserve__success")

const validateFields = (name, phone) => {
    const fields = [name, phone]

    fields.forEach((el) => {
        if(!el.value) {
            el.classList.add("invalid")
        } else {
            el.classList.remove("invalid")
        }
    })
    const emptyFields = fields.filter(el => el.value === "")
    if(emptyFields.length > 0) {
        reserveFormError.textContent = "Fill in all the fields"
        return false
    } else {
        reserveFormError.textContent = ""
        return validatePhoneNumber(phone.value)
    }
}

const validatePhoneNumber = (phone) => {
    const regExpPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    if(regExpPhone.test(phone)) {
        return true
    } else {
        reserveFormError.textContent = "Wrong phone number"
        return false
    }
}

reserveForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const name = document.querySelector(".reserve__input-name")
    const phone = document.querySelector(".reserve__input-phone")
    if(validateFields(name, phone)) {
        const request = new XMLHttpRequest()
        const params = "&name=" + name.value + "&phone=" + phone.value
        request.open('POST', "test-url")
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        request.addEventListener("readystatechange", () => {
            if(request.readyState === 4 && request.status === 200) {
                reserveFormSuccess.classList.add("active")
            } else {
                reserveFormError.textContent = "Server error"
            }
        })

        request.send(params)
    }
})

const swiperNavigation = {
    prevEl: document.querySelector(".slider__nav-left"),
    nextEl: document.querySelector(".slider__nav-right"),
}

const swiper = new Swiper(".slider", {
    centeredSlides: true,
    slidesPerView: 1,
    navigation: {
        nextEl: `.slider__nav-right`,
        prevEl: `.slider__nav-left`,
    },
    on: {
        slideChange: (e) => {
            e.isEnd
                ? swiperNavigation.nextEl.style.stroke = "#FFF"
                : swiperNavigation.nextEl.style.stroke = "#D3B47F"
            e.activeIndex > 0
                ? swiperNavigation.prevEl.style.stroke = "#D3B47F"
                : swiperNavigation.prevEl.style.stroke = "#FFF"
        }
    }
})