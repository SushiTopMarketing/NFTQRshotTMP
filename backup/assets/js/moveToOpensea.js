
const setMyWalletLink = document.getElementById("setMyWallet");

setMyWalletLink.addEventListener('click', () => {
    //alert("押せた")        
    _osaddress = prompt("enter your Ethereum Address");
    if(_osaddress[0]=="e"){   
        _osaddress = _osaddress.substring(9)    
    }
    localStorage.setItem('osaddress', _osaddress);
    //alert(_osaddress);
    alert(`your address is ${_osaddress}`)
    movemovemove();
})

function movemovemove(){
    //alert("here?")
    setTimeout("location.reload()",500);

    const data = { userWallet: useraddress , osaddress:_osaddress , meta: "movemovemove" };
    fetch('https://airdrop2.sushininja.tech/openseawallet/', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),

    })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
    })
        .catch((error) => {
        console.error('Error:', error);
    });
}
