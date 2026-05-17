// ==========================================================================
// PORTFOLIO FOLDER INSTANT HOVER INTERACTION
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    const folderImages = document.querySelectorAll(".folder-img");

    folderImages.forEach(img => {
        // Simpan path awal (gambar normal) ke dalam memori elemen
        const originalSrc = img.getAttribute("src");
        const hoverSrc = img.getAttribute("data-hover");

        // Ketika Mouse Masuk Area Folder (Instant Change)
        img.addEventListener("mouseenter", () => {
            if (hoverSrc) {
                img.setAttribute("src", hoverSrc);
            }
        });

        // Ketika Mouse Meninggalkan Area Folder (Kembali Semula)
        img.addEventListener("mouseleave", () => {
            img.setAttribute("src", originalSrc);
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    // 1. Ambil elemen navbar dan section portfolio
    const navbar = document.querySelector(".navbar"); // Ganti nama class sesuai navbar asli kamu
    const portfolioSection = document.getElementById("portfolio");

    if (navbar && portfolioSection) {
        // 2. Atur konfigurasi kapan deteksi dipicu
        const options = {
            root: null, // Menggunakan viewport browser sebagai acuan
            rootMargin: "-80px 0px -20px 0px", // Mengompensasi tinggi navbar agar transisi warna pas saat menyentuh batas
            threshold: 0.15 // Aktif jika minimal 15% area portfolio sudah terlihat di layar
        };

        // 3. Buat fungsi observer untuk pasang/lepas class penanda
        const portfolioObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Jika layar sedang berada di section Portfolio, tambahkan class gelap
                    navbar.classList.add("nav-light-mode");
                } else {
                    // Jika keluar dari section Portfolio, hapus class gelap (kembali normal)
                    navbar.classList.remove("nav-light-mode");
                }
            });
        }, options);

        // 4. Jalankan deteksi pada section portfolio
        portfolioObserver.observe(portfolioSection);
    }
});

// ==========================================================================
// SCROLL REVEAL OBSERVER LOGIC (WITH REPEAT/LOOP ENABLED)
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll(".scroll-animate");

    const revealOptions = {
        root: null,
        rootMargin: "0px 0px -60px 0px", // Memicu animasi sedikit sebelum elemen menyentuh batas bawah layar
        threshold: 0.1 // Aktif ketika minimal 10% bagian elemen sudah masuk layar
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 1. Saat masuk layar: Tambahkan class untuk memicu animasi naik & muncul
                entry.target.classList.add("reveal");
            } else {
                // 2. KUNCI REPEAT: Saat keluar dari layar (scroll menjauh), hapus class 
                // agar posisi elemen mereset kembali ke bawah (opacity 0 & turun 50px)
                entry.target.classList.remove("reveal");
            }
        });
    }, revealOptions);

    // Daftarkan semua elemen ber-class .scroll-animate ke dalam radar deteksi
    animatedElements.forEach(element => {
        revealObserver.observe(element);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // --- MANAJEMEN MODAL OVERLAY ---
    const folderCards = document.querySelectorAll(".portfolio-grid .portfolio-card");
    const backButtons = document.querySelectorAll(".back-btn");
    const modals = document.querySelectorAll(".portfolio-modal");
    const backdrops = document.querySelectorAll(".modal-backdrop");

    // 1. Klik folder utama -> Membuka Modal Pop-up Card Extended
    folderCards.forEach(card => {
        card.addEventListener("click", () => {
            const targetId = card.getAttribute("data-target");
            const targetModal = document.getElementById(targetId);

            if (targetModal) {
                targetModal.classList.remove("hidden");
                // Mengunci scroll halaman utama body agar user fokus ke dalam modal
                document.body.style.overflow = "hidden"; 
            }
        });
    });

    // Fungsi menutup modal
    function closeModal() {
        modals.forEach(modal => modal.classList.add("hidden"));
        document.body.style.overflow = ""; // Mengembalikan scroll normal body
    }

    // 2. Klik tombol Back panah melengkung -> Menutup Modal
    backButtons.forEach(btn => {
        btn.addEventListener("click", closeModal);
    });

    // 3. Klik area luar kotak gelap (Backdrop) -> Menutup modal otomatis (User-Friendly)
    backdrops.forEach(backdrop => {
        backdrop.addEventListener("click", closeModal);
    });

    // --- HOVER ANIMATION GAMBAR INTERAKTIF ---
    const hoverableImages = document.querySelectorAll(".folder-img, .hover-folder-img");
    hoverableImages.forEach(img => {
        const originalSrc = img.getAttribute("src");
        const hoverSrc = img.getAttribute("data-hover");

        img.addEventListener("mouseenter", () => {
            if (hoverSrc) img.setAttribute("src", hoverSrc);
        });
        img.addEventListener("mouseleave", () => {
            img.setAttribute("src", originalSrc);
        });
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const mainProjectsBtn = document.getElementById("hero-my-projects");
    const targetPortfolio = document.getElementById("portfolio");

    if (mainProjectsBtn && targetPortfolio) {
        mainProjectsBtn.addEventListener("click", (e) => {
            e.preventDefault();
            // Meluncur mulus ke area section portfolio
            targetPortfolio.scrollIntoView({ 
                behavior: "smooth", 
                block: "start" 
            });
        });
    }
});

