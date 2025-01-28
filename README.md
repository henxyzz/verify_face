# Sistem Login/Registrasi Menggunakan Pengenalan Wajah

Selamat datang di project **Sistem Login/Registrasi Menggunakan Pengenalan Wajah**! Project ini menggunakan **face-api.js** untuk pengenalan wajah guna menyediakan sistem login dan registrasi yang aman dan mudah.

## 🚀 Fitur

- **Registrasi Wajah**: Daftarkan wajah Anda melalui kamera untuk menyimpan ciri khas wajah Anda.
- **Login dengan Pindai Wajah**: Masuk hanya dengan memindai wajah Anda, tanpa perlu username atau password!
- **Autentikasi Aman**: Data wajah disimpan secara aman dan hanya digunakan untuk autentikasi.
- **UI Cyberpunk**: Antarmuka pengguna yang ramping dan modern dengan tema futuristik cyberpunk.
- **API Endpoints**: Rute API kustom untuk menangani operasi registrasi dan login.

## 📸 Cara Kerja

1. **Registrasi**:
   - Buka halaman registrasi.
   - Ambil foto wajah Anda menggunakan kamera.
   - Sistem akan menyimpan data wajah Anda untuk pengenalan di masa depan.

2. **Login**:
   - Masuk ke halaman login.
   - Pindai wajah Anda menggunakan kamera.
   - Sistem akan membandingkan wajah Anda dengan data yang tersimpan untuk memberikan akses.

3. **Pengenalan Wajah**:
   - Data wajah dianalisis menggunakan **TensorFlow.js** dan **face-api.js** untuk akurasi tinggi.
   - Tidak perlu password—wajah Anda adalah password Anda!

## ⚙️ Teknologi yang Digunakan

- **Node.js**: Server backend untuk menangani permintaan API dan logika pengenalan wajah.
- **face-api.js**: Perpustakaan JavaScript untuk deteksi dan pengenalan wajah.
- **TensorFlow.js**: Framework untuk melakukan pembelajaran mesin langsung di browser.
- **Express.js**: Framework ringan untuk menangani rute server.
- **UI Cyberpunk**: Tema kustom untuk antarmuka pengguna dengan estetika cyberpunk.
- **HTML/CSS/JavaScript**: Untuk antarmuka web dan integrasi kamera.

## 🌐 Instalasi

Untuk menjalankan project ini secara lokal:

1. Clone repository:
   ```bash
   git clone https://github.com/henxyzz/verify_face.git
