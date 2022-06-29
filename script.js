'use strict';

let video = document.querySelector('#video');
// * Buttons
let playPauseBtn = document.querySelector('#playPauseBtn');
let muteBtn = document.querySelector('#muteBtn');
let minusBtn = document.querySelector('#minusBtn');
let plusBtn = document.querySelector('#plusBtn');
// * Progress
let progress = document.querySelector('#progress');
let progressBar = document.querySelector('#progress-bar');

const startStopVideo = () => {
	let videoState = playPauseBtn.getAttribute('data-video-state');

	if (videoState === 'pause') {
		video.play();
		playPauseBtn.setAttribute('data-video-state', 'play');
	} else {
		video.pause();
		playPauseBtn.setAttribute('data-video-state', 'pause');
	}
};

playPauseBtn.addEventListener('click', startStopVideo);

video.addEventListener('loadedmetadata', () => {
	progress.setAttribute('max', video.duration);
});

video.addEventListener('timeupdate', () => {
	progress.value = video.currentTime;
	progressBar.style.width =
		Math.floor((video.currentTime / video.duration) * 100) + '%';
});

progress.addEventListener('click', function (event) {
	let pos =
		(event.pageX -
			(this.offsetLeft +
				this.offsetParent.offsetLeft +
				this.offsetParent.offsetLeft)) /
		this.offsetWidth;

	video.currentTime = pos * video.duration;
});

muteBtn.addEventListener('click', () => (video.muted = !video.muted));

minusBtn.addEventListener('click', () => {
	let currentVolume = Math.floor(video.volume * 10) / 10;
	if (currentVolume > 0) video.volume -= 0.1;

	if (currentVolume <= 0) video.muted = true;
	else video.muted = false;
});

plusBtn.addEventListener('click', () => {
	let currentVolume = Math.floor(video.volume * 10) / 10;
	if (video.muted) video.muted = false;
	if (currentVolume < 1) video.volume += 0.1;
});
