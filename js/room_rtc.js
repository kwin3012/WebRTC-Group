const APP_ID = "";

let uid = sessionStorage.getItem('uid');

if(!uid){
    uid = String(Math.floor(Math.random()*10000));
    sessionStorage.setItem('uid',uid);
}

let token = null;
let client;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let roomId = urlParams.get('room');

if (!roomId){
    roomId = "main";
}

let localTrack = [];
let remoteUsers = {};

let joinRoomInit = async() => {
    client = AgoraRTC.createClient({mode:'rtc',codec:'vp8'});
    await client.join(APP_ID,roomId,token,uid);
}

joinRoomInit();
