/**
 * Dark Version of the Javascript for HW4 Cob's Soul Music.
 * Eric D'Alessandro - CS480B Spring 2022.
 */

/**
 * NOTICE:
 * I'm not sure why but this page will not function properly in Vivaldi. It works fine in Edge so I don't think it's a Chromium issue so if none of the Javascript is working, please try another browser.
 * It works fine on GitHub Pages but for running locally, Vivaldi no worky.
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
        this.timesListened = 0
    }
}

// Ensure body has loaded before script can run.
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready()
}

var hasAccount
var songPlaying
var currentSong
var songList
var audio
var topSongs

function ready() {
    songPlaying = false
    hasAccount = false
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
 * Changes what genre of songs is displayed in the main content area based on the genre passed in.
 * @param {*} genre 
 */
function changeGenre(genre) {
    if (genre === "soul") {
        document.getElementsByClassName('main-content')[0].style.display = 'block'
        document.getElementsByClassName('song-list-normal')[0].style.display = 'none'
        document.getElementsByClassName('song-list-soul')[0].style.display = 'block'
        document.getElementsByClassName("add-cc")[0].style.display = 'none'
        document.getElementsByClassName("signup-signin")[0].style.display = 'none'
    } else if (genre === "normal") {
        document.getElementsByClassName('main-content')[0].style.display = 'block'
        document.getElementsByClassName('song-list-soul')[0].style.display = 'none'
        document.getElementsByClassName('song-list-normal')[0].style.display = 'block'
        document.getElementsByClassName("add-cc")[0].style.display = 'none'
        document.getElementsByClassName("signup-signin")[0].style.display = 'none'
    } else if (genre === "none") {
        document.getElementsByClassName('song-list-soul')[0].style.display = 'none'
        document.getElementsByClassName('song-list-normal')[0].style.display = 'none'
        document.getElementsByClassName('main-content')[0].style.display = 'none'
    } else {
        document.getElementsByClassName('main-content')[0].style.display = 'block'
        document.getElementsByClassName('song-list-soul')[0].style.display = 'block'
        document.getElementsByClassName('song-list-normal')[0].style.display = 'block'
        document.getElementsByClassName("add-cc")[0].style.display = 'none'
        document.getElementsByClassName("signup-signin")[0].style.display = 'none'
    }
}

/**
 * Play the desired song. The absolute/relative path or url must be passed in.
 * @param {*} songpath 
 */
function playSong(songpath) {
    if (!hasAccount) {
        forceSignUp()
    } else {
        if (audio !== undefined) {
            audio.pause()
        }
        audio = new Audio(songpath)
        for (var i=0; i<songList.length; i++) {
            if (songList[i].path === songpath) {
                songList[i].timesListened++
            }
        }
        audio.play()
        if (currentSong == undefined) {
            togglePlayPause()
        }
        currentSong = songpath
        updateCurrentSongLabel()
        updateSongRankings()
    }
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
 * Sort the topSongs array in decending order my most plays and update the 'Your Top Songs' panel.
 */
function updateSongRankings(){
    topSongs = []
    for (var i=0; i<songList.length; i++) {
        if (songList[i].timesListened > 0) {
            topSongs.push(songList[i])
        }
    }
    if (topSongs !== undefined) {
        topSongs.sort(function(a, b){return a.timesListened-b.timesListened}).reverse()
    }

    for (var i=0; i<topSongs.length; i++) {
        document.getElementsByClassName('song-list-item')[i].textContent = i+1 + ".) " + topSongs[i].title + " - " + topSongs[i].artist + ". Plays: " + topSongs[i].timesListened
        document.getElementsByClassName('song-list-item')[i].style.display = 'block'
    }

}

/**
 * Adds the song currently playing to the "Favorites" tab.
 */
function favoriteCurrentSong() {
   if (!hasAccount) {
       forceSignUp()
   } else {
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
}

/**
 * Prompts user to create an account with an alert.
 */
function forceSignUp() {
    if (hasAccount) {
        return
    } else {
        alert("Please register an account to use this feature.")
    }
}

/**
 * Shows the passed in page.
 * @param {*} type 
 * @returns 
 */
function showPage(type) {
    if(hasAccount) {
        return
    } else if (type === 'signup') {
        changeGenre('none')
        document.getElementsByClassName("add-cc")[0].style.display = 'none'
        document.getElementsByClassName("signup-signin")[0].style.display = 'block'
    } else if (type === 'cc') {
        changeGenre('none')
        document.getElementsByClassName('signup-signin')[0].style.display = 'none'
        document.getElementsByClassName("add-cc")[0].style.display = 'block'
    }
}

/**
 * Toggles the show/hide password option.
 */
 function showPassword(){
    var p = document.getElementById("password")
    if(p.type === "password") {
        p.type = "text"
    } else {
        p.type = "password"
    }
}

/**
 * Removes acccount restrictions.
 */
function unlockContent() {
    hasAccount = true
}

/**
 * Guilts the user to leave make donations checked.
 */
function guiltTrip(checkbox){
    if (checkbox.checked == false) {
        alert("Are you sure? Our starving developers are paid entirely based on donations...")
    }
}