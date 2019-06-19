window.addEventListener('DOMContentLoaded', (event) => {
  function slider(el) {
    this.el = el;
    this.sliderNav = this.el.getElementsByClassName("slider__navigation")[0];
    this.sliderNavButtons = this.sliderNav.querySelectorAll(
      ".button.progressbar"
    );
    this.slide = this.el.getElementsByClassName("slide");
    this.slideH2 = this.el.getElementsByTagName("h2");
    this.slideH6 = this.el.getElementsByTagName("h6");
    this.slideNum = this.slide.length;
    this.slideIndexNew = 0;
    this.slideIndexOld = 0;
    this.autoPlay = this.el.classList.contains("slide-autoplay");
    this.autoPlayId;
    this.autoPlayInterval = 5000;
    this.slideTimeoutId;
    this.slideTimeoutText;
    this.slideTimeoutTextVisibility;
    this.init();
  }

  var bar = new ProgressBar.Circle("#bar", {
    strokeWidth: 7,
    easing: "linear",
    duration: 5000,
    color: "#ffffff",
    trailColor: "transparent",
    trailWidth: 1,
    svgStyle: null
  });
  var bar2 = new ProgressBar.Circle("#bar2", {
    strokeWidth: 7,
    easing: "linear",
    duration: 5000,
    color: "#ffffff",
    trailColor: "transparent",
    trailWidth: 1,
    svgStyle: null
  });
  var bar3 = new ProgressBar.Circle("#bar3", {
    strokeWidth: 7,
    easing: "linear",
    duration: 5000,
    color: "#ffffff",
    trailColor: "transparent",
    trailWidth: 1,
    svgStyle: null
  });

  slider.prototype.init = function () {
    var self = this;
    //start 1go progress bara
    bar.set(0);
    bar.animate(1.0)
    this.slideTimeoutTextVisibility = setTimeout(function () {
      self.slideH2[self.slideIndexOld].classList.add("hide");
      self.slideH6[self.slideIndexOld].classList.add("hide");
    }, 4800);
    //autoplay dla slidera
    this.setAutoplay();

    // zmiana slade z poziom nawigacji
    this.sliderNavButtons.forEach(function (elem) {
      elem.addEventListener("click", function (e) {
        self.slideIndexOld = self.slideIndexNew;
        self.slideIndexNew = parseInt(elem.dataset.slideId) - 1;



        console.log('[data-slide-id]', elem.dataset.slideId);
        console.log('[new slide]', self.slideIndexNew, '[old slide]', self.slideIndexOld);

        self.newSlide();
        self.setAutoplay();
      });
    });
  };

  slider.prototype.setAutoplay = function () {
    var self = this;
    if (this.autoPlay) {
      clearInterval(self.autoPlayId);
      self.autoPlayId = window.setInterval(function () {
        self.autoplaySlider();

      }, self.autoPlayInterval);
    }
  };

  slider.prototype.autoplaySlider = function () {
    this.slideIndexOld = this.slideIndexNew;

    if (this.slideIndexNew < this.slideNum - 1) {
      this.slideIndexNew += 1;

      this.newSlide();

    } else {
      this.slideIndexNew = 0;
      this.newSlide();
    }
  };

  //animacja poszczególnego slide
  slider.prototype.newSlide = function () {
    var self = this;

    this.slideTimeoutId && clearTimeout(self.slideTimeoutId);
    this.slideTimeoutText && clearTimeout(self.slideTimeoutText);
    this.slideTimeoutTextVisibility && clearTimeout(self.slideTimeoutTextVisibility);

    this.slide[this.slideIndexOld].classList.remove("scale-up");
    this.slide[this.slideIndexOld].classList.add("scale-down");

    this.slideH2[this.slideIndexNew].classList.add("hide");
    this.slideH6[this.slideIndexNew].classList.add("hide");



    this.slideTimeoutId = setTimeout(function () {
      self.slide[self.slideIndexOld].classList.add("hide");
      self.slide[self.slideIndexOld].classList.remove("scale-down");

      self.slide[self.slideIndexNew].classList.remove("hide");
      self.slide[self.slideIndexNew].classList.add("scale-up");
    }, 1000);

    this.slideTimeoutText = setTimeout(function () {
      self.slideH2[self.slideIndexNew].classList.remove("hide");
      self.slideH6[self.slideIndexNew].classList.remove("hide");
      self.slideH2[self.slideIndexNew].classList.add("fade-right");
      self.slideH6[self.slideIndexNew].classList.add("fade-right");
    }, 1500);

    this.slideTimeoutTextVisibility = setTimeout(function () {
      self.slideH2[self.slideIndexNew].classList.add("hide");
      self.slideH6[self.slideIndexNew].classList.add("hide");
    }, 4800);



    //zerowanie progress bara
    bar.set(0);
    bar2.set(0);
    bar3.set(0);
    //tablica przechowująca progress bary
    var barArray = [bar, bar2, bar3];
    barArray[self.slideIndexNew].animate(1.0);
    console.log(self.slideIndexNew, barArray[self.slideIndexNew]);
  };

  var sliders = document.getElementsByClassName("slider");
  if (sliders.length > 0) {
    for (var i = 0; i < sliders.length; i++) {
      (function (i) {
        new slider(sliders[i]);
      })(i);
    }
  }
});