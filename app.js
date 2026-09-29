console.log("Bismillah Praktikum Dimulai");
// Aktifitas 1 DOM SLECTION / Seleksi Elemen
// Kenapa kita harus seleksi karena "menangkap" atau ambil id/class
// Mengambil elemen html tersubut lalu disimpan di variabel javascript

// 1. mengambil elemen judul utama dan sub judul
// document.getlementById("...") mengambil berdasarkan atribut id

const judulUtama = document.getElementById("judul-utama"); // menangkap: <h1 id="judul-utama">

// document.querySelector("#...")
// tanda # artinya Id

const subJudul = document.querySelector("#sub-judul"); // menangkap: <p id="sub-jud">

// 2. Mengambil Elemen pada kartu 1 (kartu manipulasi teks & style)
const teksPreview = document.getElementById("teks-preview");
const boxPreview = document.getElementById("box-preview");
const cardManipulasi = document.getElementById("card-manipulasi");

// 3. Mengambil elemen tombol - tombol aksi pada kartu 1
const btnUbahTeks = document.getElementById("btn-ubah-teks");
const btnToggleWarna = document.getElementById("btn-toggle-warna");
const btnReset = document.getElementById("btn-reset");

// 4. Mengambil Elemen pada kartu 2 (fitur catatn dinamis / to do list sederhana)
const inputCatatan = document.getElementById("input-catatan");
const btnTambah = document.getElementById("btn-tambah");
const daftarCatatn = document.getElementById("daftar-catatan");
const jumlahCatatan = document.getElementById("jumlah-catatan");
const pesanKosong = document.getElementById("pesan-kosong");

// Aktivitas ke 2 manipulasi teks & style (card 1)
// addEventListener("click", function() {...}) artinya adalah Tolong dengarkan dulu/ tunggu 
// sampai di klik user. Jika di klik jalankan perintah didalam function

// A. Mengubah teks & warna secara langsung

btnUbahTeks.addEventListener("click", function() {
//.innertext = mengganti atau mengisi secara langsung teks yang ada di elemen html
teksPreview.innerText ="Hebat! Teks ini berhasil diubah pake DOM"

//.style.color = mengubah warna teks secara langsung (Inline Style)
teksPreview.style.color ="#4138ee";

// console.log = mencetak pesan di console style
console.log("[DOM] Teks preview telaha diperbarui!");
});

// B. manipulasi class css menggunakan classList.toggle()
btnToggleWarna.addEventListener("click", function () {
    // .classlist.toggle("nama-class") = fitur saklar otomatis (ON/OFF)
    boxPreview.classList.toggle("active-mode");
    cardManipulasi.classList.toggle("highlight");

    console.log("DOM Berhasil di switch!");
});

// C. Mengembalikan (reset) teks ke kondisi semula
btnReset.addEventListener("click", function() {
    // 1. Kembalikan teks semula ke teks asli
    teksPreview.innerText = "Halo! Teks ini siap diubah oleh Javascript";

    // 2. Kosongkan warna agar kembali ke warna css bawaan 
    teksPreview.style.color = "";

    // 3. Hapus class khusus untuk menggunakan .classList.remove("")
    boxPreview.classList.remove("active-mode");
    cardManipulasi.classList.remove("highlight");

    console.log("DOM Tampilan di Reset")
});

// Aktivitas 3 & 4 : Elemen dinamis & event handling (To Do List sederhana)
// Di aktivitas ini jika kita belajar elemen HTML baru (<li>) secara otomatis dalam javascript
// Mengisi teksmya, memberi tombol hapus, lalu menempelkan ke layar (<li>)

// Langkah 1: Membuat Variabel penampung angka jumlah catatan
// "let" digunakan untuk niali variabel yang akan berubah ubah bisa bertambah bisa berkurang (counting)
let totalCatatan = 0;

// Langkah 2: Fungsi Update angka counter & pesan status 
function perbaruiJumlah() {
    // masukkan angka total catatan kedalam tag <span id="jumlah-catatan">
    jumlahCatatan.innerText = totalCatatan;

    // conditional statement berupa apakah catatan nya itu kosong / 0?
    if (totalCatatan === 0) {
        // jika 0: haous class "hidden" supaya teks "belu ada catatan" muncul ke layar
    pesanKosong.classList.remove("hidden");
    } else {
        // Jika > 0: tambahkan class "hidden" agar teks "belum ada catatan" tersembunyi
        pesanKosong.classList.add("hidden");
    }

}

// Langkah 3 : Fungsi utama logika tambah catatan baru
function tambahCatatan() {
    // 3.1 inputCatatan.value fungsinya untuk mengambil teks yang fikrtik oleh user
    // .trim() : mengahapus spasi di awal dan di akhir
    const isiTeks = inputCatatan.value.trim();

    // 3.2 Validasi input : jika isi teks kosong maka tampilkan alrt
    if (isiTeks === "") {
        alert("Catatan kamu tidak boleh kosong!");
        return;
    }

    // 3.3 document.createElement("li") -> membuat memori di javascript secara dinamis 
    const liBaru = document.createElement("li");
    liBaru.className = "note-item"; // menampilkan tag li

    // 3.4 innerHTML = mengisi struktur didalam <li> dengan teks catatan dan tombol hapus 
    // Tanda backtick (`)
   liBaru.innerHTML = `<span>${isiTeks}</span> <button class="btn-hapus">Hapus</button>`;

    // 3.5 menambahkan telinga / event listener untuk tombol hapus pada catatan dinamis
    // liBaru.querySelector(".btn-hapus") = mengambil tombol ber class "btn-hapus" khusus yang ada di li
    const btnHapus = liBaru.querySelector(".btn-hapus");
    btnHapus.addEventListener("click", function () {
        liBaru.remove(); // menghapus element list dari layar HTML
        totalCatatan--; // totalCatatan dikurangi sebanyak 1x 
        perbaruiJumlah(); // panggil fungsi pembaruan jumlah untuk update angka di layar
        console.log('Dom Catatan ${isiTeks} dihapus. ');
    });

    // 3.6  appendChild = memasukan element li kedalam wadah <ul id="daftar-catatan">
    daftarCatatn.appendChild(liBaru);

    // 3.7 mengosongkan kembali isi kolom input (inputCatatan.value = "")supaya bisa diketik lagi
    inputCatatan.value = "";

    // 3.8 total catatan++ artinya tambah nilai catatan sebnayak 1, lalu update angka ke layar
    totalCatatan++;
    perbaruiJumlah();

    console.log('Dom Catatan ${isiTeks} dihapus. ');

} 

// Langkah 4 : event listener klik tombol + "Tambah"
// ketika tombol + "tambah" di klik oleh user, maka jalankan fungsi tambah catatan()
btnTambah.addEventListener("click", function() {
    tambahCatatan();
});

// Langkah 5 : event listener keyboard "Enter" pada kolom input
// ketika user mengetik di kolom input dan melepas tombol keyboard ('Event keyup);
inputCatatan.addEventListener("keyup", function(event) {
    // periksa apakah tombol keyboard yang ditekan user adalah enter?
    if (event.key === "Enter") {
        tambahCatatan(); // jika ya, jalankan fungsi tambahCatatan();
    }
});