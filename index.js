let useraddress = "";

let nftlink = document.getElementById("nftlink");
let modal = document.getElementById("myModal");

window.onload = async () => {

    if (!isLocalStorageAvailable()) {
        alert("非対応ブラウザです。ブラウザを変更して再度お試しください。");
        return;
    }
    modal.style.display = "block";
}


async function firstUser(){
    modal.style.display = "none";
    const lastaddress = localStorage.getItem('addressofmine');
    if(lastaddress){
        useraddress = lastaddress;
    } else if (localStorage.getItem('privateKey')) {
        const wallet = new ethers.Wallet(localStorage.getItem('privateKey'));
        useraddress = wallet.address;
    } else {
        const wallet = ethers.Wallet.createRandom();
        localStorage.setItem('privateKey', wallet.privateKey);
        useraddress = wallet.address;
    }    

    nftlink.innerHTML = `<a href="https://tofunft.com/user/${useraddress}/items/in-wallet" target="_blank">${useraddress.substring(0,16)}...に接続中<img src="./img/nft.png"></a>`
    airdrop_servermeta(useraddress);
}

async function walletUser(){
    const lastaddress = localStorage.getItem('addressofmine');
    let check;
    if (lastaddress) {
        check = confirm(`前回と同じウォレットを使いますか？\n${lastaddress}`);
        if(check){
            useraddress = localStorage.getItem('addressofmine');
        } 
    }

    if(!check){
        useraddress = prompt("MetaMaskなどのアドレス0x....を入力")
        if(useraddress[1]!="x"){
            alert("ウォレットアドレスを入力してください");
            return;
        }
    }
    localStorage.setItem('addressofmine', useraddress);    
    modal.style.display = "none";
    nftlink.innerHTML = `<a href="https://tofunft.com/user/${useraddress}/items/in-wallet" target="_blank">${useraddress.substring(0,16)}...に接続中<img src="./img/nft.png"></a>`
    airdrop_servermeta(useraddress);
}

// ローカルストレージ対応可 -> true
function isLocalStorageAvailable(){
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem('dummy', '1');
        if (localStorage.getItem('dummy') === '1') {
          localStorage.removeItem('dummy');
          return true;
        } else {
          return false;
        }
      } catch(e) {
        return false;
      }
    } else {
      return false;
    }
  }

async function airdrop_servermeta(_useraddress) {
    console.log("server_connecting...");
    try {
        let answer = await axios.post('https://nfttopshotv3shiden.onrender.com/airdrop/', {
            userWallet: _useraddress, meta: "c99"});
            console.log(`post ${_useraddress}`);
            console.log(answer)
    } catch (error) {
        console.log(error)
        alert("server error")
    }
}
