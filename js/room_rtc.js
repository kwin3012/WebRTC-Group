const APP_ID = "";

let uid = sessionStorage.getItem('uid');

if(!uid){
    uid = String(Math.floor(Math.random()*10000));
    sessionStorage.setItem('uid',uid);
}

let token = "007eJxTYFj90mXRkyMlN0vecTTpBk2S3/aqsiV1jwZjwJG102dtnROvwJBkbGiRYm5kkpRkaGSSlmKWZGRsZmxikGJkaJhqamBkznOKIblTmin5pXc4MyMDBIL4LAy5iZl5DAwAqFUf9A==";
let client;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let roomId = urlParams.get('room');

if (!roomId){
    roomId = "main";
}

console.log(roomId);

let localTracks = [];
let remoteUsers = {};

let joinRoomInit = async() => {
    client = AgoraRTC.createClient({mode:'rtc',codec:'vp8'});
    await client.join(APP_ID,roomId,token,uid);

    joinStream();
}

let joinStream = async() => {
    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks();

    let player = `<div class="video__container" id="user-container-${uid}">
                    <div class="video-player" id="user-${uid}"></div>
                  </div>`

    document.getElementById('streams__container').insertAdjacentHTML('beforeend',player);
    localTracks[1].play(`user-${uid}`)
}

joinRoomInit();
