(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });


    // Car Categories
    $(".categories-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        dots: false,
        loop: true,
        margin: 25,
        nav : true,
        navText : [
            '<i class="fas fa-chevron-left"></i>',
            '<i class="fas fa-chevron-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:1
            },
            992:{
                items:2
            },
            1200:{
                items:3
            }
        }
    });


    // testimonial carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav : false,
        navText : [
            '<i class="fa fa-angle-right"></i>',
            '<i class="fa fa-angle-left"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:1
            },
            992:{
                items:2
            },
            1200:{
                items:2
            }
        }
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 5,
        time: 2000
    });


   // Back to top button
   $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


})(jQuery);

$('a[href^="#"]').on('click', function(e) {
  e.preventDefault();
  const target = this.hash;
  const $target = $(target);

  $('html, body').animate({
    scrollTop: $target.offset().top
  }, 1000); // 600ms durasi animasi
});

// Saat link diklik
$('.navbar-nav .nav-link').on('click', function() {
  $('.navbar-nav .nav-link').removeClass('active');
  $(this).addClass('active');
});

// Saat scroll, cek posisi section
$(window).on('scroll', function() {
  const scrollPos = $(document).scrollTop();
  $('.navbar-nav .nav-link').each(function() {
    const currLink = $(this);
    const refElement = $(currLink.attr("href"));
    if (refElement.length) {
      if (refElement.position().top <= scrollPos + 100 &&
          refElement.position().top + refElement.height() > scrollPos + 100) {
        $('.navbar-nav .nav-link').removeClass("active");
        currLink.addClass("active");
      }
    }
  });
});
// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.nav-bar');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 100) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// Juga update kelas pada .sticky-top untuk kompatibilitas
window.addEventListener('scroll', function() {
    const stickyNav = document.querySelector('.sticky-top');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 100) {
        stickyNav.classList.add('navbar-scrolled');
    } else {
        stickyNav.classList.remove('navbar-scrolled');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const whatsappButton = document.getElementById('whatsappButton');
    
    if (whatsappButton) {
        whatsappButton.addEventListener('click', function() {
            // 1. Ambil data dari SELECT
            const carSelect = document.getElementById('carTypeSelect');
            const selectedOption = carSelect.options[carSelect.selectedIndex];
            const carTypeText = selectedOption.text;
            
            // 2. Validasi jika belum pilih mobil
            if (carSelect.selectedIndex === 0) {
                alert('Silakan pilih jenis mobil terlebih dahulu!');
                carSelect.focus();
                return;
            }
            
            // 3. Ambil data lainnya dari form
            const pickupInputs = document.querySelectorAll('input[placeholder*="kota/bandara"]');
            const pickupLocation = pickupInputs[0] ? pickupInputs[0].value : '';
            const dropoffLocation = pickupInputs[1] ? pickupInputs[1].value : '';
            
            const dateInputs = document.querySelectorAll('input[type="date"]');
            const pickupDate = dateInputs[0] ? dateInputs[0].value : '';
            const dropoffDate = dateInputs[1] ? dateInputs[1].value : '';
            
            const timeSelects = document.querySelectorAll('select[style*="flex: 0 0 120px"]');
            const pickupTime = timeSelects[0] ? timeSelects[0].options[timeSelects[0].selectedIndex].text : '';
            const dropoffTime = timeSelects[1] ? timeSelects[1].options[timeSelects[1].selectedIndex].text : '';
            
            // 4. Format tanggal (jika ada)
            const formatDate = (dateString) => {
                if (!dateString) return 'Belum dipilih';
                const date = new Date(dateString);
                return date.toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                });
            };
            
            // 5. Buat pesan WhatsApp
            const message = `🚗 *FORM PENDAFTARAN SEWA MOBIL*

Halo, saya ingin menyewa mobil dengan detail berikut:

📌 *JENIS MOBIL*
${carTypeText}

📍 *LOKASI JEMPUT*
${pickupLocation || 'Belum diisi'}

📍 *LOKASI KEMBALI*
${dropoffLocation || 'Belum diisi'}

📅 *TANGGAL JEMPUT*
${formatDate(pickupDate)} ${pickupTime}

📅 *TANGGAL KEMBALI*
${formatDate(dropoffDate)} ${dropoffTime}

Mohon info ketersediaan dan harga.
Terima kasih!`;
            
            // 6. Encode dan kirim ke WhatsApp
            const encodedMessage = encodeURIComponent(message);
            const phoneNumber = '628815700968'; // GANTI DENGAN NOMOR ANDA
            
            window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
        });
    }
});
