/**
* Template Name: Nova
* Template URL: https://bootstrapmade.com/nova-bootstrap-business-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

})();




//Nearest location locator

let map;

function initMap() {
  map = L.map('map').setView([0, 0], 8); // Default center and zoom level

  // Use a free tileset from OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(map);
}

function findNearestLocation() {
  // Check if the browser supports geolocation
  if ("geolocation" in navigator) {
    // Get the user's location
    navigator.geolocation.getCurrentPosition(function (position) {
      const userLat = position.coords.latitude;
      const userLon = position.coords.longitude;

      // Define a list of locations with their coordinates
      const locations = [
        { name: "Insight - The Mind Clinic Psychiatrist", lat: 18.459565146604355, lon: 73.90864782883561, lnk: "https://maps.app.goo.gl/2BHCffGHWfkRSStW7" },
        { name: "Chetas Psychiatry Clinic", lat: 18.49835860298881, lon: 73.95582732883562, lnk: "https://maps.app.goo.gl/iJxenBS1MuGVYUxx9" },
        { name: "Dr Amar Shinde Psychiatrist", lat: 18.49946847615545, lon: 73.94058199999999, lnk: "https://maps.app.goo.gl/5Y8Aoqnjcxyswxv7A" },
        { name: "Dr Kishor Jadhavar | Psychiatrist", lat: 18.523547027748275, lon: 73.93363911534256, lnk: "https://maps.app.goo.gl/nppbwyF66bP3n7Ym6" },
        { name: "Dr Prakash Bhambure Psychiatry", lat: 18.487441641135007, lon: 73.85700991349309, lnk: "https://maps.app.goo.gl/rMwV68TMfaJDXhQeA" },
        { name: "Heart to Heart Counseling Center", lat: 18.506309093776114, lon: 73.90650848650691, lnk: "https://maps.app.goo.gl/mfjA83H8TbKungwt9" },
        { name: "SMART NEURO-PSYCHIATRY CLINIC", lat: 18.534026978821956, lon: 73.87854256931487, lnk: "https://maps.app.goo.gl/QeeEE1WasADWxRZm9" },
        { name: "Dr P K Chakraborty", lat: 18.48591341843599, lon: 73.88714698465743, lnk: "https://maps.app.goo.gl/BhXpLyZAUtEsWADo9" },
        { name: "Dr.Niket Kasar- Best Psychiatrist In Pune", lat: 18.5095833899809, lon: 73.84840491534256, lnk: "https://maps.app.goo.gl/iiicqRB3hs3KVfb86" },
        { name: "Dr Sushil Deshmukh MD Psychiatry", lat: 18.502443501159007, lon: 73.80968135767128, lnk: "https://maps.app.goo.gl/r5Nqz7DUtkvUo8MZ7" },
        { name: "Pune Counseling and Therapy", lat: 18.504808528325764, lon: 73.92990917116437, lnk: "https://maps.app.goo.gl/WcZTDGMk5bvDCCAJ9" },
        { name: "Dr Prakash Bhambure", lat: 18.478364401846, lon: 73.89025869999998, lnk: "https://maps.app.goo.gl/wvRkoLAEPmzeghwr5" },
        { name: "Dr Swapnil Deshmukh MBBS,MD", lat: 18.515958988705933, lon: 73.84187174417819, lnk: "https://maps.app.goo.gl/VbkpwFdJd5ZpyfkP6" },
        { name: "Therapy by Dr. Sukanya Biswas", lat: 18.46198550836309, lon: 73.91483447116437, lnk: "https://maps.app.goo.gl/zG9ct6NZRJSBygJM9" },
        { name: "Mann ki baat - Psychiatrist", lat: 18.516048882484874, lon: 73.84355175767128, lnk: "https://maps.app.goo.gl/gcgDh8VjCeY68EYM7" },
        { name: "The Beautiful Mind - Specialty Psychiatry Clinic", lat: 18.50170287889282, lon: 73.81588814232872, lnk: "https://maps.app.goo.gl/2RRa75bAUJYPecQE7" }
      ];

      // Convert degrees to radians
      function toRadians(degrees) {
        return degrees * Math.PI / 180;
      }

      // Haversine formula
      function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Earth's radius in kilometers
        const toRad = (deg) => deg * (Math.PI / 180); // convert degrees to radians
      
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
      
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
      
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in kilometers
      }
      

      let nearestLocation;
      let nearestDistance = Infinity;

      locations.forEach((location) => {
        const distance = calculateDistance(userLat, userLon, location.lat, location.lon);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestLocation = location;
        }
      });

      const resultDiv = document.getElementById("result");
      resultDiv.innerHTML = `<p>Nearest Location: ${nearestLocation.name}</p><p>Distance: ${nearestDistance.toFixed(2)} km</p><a href="${nearestLocation.lnk}" target="_blank">Google Maps</a>`;

      map.setView([nearestLocation.lat, nearestLocation.lon], 12);
      L.marker([nearestLocation.lat, nearestLocation.lon]).addTo(map)
        .bindPopup(nearestLocation.name)
        .openPopup();
    }, function (error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          alert("User denied the request for geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          alert("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          alert("The request to get user location timed out.");
          break;
        case error.UNKNOWN_ERROR:
          alert("An unknown error occurred.");
          break;
      }
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}


