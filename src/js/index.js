import "../scss/style.scss";
import $ from "jquery";
// import progressbarjs from "progressbar.js"


$(function () {

  const changeColor = () => {
    $(window).on("scroll", function () {
      const $headerList = $(".p-header__list");
      const $headerItem = $(".p-header__item");
      const $topics = $(".l-topics");
      const $logo = $(".p-header__logo");
      const $instagram = $(".p-header__instagram");
      const $hamburger = $(".c-hamburger span");
      const $headerLogoWhite = $logo.find(".p-header__logo-white");
      const $headerLogoYellow = $logo.find(".p-header__logo-yellow");

      $headerList.each(function () {
        let scroll = $(window).scrollTop();
        let heightVH = $topics.offset().top-30;
        if (scroll > heightVH) {
          $headerList.addClass("is-change-color");
          // $hamburger.addClass("is-change-bg-color");
          $instagram.addClass("is-change-color");
          $hamburger.css({
            backgroundColor: "#333"
          });
          $headerItem.css({
            borderColor: "#333"
          });
          $headerLogoYellow.css({
            display: "block"
          });
          $headerLogoWhite.css({
            display: "none"
          });
        } else {
          $headerList.removeClass("is-change-color");
          // $hamburger.removeClass("is-change-bg-color");
          $instagram.removeClass("is-change-color");
          $hamburger.css({
            backgroundColor: "#fff"
          });
          $headerItem.css({
            borderColor: "#fff"
          });
          $headerLogoWhite.css({
            display: "block"
          });
          $headerLogoYellow.css({
            display: "none"
          });
        }
      });
    });
  }

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
    let position;
    const clickHamburger = () => {
      $hamburger.toggleClass("is-active");
      $list.toggleClass("is-open");
      if ($list.hasClass("is-open")) {
        $("html").addClass("is-dont-scroll");
        $(".c-hamburger span").css({
          backgroundColor: "#333"
        });
        $(".p-header__item").css({
          borderColor: "#333"
        });
        position = $(window).scrollTop();
        $("body").addClass("is-fixed").css({"top": - position});

      } else if (!$list.hasClass("is-open")) {
        $("html").removeClass("is-dont-scroll");
        $(".c-hamburger span").css({
          backgroundColor: "#fff"
        });
        $(".p-header__item").css({
          borderColor: "#fff"
        });
        $("body").removeClass("is-fixed").css({"top": 0});
        window.scrollTo(0, position);
      }
    }
    $hamburger.on("click", clickHamburger);
  }

  const slideShow = () => {
    const $focus = $(".p-slide-show__focus");
    const $slide = $(".p-slide-show__slide");
    let slideLength = $slide.length;
    const $prev = $(".is-prev");
    const $next = $(".is-next");
    const $currentPage = $(".p-slide-show__current-page");
    const $navigation = $(".p-slide-show__navigation");
    let currentIndex = 0;
    const interval = 10;
    let timer;

    let changeSlide = () => {
      document.getElementById('bar').value = 0;

      $slide.addClass("is-hidden-slide");
      $slide.eq(currentIndex).removeClass("is-hidden-slide");
      if (currentIndex == slideLength) {
        currentIndex = 0;
        $slide.addClass("is-hidden-slide");
        $slide.eq(currentIndex).removeClass("is-hidden-slide");
        $currentPage.text((currentIndex + 1) + " / 5");

      } else if (currentIndex == -1) {
        currentIndex = slideLength-1;
        $slide.addClass("is-hidden-slide");
        $slide.eq(currentIndex).removeClass("is-hidden-slide");
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
  const smoothScroll = () => {
    $('a[href^="#"]').click(function(){
      var speed = 500;
      var href= $(this).attr("href");
      var target = $(href == "#" || href == "" ? 'html' : href);
      var position = target.offset().top;
      $("html, body").animate({scrollTop:position}, speed, "swing");
      return false;
    });
  }
  smoothScroll();
  changeColor();
  slideShow();
  fadeUpAnimation();
  toggleAction();
});
