const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const usernameInput = document.getElementById('username');
const captureButton = document.getElementById('capture');
const submitButton = document.getElementById('submit');
const context = canvas.getContext('2d');

navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
    video.srcObject = stream;
});

captureButton.addEventListener('click', () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
});

submitButton.addEventListener('click', async () => {
    const username = usernameInput.value.trim();
    if (!username) return alert('Username wajib diisi!');
    const image = canvas.toDataURL();

    const res = await fetch('/daftar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, image })
    });

    if (res.ok) alert('Pendaftaran berhasil!');
    else alert('Pendaftaran gagal!');
});
