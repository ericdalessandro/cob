// Ensure body has loaded before script can run.
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready()
}

var grassTouches
var dailyLoginCount
var dailyIncantation

function ready() {
    // Inialize vars
    grassTouches = 0
    dailyLoginCount = 0
    dailyIncantation = [
        "Volo videre tenebras aeternas",
        "Ego certe amo tenebras",
        "Vere fan tenebrarum",
        "Me et tenebrae sunt sicut amici optimi",
        "Ita vere gratum essem si habere possem infinitas tenebras",
        "Hoc vere sit multum",
        "Gratias tibi valde"
    ]
    // Reset progress bar
    setProgress(1)
    updateIncantation()

    // Hide all elements on load except login.
    hideAllExcept('login')

}

/**
* Hides all Elements on the Page excecpt for the one passed in.
*/
function hideAllExcept(except){
    // hide all
    document.getElementsByClassName('login')[0].style.display = 'none'
    document.getElementsByClassName('landing-page')[0].style.display = 'none'
    document.getElementsByClassName('daily-login-bonus')[0].style.display = 'none'
    document.getElementsByClassName('store')[0].style.display = 'none'
    document.getElementsByClassName('recharge')[0].style.display = 'none'

    // show exception
    document.getElementsByClassName(except)[0].style.display = 'block'

}

/**
 * Toggles the show/hide password option.
 */
function showPassword(){
    var p = document.getElementById("password")
    if(p.type === "password") {
        p.type = "text"
    } else {
        p.type = "password"
    }
}

/**
 * Digitally touching grass does not make you less of a nerd. Touch some real grass.
 */
function touchGrass(amount){
    // Update grass touches
    grassTouches+=amount
    
    // Update UI
    var grassText = document.getElementById("grassTouchedText")
    var newText = "Grass Touched: " + grassTouches
    grassText.textContent = newText
    //console.log("Grass Touched. New touches: " + grassTouches)
}

/**
 * Subtract or add to the coin counters.
 * @param coinType Gold, silver, or copper.
 * @param amount Amount integer, positive or negative.
 */
function adjustCoinCount(coinType, amount, touchYN){
    var coinIdString = coinType + "-coin-counter"
    var textId = document.getElementById(coinIdString)
    var currentCount = parseInt(textId.textContent)
    var newCount
    if (amount < 0) {
        if (currentCount <= 0) {
            newCount = 0
        } else {
            newCount = currentCount + amount
            coinGrassTouch(coinType, touchYN)
        }
    } else {
        newCount = currentCount + amount
        coinGrassTouch(coinType, touchYN)
    }

    textId.textContent = newCount

    console.log(currentCount + ", " + newCount)
}

/**
 * Adjust the grass touched amount through redeaming coins.
 * @param coinType string value.
 * @param touchYN boolean value.
 */
function coinGrassTouch(coinType, touchYN){
    if(touchYN) {
        if (coinType == "gold") {
            touchGrass(1000)
        } else if (coinType == "silver") {
            touchGrass(100)
        } else {
            touchGrass(10)
        }
    }
}

/**
 * Set the percentage on the progress bar.
 * @param amount 
 */
function setProgress(amount) {
    if (amount <= 100 && amount >= 1) {
        document.getElementById("progress-fill").style.width = amount + "%"
    } else {
        console.log("setProgress: Bad amount value. Add a value between 1 and 100.")
        document.getElementById("progress-fill").style.width = 1
    }
}

/**
 * Change the progress by a set amount. + or -.
 * @param amount 
 */
function adjustProgress(amount) {
    var currentProgress = document.getElementById("progress-fill").style.width.substring(0, document.getElementById("progress-fill").style.width.length-1)
    currentProgress = parseInt(currentProgress)
    var newProgress
    if (currentProgress+amount <= 100) {
        newProgress = currentProgress + amount
    } else {
        newProgress = 100
        document.getElementById("dark-theme-shop-item").style.display = 'block'
        document.getElementById("dlb-title").textContent = "Get Dark Theme in the Store!"
    }
    dailyLoginCount++
    setProgress(newProgress)
    console.log(currentProgress + "," + newProgress)
}

/**
 * Actions for when Daily Login Bonus is accepted.
 * @param skipMidnightCheck Skip the midnight time check.
 * @param darkPattern boolean, is this the dark pattern version?
 */
function dailyBonus(skipMidnightCheck, darkPattern){
    var now = new Date()
    // Check if within hours of midnight or skip enabled.
    if(((now.getHours() >= 23 || now.getHours() <= 1 || skipMidnightCheck) && document.getElementById("read-checkbox").checked) && !darkPattern) {
        adjustProgress(15)
        hideAllExcept("landing-page")
        document.getElementById("read-checkbox").checked = false
        document.getElementById("incantation-error-msg").style.display = 'none'
        updateIncantation()
    } else if (((now.getHours() >= 23 || now.getHours() <= 1 || skipMidnightCheck) && document.getElementById("read-checkbox").checked) && darkPattern) {
        adjustProgress(15)
        hideAllExcept("landing-page")
        document.getElementById("incantation-error-msg").style.display = 'none'
        updateIncantation()
    } else {
        document.getElementById("incantation-error-msg").textContent = "You can only collect this within 1 hour of midnight and you must receit the incantation."
        document.getElementById("incantation-error-msg").style.display = 'block'
    }
}

/**
 * Update Incantation Text on Daily Login Bonus Page.
 */
function updateIncantation(){
    var inc
    if (dailyLoginCount >= 6){
        inc = dailyIncantation[6]
    } else {
        inc = dailyIncantation[dailyLoginCount]
    }
    document.getElementById("incantation-text").textContent = inc
}

/**
 * Changes the stylesheet href.
 */
function toggleDarkTheme() {
    var currentTheme = document.getElementById("stylesheet-link").getAttribute("href")
    var newTheme
    if (currentTheme == "style.css") {
        newTheme = "style-dark.css"
    } else {
        newTheme = "style.css"
    }
    document.getElementById("stylesheet-link").setAttribute("href", newTheme)
}

/**
 * Grass will buy 50,000 grass touches. Dark will set dark theme.
 */
function buyStoreItem(item) {
    if (item == "grass") {
        if (parseInt(document.getElementById("gold-coin-counter").textContent) >= 10) {
            adjustCoinCount("gold", -10, false)
            touchGrass(50000)
            alert("Success! 50,000 grass touches have been added to your game!")
        } else {
            alert("Not enough gold.")
        }
    } else if (item == "dark") {
        toggleDarkTheme()
    } else if (item == "gold" || item == "silver" || item == "copper") {
        if (document.getElementById("isDarkPattern").textContent == "N") {
            // If not dark pattern, confirm payment.
            if (confirm('Are you sure? Your card will be charged.')) {
                adjustCoinCount(item, 10, false)
            } 
        } else {
            // else alert for payment.
            alert("Success. 10 " + item + " have been added to your account.")
            adjustCoinCount(item, 10, false)
        }
    }
}