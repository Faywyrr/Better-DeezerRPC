const { remote } = require('electron');

var rpc;
var playPause;
var sliderTime;

const clientId = '887417020730204160';

var loaded = false;
var enable = true;

window.onload = setupRPC;

function setupRPC() {

    if(loaded) return;
    loaded = true;

    /* Menu */

    const menu = remote.Menu.getApplicationMenu();
    const item = new remote.MenuItem({ type: 'checkbox', label: 'Discord RPC', checked: 'true', click: (menuItem) => { toggleRPC(menuItem.checked) }});

    menu.append(item);

    // Remove deezer old ipc listener
    remote.ipcMain.removeAllListeners('channel-menu-show');

    // Add new listener
    remote.ipcMain.on('channel-menu-show', ((event, options) => {
        const focusedWindow = remote.BrowserWindow.getFocusedWindow();
        if (!focusedWindow) return;
        const browserView = focusedWindow.getBrowserView();
        browserView && (browserView.webContents.focus(), menu.popup(options))
    }));


    /* Rich Presence */

    discordrpc = require('discord-rpc');

    rpc = new discordrpc.Client({ transport: 'ipc' });
    rpc.login({ clientId });


    /* Events */

    const play = dzPlayer.control.play;
    dzPlayer.control.play = function() {
        play.apply();
        setTimeout(onPlay, 1);
    }

    const pause = dzPlayer.control.pause;
    dzPlayer.control.pause = function() {
        pause.apply();
        setTimeout(onPause, 1);
    }

    const seek = dzPlayer.control.seek;
    dzPlayer.control.seek = function(args) {
        seek.apply(this, [args]);
        setTimeout(onSeek, 1);
    }

    const prevSong = dzPlayer.control.prevSong;
    dzPlayer.control.prevSong = function() {
        prevSong.apply();
        setTimeout(onPrevSong, 1);
    }

    const nextSong = dzPlayer.control.nextSong;
    dzPlayer.control.nextSong = function() {
        nextSong.apply();
        setTimeout(onNextSong, 1);
    }
}


function onPlay() {
    updateRPC(false);
}


function onPause() {
    updateRPC(true);
}


function onSeek() {
    updateRPC(false);
}


function onPrevSong() {
    updateRPC(false);
}


function onNextSong() {
    updateRPC(false);
}


function updateRPC(pause=!dzPlayer.playing) {

    if(!enable) return;

    const song = dzPlayer.getSongTitle();
    const artist = dzPlayer.getArtistName();

    if(pause)
        
        activity = {
            details: song,
            state: artist,
            largeImageKey: 'logo',
            largeImageText: 'Deezer',
            smallImageKey: 'pause',
            smallImageText: 'Pause',
            instance: true
        }

    else {

        const endTimestamp = Date.now() + dzPlayer.getRemainingTime() * 1000;

        activity = {
            details: song,
            state: artist,
            largeImageKey: 'logo',
            largeImageText: 'Deezer',
            smallImageKey: 'play',
            smallImageText: /*'Listening'*/song,
            endTimestamp,
            instance: true
        }
    }

    rpc.setActivity(activity);
    
}


function toggleRPC(b) {
     isEnable = b || !enable;

    if(isEnable) {
        enable = true;

        updateRPC();
    } else {
        enable = false;

        rpc.clearActivity();
    }
}