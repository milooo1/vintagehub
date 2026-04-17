// ── Slideshow ──
// ===== ENHANCED CREATIVE SLIDESHOW JAVASCRIPT =====
// Replace your existing initSlideshow function with this

function initSlideshow() {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".slide-dot");
  const prevBtn = document.querySelector(".slide-nav.prev");
  const nextBtn = document.querySelector(".slide-nav.next");
  const currentNumSpan = document.getElementById("currentSlideNum");
  const totalSlidesNum = document.getElementById("totalSlidesNum");
  
  if (!slides.length) return;

  let current = 0;
  let autoSlideInterval;
  const AUTO_SLIDE_DELAY = 4000; // 4 seconds between slides
  
  // Update total slides count
  if (totalSlidesNum) {
    totalSlidesNum.textContent = slides.length.toString().padStart(2, '0');
  }
  
  // Update counter display
  function updateCounter() {
    if (currentNumSpan) {
      currentNumSpan.textContent = (current + 1).toString().padStart(2, '0');
    }
  }
  
  // Enhanced goTo function with smooth transition
  function goTo(index) {
    // Handle index boundaries (wrap around)
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    
    // Remove active class from current slide and dot
    slides[current].classList.remove("active");
    if (dots[current]) dots[current].classList.remove("active");
    
    // Update current index
    current = index;
    
    // Add active class to new slide and dot
    slides[current].classList.add("active");
    if (dots[current]) dots[current].classList.add("active");
    
    // Update counter display
    updateCounter();
    
    // Reset auto-slide timer
    resetAutoSlide();
  }
  
  // Next slide function
  function nextSlide() {
    goTo(current + 1);
  }
  
  // Previous slide function
  function prevSlide() {
    goTo(current - 1);
  }
  
  // Reset auto-slide timer
  function resetAutoSlide() {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
    }
    autoSlideInterval = setInterval(() => {
      nextSlide();
    }, AUTO_SLIDE_DELAY);
  }
  
  // Add click event to dots
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      goTo(i);
    });
  });
  
  // Add click events to navigation arrows
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide();
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
    });
  }
  
  // Keyboard navigation (optional but nice!)
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      prevSlide();
    } else if (e.key === "ArrowRight") {
      nextSlide();
    }
  });
  
  // Pause auto-slide on hover (better UX)
  const slideshowContainer = document.querySelector(".slideshow");
  if (slideshowContainer) {
    slideshowContainer.addEventListener("mouseenter", () => {
      if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
      }
    });
    
    slideshowContainer.addEventListener("mouseleave", () => {
      if (!autoSlideInterval) {
        autoSlideInterval = setInterval(() => {
          nextSlide();
        }, AUTO_SLIDE_DELAY);
      }
    });
  }
  
  // Start the auto-slide
  resetAutoSlide();
  
  // Initialize counter
  updateCounter();
  
  // Preload images for smoother transitions
  function preloadImages() {
    slides.forEach(slide => {
      const img = slide.querySelector('.slide-img');
      if (img) {
        const newImg = new Image();
        newImg.src = img.src;
      }
    });
  }
  preloadImages();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSlideshow);
} else {
  initSlideshow();
}

// Optional: Add touch/swipe support for mobile devices
function addTouchSupport() {
  const slideshow = document.querySelector(".slideshow");
  if (!slideshow) return;
  
  let touchStartX = 0;
  let touchEndX = 0;
  
  slideshow.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  slideshow.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchEndX - touchStartX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe right - previous slide
        document.querySelector(".slide-nav.prev")?.click();
      } else {
        // Swipe left - next slide
        document.querySelector(".slide-nav.next")?.click();
      }
    }
  }
}

// Add touch support after initialization
setTimeout(addTouchSupport, 100);

