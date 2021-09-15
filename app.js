var rpc;

setTimeout(function() {

    /* Constants */

    const playPause = document.getElementsByClassName("is-highlight")[0];
    const sliderTime = document.getElementsByClassName("slider-counter-max")[0];

    const clientId = '887417020730204160';


    /* Rich Presence */

    discordrpc = require('discord-rpc');

    rpc = new discordrpc.Client({ transport: 'ipc' });
    rpc.login({ clientId });

    rpc.on("ready", () => {
        updateRPC(playPause.getAttribute('aria-label') !== 'Pause');
    });


    /* Events */

    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if(mutation.attributeName === 'aria-label')
                setTimeout(function() {
                    updateRPC(playPause.getAttribute('aria-label') !== 'Pause');
                }, 1);
            else
                updateRPC();
        });
    });

    observer.observe(playPause, { attributes: true, attributeFilter: ['aria-label'] });
    observer.observe(sliderTime, { characterData: true, attributes: false, childList: false, subtree: true });

}, 10000);

function updateRPC(pause=false) {

    const track = document.getElementsByClassName("track-link");
    const current = document.getElementsByClassName("slider-counter-current")[0].innerHTML.split(":");
    const max = document.getElementsByClassName("slider-counter-max")[0].innerHTML.split(":");

    const song = track[0].innerHTML;
    const artist = track[1].innerHTML;

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

        const seconds = (parseInt(max[0]) * 60 + parseInt(max[1])) - (parseInt(current[0]) * 60 + parseInt(current[1]));
        const endTimestamp = Date.now() + seconds * 1000;

        activity = {
            details: song,
            state: artist,
            largeImageKey: 'logo',
            largeImageText: 'Deezer',
            smallImageKey: 'play',
            smallImageText: 'Listening',
            endTimestamp,
            instance: true
        }
    }

    rpc.setActivity(activity);
    
}