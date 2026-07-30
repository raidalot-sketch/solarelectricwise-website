// Mobile nav toggle
document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  // Gallery lightbox
  var lightbox = document.querySelector(".lightbox");
  if (lightbox) {
    var lightboxImg = lightbox.querySelector("img");
    var closeBtn = lightbox.querySelector(".lightbox-close");
    document.querySelectorAll(".gallery-grid button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var img = btn.querySelector("img");
        lightboxImg.src = img.src.replace("-thumb", "");
        lightboxImg.alt = img.alt;
        lightbox.classList.add("open");
      });
    });
    function close() { lightbox.classList.remove("open"); lightboxImg.src = ""; }
    closeBtn.addEventListener("click", close);
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }

  // Contact form -> Formspree (AJAX submit so we can show an inline status message)
  var form = document.querySelector(".contact-form");
  if (form) {
    var status = form.querySelector(".form-status");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.textContent = "Sending...";
      status.className = "form-status";
      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      })
        .then(function (response) {
          if (response.ok) {
            status.textContent = "Thanks — your message has been sent. We'll be in touch shortly.";
            status.className = "form-status success";
            form.reset();
          } else {
            status.textContent = "Something went wrong. Please email us directly at info@solarelectricwise.co.za.";
            status.className = "form-status error";
          }
        })
        .catch(function () {
          status.textContent = "Something went wrong. Please email us directly at info@solarelectricwise.co.za.";
          status.className = "form-status error";
        });
    });
  }
});