// ── Booking form ──
function initBooking() {
  const photoBtn = document.getElementById("photo-btn");
  const videoBtn = document.getElementById("video-btn");
  const photoCounter = document.getElementById("photo-counter");
  const videoCounter = document.getElementById("video-counter");
  const photoVal = document.getElementById("photo-val");
  const videoVal = document.getElementById("video-val");

  if (!photoBtn) return;

  let photographers = 1;
  let videographers = 1;

  photoBtn.addEventListener("click", () => {
    photoBtn.classList.toggle("selected");
    photoCounter.classList.toggle("hidden");
  });

  videoBtn.addEventListener("click", () => {
    videoBtn.classList.toggle("selected");
    videoCounter.classList.toggle("hidden");
  });

  document.getElementById("photo-minus").addEventListener("click", () => {
    if (photographers > 1) photographers--;
    photoVal.textContent = photographers;
  });

  document.getElementById("photo-plus").addEventListener("click", () => {
    photographers++;
    photoVal.textContent = photographers;
  });

  document.getElementById("video-minus").addEventListener("click", () => {
    if (videographers > 1) videographers--;
    videoVal.textContent = videographers;
  });

  document.getElementById("video-plus").addEventListener("click", () => {
    videographers++;
    videoVal.textContent = videographers;
  });

  // Form submit
  const form = document.getElementById("booking-form");
  const successScreen = document.getElementById("success-screen");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector(".submit-btn");
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    const data = {
      name: document.getElementById("name").value,
      phone: document.getElementById("phone").value,
      email: document.getElementById("email").value,
      address: document.getElementById("address").value,
      eventName: document.getElementById("event-name").value,
      venue: document.getElementById("venue").value,
      date: document.getElementById("event-date").value,
      duration: document.getElementById("duration").value,
      photography: photoBtn.classList.contains("selected"),
      videography: videoBtn.classList.contains("selected"),
      photographers: photographers,
      videographers: videographers,
    };

    try {
      await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.log(err);
    }

    form.classList.add("hidden");
    successScreen.classList.remove("hidden");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initSlideshow();
  initBooking();
});
// ===== PORTFOLIO PAGE JAVASCRIPT =====

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  
  // ----- CATEGORY FILTER FUNCTIONALITY -----
  const categoryBtns = document.querySelectorAll('.category-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  if (categoryBtns.length > 0) {
    categoryBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Remove active class from all buttons
        categoryBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        const category = this.getAttribute('data-category');
        
        // Filter portfolio items
        portfolioItems.forEach(item => {
          if (category === 'all' || item.getAttribute('data-category') === category) {
            item.classList.remove('hide');
            item.classList.add('show');
          } else {
            item.classList.add('hide');
            item.classList.remove('show');
          }
        });
      });
    });
  }
  
  // ----- LIGHTBOX FUNCTIONALITY (Full Image View) -----
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeLightbox = document.querySelector('.close-lightbox');
  
  // Get all portfolio images
  const portfolioImgs = document.querySelectorAll('.portfolio-img');
  
  portfolioImgs.forEach(img => {
    img.addEventListener('click', function(e) {
      e.stopPropagation();
      const imgUrl = this.getAttribute('data-img') || this.style.backgroundImage.slice(5, -2);
      const portfolioItem = this.closest('.portfolio-item');
      const title = portfolioItem.querySelector('h3').innerText;
      const tag = portfolioItem.querySelector('.portfolio-tag').innerText;
      
      lightboxImage.src = imgUrl;
      lightboxCaption.innerHTML = `${title} — ${tag}`;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
  
  // Close lightbox function
  function closeLightboxModal() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    lightboxImage.src = '';
  }
  
  if (closeLightbox) {
    closeLightbox.addEventListener('click', closeLightboxModal);
  }
  
  // Close lightbox when clicking outside the image
  if (lightbox) {
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        closeLightboxModal();
      }
    });
  }
  
  // Close lightbox with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
      closeLightboxModal();
    }
  });
  
  // ----- VIDEO BUTTONS - Update with your actual social media links -----
  // Update these URLs with your actual Facebook, Instagram, and YouTube links
  const fbReelBtn = document.querySelector('.facebook-reel');
  const instaReelBtn = document.querySelector('.instagram-reel');
  const youtubeBtn = document.querySelector('.youtube-short');
  
  // You can update the href attributes dynamically if needed
  if (fbReelBtn) {
    fbReelBtn.href = 'https://www.facebook.com/yourpage/reels'; // Replace with your FB Reels URL
  }
  if (instaReelBtn) {
    instaReelBtn.href = 'https://www.instagram.com/yourusername/reels'; // Replace with your Instagram Reels URL
  }
  if (youtubeBtn) {
    youtubeBtn.href = 'https://www.youtube.com/@yourchannel/shorts'; // Replace with your YouTube Shorts URL
  }
});