import "../scss/style.scss";
import $ from "jquery";

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
    const slideLength = $slide.length;
    const $prev = $(".p-slide-show__prev");
    const $next = $(".p-slide-show__next");
    const indicatorHTML = '<li class="indicatorItem"></li>';

    let currentIndex = 0;
    // console.log(slideLength);

    let changeSlide = () => {
      console.log(currentIndex);

      $slide.addClass("is-active");
      $slide.eq(currentIndex).removeClass("is-active");

      if (currentIndex == slideLength) {
        currentIndex = 0;
        $slide.addClass("is-active");
        $slide.eq(currentIndex).removeClass("is-active");

      } else if (currentIndex == -1) {
        currentIndex = slideLength-1;
        $slide.addClass("is-active");
        $slide.eq(slideLength-1).removeClass("is-active");
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

    $prev.on("click", prevSlide);
    $next.on("click", nextSlide);
  }

  slideShow();

  fadeUpAnimation();
  toggleAction();
});
