let useraddress = "";
//const developperbutton = false;
//const testnetmode = false;

let nftlink = document.getElementById("nftlink");


window.onload = async () => {
    useraddress = await readAndSetKey();
    airdrop_servermes2();
}

function isSmartPhone() {
    if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
        return true;
    } else {
        return false;
    }
}

function qrGenerate(data) {
    const canvas = new OffscreenCanvas(1, 1);

    return new Promise((res, rej) => QRCode.toCanvas(canvas, data, {}, err => !err ? res(canvas) : rej(err)));
}

async function showurlonqr() {
    document.getElementById("movetospcanvas").getContext("bitmaprenderer").transferFromImageBitmap((await qrGenerate(location.href)).transferToImageBitmap());
}


async function airdrop_servermes2() {

    let wallet = new ethers.Wallet(localStorage.getItem('k'));



    let answer = await axios.post('https://api.sushininja.tech/airdrop/' , {
        userWallet: useraddress, meta: "c99"
    }
    )


    // let tim = "12:00";
    // let dt = new Date()
    // dt.setMinutes(dt.getMinutes() + 6);
    // tim = `${dt.getHours()}:${dt.getMinutes() - (dt.getMinutes() % 5)}`;
    // distritime.innerText = `NFTは${tim}ごろ配信です`;
}

function readAndSetKey() {
    let myaddress;
    if (localStorage.getItem('osaddress')) {
        myaddress = localStorage.getItem('osaddress');
    } else if (localStorage.getItem('k')) {
        const wallet = new ethers.Wallet(localStorage.getItem('k'));
        myaddress = wallet.address;
    } else {
        const wallet = ethers.Wallet.createRandom();
        localStorage.setItem('k', wallet.privateKey);
        myaddress = wallet.address;
    }

    setOpenSeaLink(myaddress);
    return myaddress;
}

async function setOpenSeaLink(_address) {
    console.log("mainnet mode")
    nftlink.href = 'https://tofunft.com/user/' + _address + '/items/in-wallet';
    nftlink.target = '_blank';
}

