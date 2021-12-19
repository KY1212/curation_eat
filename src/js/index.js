import "../scss/style.scss";
import $ from "jquery";
// import progressbarjs from "progressbar.js"


$(function () {

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

  const headerActions = () => {
    const $hamburger = $(".c-hamburger");
    const $hamburgerBar = $(".c-hamburger span");
    const $list = $(".p-header__list");
    let position;
    const $headerItem = $(".p-header__item");
    const $topics = $(".l-topics");
    const $instagram = $(".p-header__instagram");
    const $logo = $(".p-header__logo");
    const $headerLogoWhite = $logo.find(".p-header__logo-white");
    const $headerLogoYellow = $logo.find(".p-header__logo-yellow");

    const changeColor = () => {
    $(window).on("scroll", function () {
      $list.each(function () {
        let scroll = $(window).scrollTop();
        let heightVH = $topics.offset().top-30;
        if (scroll > heightVH) {
          $list.addClass("is-change-color");
          $instagram.addClass("is-change-color");
          $hamburgerBar.css({
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
          $list.removeClass("is-change-color");
          $instagram.removeClass("is-change-color");
          $hamburgerBar.css({
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

    const clickHamburger = () => {
      if (window.matchMedia('(max-width: 768px)').matches) {
        $hamburger.toggleClass("is-active");
        $list.toggleClass("is-list-open");
        // if ($list.hasClass("is-list-open")) {
          changeColor();
          // position = $(window).scrollTop();
          // $("body").addClass("is-fixed").css({ "top": - position });
          smoothScroll();
        // } else if (!$list.hasClass("is-list-open")) {
          // changeColor();
        }
      // }
    }

    const smoothScroll = () => {
      $('.p-header__item a[href^="#"]').click(function(){
        const speed = 1000;
        const href= $(this).attr("href");
        const target = $(href == "#" || href == "" ? 'html' : href);
        let position = target.offset().top;
        $(".c-hamburger").removeClass("is-active");
        $(".p-header__list").removeClass("is-list-open");
        $("html, body").animate({ scrollTop: position }, speed,"swing");
        // $("body").removeClass("is-fixed").css({"top": 0});
        // window.scrollTo(0, position);
        return false;
      });
    }
    $hamburger.on("click", clickHamburger);
    changeColor();
  }

  slideShow();
  fadeUpAnimation();
  headerActions();
});
