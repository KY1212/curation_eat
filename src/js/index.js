import "../scss/style.scss";
import $ from "jquery";
// import progressbarjs from "progressbar.js"


$(function () {

  const getScreenHeight = () => {
    console.log(document.documentElement.clientHeight);
    const screenHeight = document.documentElement.clientHeight;
    console.log("unko");

    $(".l-hero-image").css({
      height: screenHeight + "px"
    });
  }
  getScreenHeight();

  const fadeUpAnimation = () => {
    const fadeUpAnimeTrigger = $(".is-fadeUpAnimeTrigger");
    const fadeDownAnimeTrigger = $(".is-fadeDownAnimeTrigger");
    const fadeLeftAnimeTrigger = $(".is-fadeLeftAnimeTrigger");
    const fadeRightAnimeTrigger = $(".is-fadeRightAnimeTrigger");

    $(window).on("scroll", function () {
      fadeUpAnimeTrigger.each(function () {
        let position = $(this).offset().top;
        let scroll = $(window).scrollTop();
        let windowHeight = $(window).height();
        if (scroll > position - windowHeight + 150) {
          $(this).addClass("is-fadeUp");
        }
      });
      fadeDownAnimeTrigger.each(function () {
        let position = $(this).offset().top;
        let scroll = $(window).scrollTop();
        let windowHeight = $(window).height();
        if (scroll > position - windowHeight + 150) {
          $(this).addClass("is-fadeDown");
        }
      });
      fadeLeftAnimeTrigger.each(function () {
        let position = $(this).offset().top;
        let scroll = $(window).scrollTop();
        let windowHeight = $(window).height();
        if (scroll > position - windowHeight + 150) {
          $(this).addClass("is-fadeLeft");
        }
      });
      fadeRightAnimeTrigger.each(function () {
        let position = $(this).offset().top;
        let scroll = $(window).scrollTop();
        let windowHeight = $(window).height();
        if (scroll > position - windowHeight + 150) {
          $(this).addClass("is-fadeRight");
        }
      });
    });
  };

  const toggleAction = () => {
    const $hamburger = $(".c-hamburger");
    const $list = $(".p-header__list");

    const clickHamburger = () => {
      $hamburger.toggleClass("is-active");
      $list.toggleClass("is-open");
      if ($list.hasClass("is-open")) {
        $("html").addClass("is-dont-scroll");
      } else if (!$list.hasClass("is-open")) {
        $("html").removeClass("is-dont-scroll");
      }
    }
    $hamburger.on("click", clickHamburger);
  }

  const slideShow = () => {
    const $focus = $(".p-slide-show__focus");
    const $slide = $(".p-slide-show__slide");
    let slideLength = $slide.length;
    const $prev = $(".p-slide-show__prev");
    const $next = $(".p-slide-show__next");
    const $currentPage = $(".p-slide-show__current-page");
    const $navigation = $(".p-slide-show__navigation");
    let currentIndex = 0;
    const interval = 10;
    let timer;

    let changeSlide = () => {
      $slide.addClass("is-active");
      $slide.eq(currentIndex).removeClass("is-active");

      if (currentIndex == slideLength) {
        currentIndex = 0;
        $slide.addClass("is-active");
        $slide.eq(currentIndex).removeClass("is-active");
        $currentPage.text((currentIndex + 1) + " / 5");

      } else if (currentIndex == -1) {
        currentIndex = slideLength-1;
        $slide.addClass("is-active");
        $slide.eq(currentIndex).removeClass("is-active");
        $currentPage.text((currentIndex+1) + " / 5");
      } else {
        $currentPage.text((currentIndex + 1) + " / 5");

      }
    }

    let prevSlide = () => {
      currentIndex--;
      changeSlide();
    }

    let nextSlide = () => {
      currentIndex++;
      changeSlide();
    }

    const progress = () => {
      if (document.getElementById('bar').value < 100) {
        document.getElementById('bar').value++;
      }
      else if (document.getElementById('bar').value == 100) {
        document.getElementById('bar').value = 0;
        nextSlide();
      }
    }

    const startTimer = () => {
      timer = setInterval(progress, interval);
    }

    const stopTimer = () => {
      clearInterval(timer);
    }

    const setEvent = () => {
      $navigation.on({
        mouseenter: stopTimer,
        mouseleave: startTimer
      })
      $prev.on("click", prevSlide);
      $next.on("click", nextSlide);
    }

    startTimer();
    setEvent();
  }

  slideShow();
  fadeUpAnimation();
  toggleAction();
});
