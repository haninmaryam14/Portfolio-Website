// Paths for images inside the assets folder
const image1 = "assets/images/Photo.png";
const image2 = "assets/images/Photo2.png";

const profileImg = document.getElementById("profile-img");
const profileArch = document.querySelector(".profile-arch");

// 1. When the cursor ENTERS the arch area
profileArch.addEventListener("mouseenter", () => {
    profileImg.style.opacity = "0"; // Smooth fade out
    
    setTimeout(() => {
        profileImg.setAttribute("src", image2); // Change to Variant 2
        profileImg.style.opacity = "1"; // Smooth fade in
    }, 200); // Happens quickly during the fade transition
});

// 2. When the cursor LEAVES the arch area
profileArch.addEventListener("mouseleave", () => {
    profileImg.style.opacity = "0"; // Smooth fade out
    
    setTimeout(() => {
        profileImg.setAttribute("src", image1); // Change back to the original Photo
        profileImg.style.opacity = "1"; // Smooth fade in
    }, 200);
});
// ==========================================================================
// DETEKSI SCROLL UNTUK AKSI PINDAH SHAPE UNGU DI NAVBAR
// ==========================================================================

const sections = document.querySelectorAll("section, .hero-section, .about-section");
const navItems = document.querySelectorAll(".nav-item");

window.addEventListener("scroll", () => {
    let currentSectionId = "home"; // Standar awal berada di home
    
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // Memantau batas atas layar monitor dengan presisi piksel yang pas
        if (window.scrollY >= (sectionTop - 200)) {
            currentSectionId = section.getAttribute("id");
        }
    });

    navItems.forEach((item) => {
        item.classList.remove("active");
        
        // Cek kecocokan target href dengan posisi section sekarang
        const hrefValue = item.getAttribute("href");
        if (hrefValue === `#${currentSectionId}`) {
            item.classList.add("active");
        }
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".skill-card");

    cards.forEach((card) => {
        const readMoreBtn = card.querySelector(".btn-readmore");
        const backBtn = card.querySelector(".btn-back");

        // Aksi ketika tombol Read More diklik
        readMoreBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();

            cards.forEach((c) => {
                if (c === card) {
                    c.classList.add("is-expanded");
                    c.classList.remove("is-hidden");
                } else {
                    c.classList.add("is-hidden");
                    c.classList.remove("is-expanded");
                }
            });
        });

        // Aksi ketika tombol Kembali diklik
        backBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();

            cards.forEach((c) => {
                c.classList.remove("is-expanded");
                c.classList.remove("is-hidden");
            });
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("skillsModal");
    const modalBgImg = document.getElementById("modalBgImg");
    const modalContent = document.getElementById("modalContent");
    const closeModalBtn = document.getElementById("closeModal");
    const readMoreBtns = document.querySelectorAll(".btn-readmore");

    readMoreBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            
            const card = btn.closest(".skill-card");
            
            // 1. Ambil Gambar dari Card Awal untuk Dipindah ke Modal Background
            const srcImg = card.querySelector(".card-bg-img").getAttribute("src");
            modalBgImg.setAttribute("src", srcImg);

            // 2. Ambil Template HTML Detail Tersembunyi
            const templateHTML = card.querySelector(".hidden-modal-template").innerHTML;
            
            // PENTING: Menggunakan innerHTML (bukan .html) agar tidak memicu crash script
            modalContent.innerHTML = templateHTML; 

            // 3. Tampilkan Jendela Overlay Modal
            modal.classList.add("is-active");

            // 4. Jalankan Animasi Pengisian Bar Kemampuan
            setTimeout(() => {
                const fills = modalContent.querySelectorAll(".bar-inner-fill");
                fills.forEach(f => {
                    const targetWidth = f.getAttribute("data-width");
                    f.style.width = targetWidth;
                });
            }, 150);
        });
    });

    // Aksi Menutup Jendela Modal Ekspansi
    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", () => {
            modal.classList.remove("is-active");
        });
    }

    // Klik di Luar Kotak Otomatis Menutup Modal
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("is-active");
        }
    });
});

