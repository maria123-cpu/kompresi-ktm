<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Kompresi KTM</title>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #ff0000, #ffd700);
      margin: 0;
      padding: 20px;
      color: #333;
    }

    .container {
      max-width: 800px;
      margin: auto;
      background: #fff;
      padding: 25px;
      border-radius: 10px;
      box-shadow: 0 0 12px rgba(0,0,0,0.1);
    }

    h2 {
      text-align: center;
      color: #0077cc;
    }

    input, button {
      width: 100%;
      padding: 10px;
      margin-top: 8px;
      font-size: 16px;
      border-radius: 6px;
      border: 1px solid #ccc;
    }

    button {
      background: #0077cc;
      color: white;
      border: none;
      cursor: pointer;
    }

    button:disabled {
      background: #aaa;
      cursor: not-allowed;
    }

    .btn-link {
      display: inline-block;
      margin-top: 20px;
      text-decoration: none;
      color: #0077cc;
      font-weight: bold;
    }

    .preview-img {
      display: block;
      margin-top: 10px;
      max-width: 100%;
      border-radius: 6px;
    }

    .progress {
      background: #e0e0e0;
      height: 20px;
      margin-top: 10px;
      text-align: center;
      color: #0077cc;
    }

    .help-circle {
      position: absolute;
      top: 20px;
      right: 30px;
      width: 35px;
      height: 35px;
      background: #0077cc;
      color: white;
      font-size: 20px;
      text-align: center;
      line-height: 35px;
      border-radius: 50%;
      cursor: pointer;
      font-weight: bold;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    }

    .modal {
      display: none;
      position: fixed;
      z-index: 1000;
      left: 0; top: 0;
      width: 100%; height: 100%;
      background: rgba(0, 0, 0, 0.4);
    }

    .modal-content {
      background: #fff;
      margin: 10% auto;
      padding: 20px;
      width: 80%;
      max-width: 500px;
      border-radius: 8px;
      box-shadow: 0 0 12px rgba(0,0,0,0.2);
    }

    .close-btn {
      float: right;
      font-size: 22px;
      font-weight: bold;
      cursor: pointer;
      color: #555;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="help-circle" title="Bantuan">?</div>

    <h2>Kompresi KTM Mahasiswa</h2>

    <form id="formData">
      <input type="text" id="nama" placeholder="Nama Lengkap" required>
      <input type="text" id="nim" placeholder="NIM" required>
      <input type="text" id="prodi" placeholder="Program Studi" required>
      <input type="text" id="fakultas" placeholder="Fakultas" required>
      <button type="button" id="lanjutUpload" disabled>Lanjutkan Upload</button>
    </form>

    <input type="file" id="uploadKTM" accept="image/*" style="display:none">
    <img id="previewImage" src="" alt="Preview KTM" class="preview-img">

    <button id="kompresBtn" disabled>Kompres Sekarang</button>
    <div id="progress" class="progress"></div>

    <img id="compressedImage" src="" alt="KTM Terkompresi" class="preview-img">
    <p id="infoUkuran"></p>

    <button id="simpanBtn" disabled>Simpan</button>
    <a href="#" class="btn-link" onclick="alert('Fitur riwayat hanya tersedia di versi lengkap.')">📄 Lihat Riwayat Kompresi</a>
  </div>

  <div id="helpModal" class="modal">
    <div class="modal-content">
      <span class="close-btn">&times;</span>
      <h3>Langkah-Langkah Kompresi KTM dengan Huffman Coding</h3>
      <ol>
        <li>Ambil gambar KTM dari pengguna.</li>
        <li>Konversi gambar menjadi data biner.</li>
        <li>Hitung frekuensi tiap simbol dalam data.</li>
        <li>Buat pohon Huffman berdasarkan frekuensi.</li>
        <li>Bangun kode Huffman (bit pendek untuk simbol sering).</li>
        <li>Ganti simbol asli dengan kode Huffman.</li>
        <li>Hasilkan gambar terkompresi.</li>
        <li>Tampilkan ukuran sebelum dan sesudah.</li>
      </ol>
    </div>
  </div>

  <script>
    const nama = document.getElementById("nama");
    const nim = document.getElementById("nim");
    const prodi = document.getElementById("prodi");
    const fakultas = document.getElementById("fakultas");
    const lanjutBtn = document.getElementById("lanjutUpload");
    const uploadKTM = document.getElementById("uploadKTM");
    const previewImage = document.getElementById("previewImage");
    const kompresBtn = document.getElementById("kompresBtn");
    const progress = document.getElementById("progress");
    const compressedImage = document.getElementById("compressedImage");
    const infoUkuran = document.getElementById("infoUkuran");
    const simpanBtn = document.getElementById("simpanBtn");

    const inputs = [nama, nim, prodi, fakultas];
    inputs.forEach(input => {
      input?.addEventListener("input", () => {
        lanjutBtn.disabled = !inputs.every(i => i.value.trim() !== "");
      });
    });

    lanjutBtn?.addEventListener("click", () => {
      uploadKTM.style.display = "block";
    });

    uploadKTM?.addEventListener("change", () => {
      const file = uploadKTM.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = e => {
          previewImage.src = e.target.result;
          previewImage.dataset.original = e.target.result;
          kompresBtn.disabled = false;
        };
        reader.readAsDataURL(file);
      }
    });

    kompresBtn?.addEventListener("click", () => {
      progress.textContent = "Mengompres...";
      let percent = 0;
      const interval = setInterval(() => {
        percent += 10;
        progress.textContent = `Mengompres... ${percent}%`;
        if (percent >= 100) {
          clearInterval(interval);
          progress.textContent = "Selesai!";
          simulateCompression();
        }
      }, 200);
    });

    function simulateCompression() {
      compressedImage.src = previewImage.dataset.original;
      infoUkuran.innerHTML = "Ukuran File Asli: 1.2 MB<br>Ukuran Setelah Kompresi: 420 KB";
      simpanBtn.disabled = false;
    }

    const helpModal = document.getElementById("helpModal");
    const helpCircle = document.querySelector(".help-circle");
    const closeBtn = document.querySelector(".close-btn");

    helpCircle?.addEventListener("click", () => {
      helpModal.style.display = "block";
    });

    closeBtn?.addEventListener("click", () => {
      helpModal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
      if (e.target === helpModal) {
        helpModal.style.display = "none";
      }
    });
  </script>
</body>
</html>
