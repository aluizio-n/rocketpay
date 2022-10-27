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
  mask: "0000",
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
  ],
}

const maskedCardNumber = IMask(cardNumber, cardNumberPattern)
