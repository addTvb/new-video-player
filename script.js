'use strict';

let video = document.querySelector('#video');
// * Buttons
let playPauseBtn = document.querySelector('#playPauseBtn');
let stopBtn = document.querySelector('#stopBtn');
let muteBtn = document.querySelector('#muteBtn');
let minusBtn = document.querySelector('#minusBtn');
let plusBtn = document.querySelector('#plusBtn');
// * Progress
let progress = document.querySelector('#progress');
let progressBar = document.querySelector('#progressBar');

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
	progressBar.style.width = Math.floor(
		(video.currentTime / video.duration) * 100 + '%'
	);
});
