const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureButton = document.getElementById('capture');
const submitButton = document.getElementById('submit');
const context = canvas.getContext('2d');

// Mengaktifkan kamera
navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
    video.srcObject = stream;
}).catch(err => console.error("Error mengakses kamera:", err));

// Tombol untuk menangkap gambar dari video
captureButton.addEventListener('click', () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
});

// Tombol untuk mengirim gambar sebagai login
submitButton.addEventListener('click', async () => {
    const image = canvas.toDataURL(); // Konversi gambar ke base64

    try {
        const res = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image })
        });

        if (res.ok) {
            alert('Login berhasil!');
            window.location.replace('/docs.html'); // Redirect setelah sukses
        } else {
            alert('Login gagal!');
        }
    } catch (error) {
        console.error("Error saat login:", error);
        alert('Terjadi kesalahan, coba lagi.');
    }
});