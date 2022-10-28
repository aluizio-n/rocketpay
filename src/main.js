import "./css/index.css"
import IMask from "imask"

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")

function setCardType(type) {
  const colors = {
    visa: ["#436D99", "#2D57F2"],
    mastercard: ["#C69347", "#DF6F29"],
    default: ["black", "gray"],
  }

  ccBgColor01.setAttribute("fill", colors[type][0])
  ccBgColor02.setAttribute("fill", colors[type][1])
  ccLogo.setAttribute("src", `cc-${type}.svg`)
}

globalThis.setCardType = setCardType

const expirationDate = document.querySelector("#expiration-date")
const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    YY: {
      mask: IMask.MaskedRange,
      from: 22,
      to: 60,
    },
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
  },
}
const maskedExpiration = IMask(expirationDate, expirationDatePattern)

const securityCode = document.querySelector("#security-code")
const securityCodePattern = {
  mask: "000",
}
const maskedSecurityPattern = IMask(securityCode, securityCodePattern)

const cardNumber = document.querySelector("#card-number")
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regEx: /^4\d{0,15}/,
      cardtype: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regEx: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardtype: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: "default",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^8\d{0,15}/,
      cardtype: "nubank",
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")
    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex)
    })

    return foundMask
  },
}

const maskedCardNumber = IMask(cardNumber, cardNumberPattern)

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault()
})

const cardHolder = document.querySelector("#card-holder")
cardHolder.addEventListener("input", () => {
  const ccHolder = document.querySelector(".cc-holder .value")

  ccHolder.innerText =
    cardHolder.value.length === 0 ? "FULANO DA SILVA" : cardHolder.value
})

securityCode.addEventListener("input", () => {
  const ccSecurity = document.querySelector(".cc-security .value")

  ccSecurity.innerText =
    securityCode.value.length === 0 ? "123" : securityCode.value
})

maskedExpiration.on("accept", () => {
  updateExpirationDate(maskedExpiration.value)
})

function updateExpirationDate(date) {
  const ccExpiration = document.querySelector(".cc-extra .value")

  ccExpiration.innerText = date.length === 0 ? "02/32" : date
}

maskedCardNumber.on("accept", () => {
  const cardType = maskedCardNumber.masked.currentMask.cardtype
  setCardType(cardType)
  updateCardNumber(maskedCardNumber.value)
})

function updateCardNumber(number) {
  const ccNumber = document.querySelector(".cc-number")
  ccNumber.innerText = number.length === 0 ? "1234 5678 9012 3456" : number
}
