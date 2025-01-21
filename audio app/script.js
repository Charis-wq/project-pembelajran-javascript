let playlist = JSON.parse(localStorage.getItem('playlist')) || [];
let currentIndex = 0;

//Get element from DOM
const audio = document.getElementById('audio');
const playIcon = document.getElementById('play-icon');
const pauseIcon = document.getElementById('pause-icon');
const progresBar = document.getElementById('progress-bar');
const playlistElement = document.getElementById('playlist');
const audioUpload = document.getElementById('audio-upload');
const currentTrack = document.getElementById('current-track');
const playPauseButton = document.getElementById('play-pause');

//function to create playlist
function creatPlaylist(){
    playlistElement.innerHTML = ''
    playlist.forEach((track, index) => {
        const li = document.createElement('li')
        li.textContent = track.title
        li.dataset.index = index

        //add eventlistener click
        li.addEventListener('click', () => {
            loadTrack(index)
            audio.play()
        });
        playlistElement.appendChild(li)
    });
    updateActiveTrack()

};

//function to update active track
function  updateActiveTrack(){
    document.querySelectorAll('#playlist li').forEach((item, index) => {
        item.classList.toggle('active', index === currentIndex)
    })
};

//function to load track
function loadTrack(index){
    currentIndex = index
    const track = playlist[currentIndex]
    audio.src = track.src
    currentTrack.textContent = track.title
    updateActiveTrack()
};

//function to save playlist localstorage
function savePlaylist(){
    localStorage.setItem('playlist', JSON.stringify(playlist))
};

//function to update play pause icon
function updatePlayPause(){
    if(audio.paused){
        playIcon.style.display = 'block'
        pauseIcon.style.display = 'none'
    }else{
        playIcon.style.display = 'none'
        pauseIcon.style.display = 'block'
    }
};

//addeventlistener
playPauseButton.addEventListener('click', () => {
    if (audio.paused) {
        audio.play()
    } else {
        audio.pause()
    }
    updatePlayPause();
});

//to progress bar
audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100
    progresBar.style.width = `${progress}%`
});

//to end track
audio.addEventListener('ended', () => {
    loadTrack((currentIndex + 1) % playlist.length);
    audio.play()
});

audioUpload.addEventListener('change', (event) => {
    const files = Array.from(event.target.files)
    files.forEach(file => {
        if (!file.type.startsWith('audio/')) {
            alert('Only audio files are allowed!')
            return
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const track = {
                title: file.name,
                src: e.target.result,
            };
            playlist.push(track)
            creatPlaylist()
            savePlaylist()
        }
        reader.readAsDataURL(file)
    });
});

// Initialize
if (playlist.length > 0) {
    loadTrack(0)
} else {
    currentTrack.textContent = 'No track available';
};
creatPlaylist()
