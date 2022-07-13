const serverUrl = "YOUR_SERVER_URL";
const appId = "YOUR_APP_ID";
Moralis.start( { serverUrl, appId } );

// Add below this
---------------> LOGIN BUTTON
async function login() {
    let user = Moralis.User.current();
    if (!user) {
        try {
            user = await Moralis.authenticate({ signingMessage: "Authenticate" });
            await Moralis.enableWeb3();
            console.log(user);
            console.log(user.get('ethAddress'));
        } catch(error) {
            console.log(error)
        }
    }
}
---------------> LOGOUT BUTTON
async function logOut() {
    await Moralis.User.logOut();
    console.log("You are now logged out.");
}

---------------> DONATE BUTTON FUNCTION 

async function donate() {

    user = await Moralis.authenticate({ signingMessage: "Contract Authentication" });
    
    var contract = {
        contractAddress:"0x356d2E7a0d592bAd95E86d19479c37cfdBb68Ab9",
        functionName: "newDonation",
        abi:[{"inputs":[{"internalType":"string","name":"note","type":"string"}],"name":"newDonation","outputs":[],"stateMutability":"payable","type":"function"}],
        params:{
         note:"Thanks for your work"
        },
        msgValue: Moralis.Units.ETH(0.1)
    }
    await Moralis.executeFunction(contract);
}
---------------> GET ELEMENTS BY ID (FETCHING BUTTONS TO DISPLAY ON PAGE

document.getElementById('btn-login').onclick = login;
document.getElementById('btn-logout').onclick = logOut;
document.getElementById('btn-donate').onclick = donate;
