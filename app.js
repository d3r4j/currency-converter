const BASE_URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies`

const dropdown = document.querySelectorAll(".dropdown select")

const btn = document.querySelector("form button")
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")
const msg = document.querySelector(".msg")
let i = 0;

for (let select of dropdown) {
    for (Currency_Code in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = Currency_Code;
        newOption.value = Currency_Code;

        if (select.name === "from" && Currency_Code === "USD") {
            newOption.selected = "selected"
        } else if (select.name === "to" && Currency_Code === "INR") {
            newOption.selected = "selected"
        }

        select.append(newOption);

    }
    select.addEventListener("change", (evnt) => {
        update_flag(evnt.target);
    })
}


const update_flag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    //img accces we need to go inside element parent

    let img = element.parentElement.querySelector("img")
    img.src = newSrc;
}

btn.addEventListener("click", async (evnt) => {
    evnt.preventDefault(); // prevents defaut behaviour of form button i.e submit n reloading page
    let amount = document.querySelector(".amount input")
    let amtVal = parseFloat(amount.value);
    // console.log(amtVal)
    if (amtVal === 0 || amtVal < 1) {
        amtVal = 1;
        amount.value = 1;
    }

    // console.log(fromCurr.value, toCurr.value)

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

    try {

        let response = await fetch(URL);
        let responseJSON = await response.json();
        let rate = responseJSON[toCurr.value.toLowerCase()];
        console.log(rate)
        let finalAmount = (amtVal * rate).toFixed(2);
        msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
        if (!response.ok) {
            throw new Error(`Network response was not ok`);
        }
    } catch (e) {

        console.error("Fetch error", e);
        msg.innerHTML = `Failed to fetch exchange rate. Try again later.`;
        return;
    }

})