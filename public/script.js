const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const captureBtn = document.getElementById("captureBtn");
const fotoInput = document.getElementById("foto");
const form = document.querySelector("form");

// Akses kamera
navigator.mediaDevices
  .getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
  })
  .catch((err) => {
    console.error("Gagal mengakses kamera:", err);
  });

// Tangkap gambar dari kamera
captureBtn.addEventListener("click", () => {
  const context = canvas.getContext("2d");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Convert gambar ke Base64
  const dataURL = canvas.toDataURL("image/png");
  fotoInput.value = dataURL;
  alert("Foto berhasil diambil!");
});

// Kirim data ke server
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const endpoint = form.id === "daftarForm" ? "/daftar" : "/login";

  const response = await fetch(endpoint, {
    method: "POST",
    body: JSON.stringify({
      username: form.username ? form.username.value : undefined,
      foto: fotoInput.value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();
  alert(result.message);
});
