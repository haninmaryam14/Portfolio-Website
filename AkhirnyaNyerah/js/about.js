// ==========================================================================
// SCROLL LOGIC FOR COMPONENTS ANIMATION (INTERSECTION OBSERVER)
// ==========================================================================

const animatedElements = document.querySelectorAll('.scroll-animate');

const observerOptions = {
    root: null, // Menggunakan viewport browser sebagai area deteksi
    rootMargin: '0px',
    threshold: 0.15 // Animasi akan berjalan ketika 15% bagian komponen sudah masuk layar
};

const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Tambahkan kelas 'show' untuk memicu animasi naik dari CSS
            entry.target.classList.add('show');
            // Unobserve digunakan agar setelah animasi jalan sekali, ia tidak akan hilang-muncul lagi saat di-scroll bolak-balik
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Daftarkan semua komponen ber-class 'scroll-animate' ke dalam sistem pengawas observer
animatedElements.forEach(el => scrollObserver.observe(el));