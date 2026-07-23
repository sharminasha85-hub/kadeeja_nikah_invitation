/* ==========================================================================
   MUHAMMED & KHADEEJA NIKKAH INVITATION - INTERACTIVE SCRIPT
   ========================================================================== */

// Prevent browser from restoring scroll position to footer on refresh
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Force page to start at the top hero section on launch
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {
  window.scrollTo(0, 0);

  // 1. COUNTDOWN TIMER (Target: July 30, 2026 16:30:00 - 4:30 PM IST)
  const targetDate = new Date(2026, 6, 30, 16, 30, 0).getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minutesEl = document.getElementById('cd-minutes');
    const secondsEl = document.getElementById('cd-seconds');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    if (distance <= 0) {
      daysEl.innerText = '00';
      hoursEl.innerText = '00';
      minutesEl.innerText = '00';
      secondsEl.innerText = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.innerText = String(days).padStart(2, '0');
    hoursEl.innerText = String(hours).padStart(2, '0');
    minutesEl.innerText = String(minutes).padStart(2, '0');
    secondsEl.innerText = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // 2. MOBILE NAVIGATION MENU TOGGLE
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('active');
      }
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navMenu.classList.remove('active'));
    });
  }

  // 3. LEAFLET DUAL VENUE MAPS
  const masjidCoords = [12.1643, 75.1481];
  const naseemasCoords = [12.1385, 75.1852];
  const mapContainer = document.getElementById('map-container');

  if (mapContainer) {
    if (typeof L !== 'undefined') {
      try {
        const map = L.map('map-container', {
          zoomControl: true,
          scrollWheelZoom: false
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        const masjidIcon = L.divIcon({
          className: 'custom-map-pin',
          html: `<div style="background: linear-gradient(135deg, #D4AF37, #AA771C); width: 38px; height: 38px; border-radius: 50%; border: 3px solid #FFF; box-shadow: 0 5px 15px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: #FFF; font-size: 16px;"><i class="fa-solid fa-mosque"></i></div>`,
          iconSize: [38, 38],
          iconAnchor: [19, 19]
        });

        L.marker(masjidCoords, { icon: masjidIcon })
          .addTo(map)
          .bindPopup(`
            <div style="text-align: center; padding: 5px;">
              <strong style="color: #9E791E; font-size: 14px;">Udumbunthala Juma Masjid</strong><br>
              <span style="font-size: 12px; color: #555;">Nikkah Ceremony • 4:30 PM (After Asr)</span><br>
              <a href="https://www.google.com/maps/search/?api=1&query=Udumbunthala+Juma+Masjid" target="_blank" style="color: #C59B27; font-weight: bold; text-decoration: underline; font-size: 12px; display: inline-block; margin-top: 5px;">Get Directions</a>
            </div>
          `);

        const feastIcon = L.divIcon({
          className: 'custom-map-pin',
          html: `<div style="background: linear-gradient(135deg, #C59B27, #7A5B10); width: 38px; height: 38px; border-radius: 50%; border: 3px solid #FFF; box-shadow: 0 5px 15px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: #FFF; font-size: 16px;"><i class="fa-solid fa-utensils"></i></div>`,
          iconSize: [38, 38],
          iconAnchor: [19, 19]
        });

        L.marker(naseemasCoords, { icon: feastIcon })
          .addTo(map)
          .bindPopup(`
            <div style="text-align: center; padding: 5px;">
              <strong style="color: #9E791E; font-size: 14px;">Naseemas, Ramanthali</strong><br>
              <span style="font-size: 12px; color: #555;">Grand Feast & Reception • 7:00 PM (After Maghrib)</span><br>
              <a href="https://www.google.com/maps/search/?api=1&query=Naseemas+Ramanthali" target="_blank" style="color: #C59B27; font-weight: bold; text-decoration: underline; font-size: 12px; display: inline-block; margin-top: 5px;">Get Directions</a>
            </div>
          `);

        const bounds = L.latLngBounds([masjidCoords, naseemasCoords]);
        map.fitBounds(bounds, { padding: [50, 50] });

      } catch (err) {
        console.warn("Leaflet map initialization error:", err);
      }
    } else {
      mapContainer.innerHTML = `
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; text-align:center; padding:20px; background:rgba(212,175,55,0.05); color:#9E791E;">
          <i class="fa-solid fa-map-location-dot" style="font-size:3rem; margin-bottom:10px;"></i>
          <h3>Nikkah: Udumbunthala Juma Masjid (4:30 PM)</h3>
          <h3>Feast: Naseemas, Ramanthali (7:00 PM)</h3>
          <a href="https://www.google.com/maps/search/?api=1&query=Naseemas+Ramanthali" target="_blank" class="btn btn-gold" style="margin-top:10px;">Open Maps</a>
        </div>
      `;
    }
  }

  // 4. RSVP FORM SUBMISSION
  const rsvpForm = document.getElementById('rsvp-form');
  const rsvpSuccess = document.getElementById('rsvp-success-message');
  const resetRsvpBtn = document.getElementById('reset-rsvp-btn');

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('rsvp-name').value;
      const phone = document.getElementById('rsvp-phone').value;
      const guests = document.getElementById('rsvp-guests').value;
      const attendance = document.getElementById('rsvp-attendance').value;
      const message = document.getElementById('rsvp-message').value;

      try {
        const rsvpData = { name, phone, guests, attendance, message, date: new Date().toISOString() };
        localStorage.setItem('wedding_rsvp_' + Date.now(), JSON.stringify(rsvpData));
      } catch (e) {
        console.warn("LocalStorage save error:", e);
      }

      if (typeof confetti === 'function') {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#F3E5AB', '#AA771C', '#FFFFFF']
        });
      }

      rsvpForm.classList.add('hidden');
      if (rsvpSuccess) rsvpSuccess.classList.remove('hidden');
    });

    if (resetRsvpBtn && rsvpSuccess) {
      resetRsvpBtn.addEventListener('click', () => {
        rsvpForm.reset();
        rsvpSuccess.classList.add('hidden');
        rsvpForm.classList.remove('hidden');
      });
    }
  }

  // 5. ADD TO CALENDAR (GOOGLE CALENDAR)
  const calendarBtn = document.getElementById('add-to-calendar-btn');
  if (calendarBtn) {
    calendarBtn.addEventListener('click', () => {
      const title = encodeURIComponent("Nikkah & Reception: Muhammed & Khadeeja");
      const details = encodeURIComponent("With the blessings of Allah, you are invited to the Nikkah Ceremony at Udumbunthala Juma Masjid (4:30 PM) and Grand Feast & Reception at Naseemas, Ramanthali (7:00 PM).");
      const location = encodeURIComponent("Udumbunthala Juma Masjid & Naseemas, Ramanthali");
      const startDate = "20260730T110000Z";
      const endDate = "20260730T160000Z";

      const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
      window.open(googleCalUrl, '_blank');
    });
  }

  // 6. WHATSAPP SHARE INVITATION GENERATOR
  const whatsappBtn = document.getElementById('share-whatsapp-btn');
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
      const inviteMsg = encodeURIComponent(
        `✨ *Nikkah & Reception Invitation* ✨\n\n` +
        `"Two souls, two hearts, united by Allah's will, together in faith, forever in love."\n\n` +
        `We joyfully invite you to the Nikkah Ceremony & Grand Feast of:\n` +
        `*Muhammed (Groom) & Khadeeja (Bride)*\n\n` +
        `🗓 *Date:* July 30, 2026 (Thursday)\n\n` +
        `🕌 *Nikkah Ceremony:* 4:30 PM (After Asr Prayer)\n` +
        `📍 *Nikkah Venue:* Udumbunthala Juma Masjid\n\n` +
        `🍽 *Grand Feast & Reception:* 7:00 PM (After Maghrib Prayer)\n` +
        `📍 *Feast Venue:* Naseemas, Ramanthali\n\n` +
        `🎶 *Music:* Wedding Nasheed (Muhammad Al Muqit)\n\n` +
        `We look forward to your presence & prayers!`
      );
      window.open(`https://api.whatsapp.com/send?text=${inviteMsg}`, '_blank');
    });
  }

  // 7. AUDIO PLAYBACK (STAYS AT TOP, NO AUTO SCROLLING)
  const audioBtn = document.getElementById('audio-toggle-btn');
  const bgAudio = document.getElementById('bg-audio');

  function updateAudioButtonState(playing) {
    if (!audioBtn) return;
    if (playing) {
      audioBtn.classList.add('playing');
      audioBtn.querySelector('.audio-text').innerText = 'Pause Nasheed';
    } else {
      audioBtn.classList.remove('playing');
      audioBtn.querySelector('.audio-text').innerText = 'Play Wedding Nasheed';
    }
  }

  function startAudioPlayback() {
    if (!bgAudio) return;
    bgAudio.play().then(() => {
      updateAudioButtonState(true);
    }).catch(err => {
      // Browser autoplay policy requires 1 gesture (click or tap)
      const enableOnFirstTouch = () => {
        bgAudio.play().then(() => {
          updateAudioButtonState(true);
        }).catch(e => console.warn(e));

        ['click', 'pointerdown', 'touchstart'].forEach(evt => {
          window.removeEventListener(evt, enableOnFirstTouch);
        });
      };

      ['click', 'pointerdown', 'touchstart'].forEach(evt => {
        window.addEventListener(evt, enableOnFirstTouch, { once: true });
      });
    });
  }

  startAudioPlayback();

  // Manual Toggle Button
  if (audioBtn && bgAudio) {
    audioBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (bgAudio.paused) {
        bgAudio.play().then(() => {
          updateAudioButtonState(true);
        }).catch(err => console.warn(err));
      } else {
        bgAudio.pause();
        updateAudioButtonState(false);
      }
    });

    bgAudio.addEventListener('pause', () => updateAudioButtonState(false));
    bgAudio.addEventListener('play', () => updateAudioButtonState(true));
  }

  // 8. BACKGROUND PARTICLES CANVAS
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(50, Math.floor(window.innerWidth / 20));

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.8,
        color: Math.random() > 0.3 ? 'rgba(212, 175, 55, ' : 'rgba(255, 245, 210, ',
        opacity: Math.random() * 0.7 + 0.3,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: Math.random() * 0.5 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.005
      });
    }

    function renderParticles() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.01) * 0.3;
        p.opacity += Math.sin(Date.now() * p.pulseSpeed) * 0.01;

        if (p.y > height) {
          p.y = -10;
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.max(0.1, Math.min(0.9, p.opacity)) + ')';
        ctx.fill();
      });

      requestAnimationFrame(renderParticles);
    }

    renderParticles();
  }

  // 9. NATIVE SCROLL REVEAL OBSERVER
  const revealElements = document.querySelectorAll('.section-container, .arch-card, .timeline-item, .venue-card');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach(el => {
      el.classList.add('reveal-on-scroll');
      observer.observe(el);
    });
  }

});

// Ensure top position after all resources load
window.addEventListener('load', () => {
  window.scrollTo(0, 0);
});
