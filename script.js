/**
 * NOTICE:
 * I'm not entirely sure why but this page will not function properly in Vivaldi. It works fine in Edge so I don't think it's a Chromium issue so if none of the Javascript is working, please try another browser.
 * It may end up working fine on GitHub pages but at least for running locally, Vivaldi no worky.
 */

/**
 * There's a lot of the HTML that I could retrofit to utilize this class but I made this after basically doing all of it and I'd rather focus on other things.
 */
class song {
    constructor(title, artist, path, buttonId) {
        this.title = title
        this.artist = artist
        this.path = path
        this.buttonId = buttonId
    }
}

// Ensure body has loaded before script can run.
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready()
}

var songPlaying
var currentSong
var songList
var audio

function ready() {
    songPlaying = false
    songList = [
        new song('I Heard It Through the Grapevine', 'Marvin Gaye', 'media/songs/soul-music/i-heard-it-through-the-grapevine-marvin-gaye.mp3', 'grapevine'),
        new song('Africa', 'Toto', 'media/songs/totally-normal-songs/africa.mp3', 'africa'),
        new song("Ain't that a Kick in the Head", 'Dean Martin', 'media/songs/totally-normal-songs/aint-that-a-kick-in-the-head.mp3', 'deano'),
        new song('Hey There Delilah', "Plain White T's", 'media/songs/totally-normal-songs/hey-there-delilah.mp3', 'delilah'),
        new song('September', 'Earth, Wind, & Fire', 'media/songs/totally-normal-songs/september.mp3', 'september'),
        new song("Stayin' Alive", 'Bee Gees', 'media/songs/totally-normal-songs/stayin-alive.mp3', 'alive'),
        new song("You're Welcome from Moana", 'Dwayne "The Rock" Johnson', 'media/songs/totally-normal-songs/youre-welcome-from-moana.mp3', 'moana')
    ]
}

/**
 * Toggle pause / play of the current song and change the icon in the media player.
 */
function togglePlayPause() {
    if (songPlaying){
        document.getElementsByClassName('playPauseButton')[0].src = 'media/icons/play.png'
        audio.pause()
    }else{
        document.getElementsByClassName('playPauseButton')[0].src = 'media/icons/pause.png'
        audio.play()
    }

    songPlaying = !songPlaying
}

/**
 * Moves to the song in the array {amount} away from the current song.
 * @param {*} amount 
 */
function skipSong(amount) {
    currentSong = songList[songList.findIndex(currentSong+amount)]
}

/**
 * Changes what genre of songs is displayed in the main content area based on the genre passed in.
 * @param {*} genre 
 */
function changeGenre(genre) {
    if (genre === "soul") {
        document.getElementsByClassName('song-list-normal')[0].style.display = 'none'
        document.getElementsByClassName('song-list-soul')[0].style.display = 'block'
    } else if (genre === "normal") {
        document.getElementsByClassName('song-list-soul')[0].style.display = 'none'
        document.getElementsByClassName('song-list-normal')[0].style.display = 'block'
    } else {
        document.getElementsByClassName('song-list-soul')[0].style.display = 'block'
        document.getElementsByClassName('song-list-normal')[0].style.display = 'block'
    }
}

/**
 * Play the desired song. The absolute/relative path or url must be passed in.
 * @param {*} songpath 
 */
function playSong(songpath) {
    if (audio !== undefined) {
        audio.pause()
    }
    console.log(songpath)
    audio = new Audio(songpath)
    audio.play()
    if (currentSong == undefined) {
        togglePlayPause()
    }
    currentSong = songpath
    updateCurrentSongLabel()
}

/**
 * Updates the "Now Playing:" label in the media player.
 */
function updateCurrentSongLabel() {
    var newSong
    if (currentSong !== undefined) {
        for (var i=0; i<songList.length; i++) {
            if (songList[i].path === currentSong) {
                newSong = songList[i].title + " - " + songList[i].artist
            }
        }
        document.getElementsByClassName('current-song-p')[0].textContent = newSong
    }
}

/**
 * Adds the song currently playing to the "Favorites" tab.
 */
function favoriteCurrentSong() {
    var buttonId
    if (currentSong !== undefined) {
        for (var i=0; i<songList.length; i++) {
            if (songList[i].path === currentSong) {
                buttonId = songList[i].buttonId
            }
        }
        document.getElementById(buttonId).style.display = "block"
    }
}