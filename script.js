function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });


  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();

}
loco()


function videomouse() {
  let crscr = document.querySelector("#crsr")
  let video = document.querySelector("#video-container")

  video.addEventListener("mouseenter", function () {
    gsap.to(crscr, {
      scale: 1,
      opacity: 1
    })
  })

  video.addEventListener("mouseleave", function () {
    gsap.to(crscr, {
      scale: 0,
      opacity: 0
    })
  })

  video.addEventListener("mousemove", function (props) {
    gsap.to(crscr, {
      left: props.x - 50,
      top: props.y - 80
    })
  })
}
videomouse();


function maincursor() {
  let big = document.querySelector("#cursor")
  let start = document.querySelector("#page4")

  document.addEventListener("mousemove", function (props) {
    gsap.to(big, {
      left: props.x,
      top: props.y
    })
  })

  start.addEventListener("mouseenter", function () {
    gsap.to(big, {
      scale: 1,
    })
  })

  start.addEventListener("mouseleave", function () {
    gsap.to(big, {
      scale: 0,
    })
  })
}
maincursor()


function pageAnimatins() {
  let tl = gsap.timeline();


tl.from("#page1 h1", {
  y: "100vh",
  duration: 1,
  zindex: -1,
  stagger: 0.2,
  opacity: 0
})

tl.from ("#page1 #video-container", {
  opacity: 0,
  y: "100vh",
})

tl.from("#page2", {
  opacity: 0
})
}
pageAnimatins()


function navbarHide() {
  gsap.to("nav #part2 h4", {
    opacity: 0,
    scrollTrigger: {
      trigger: "nav #part2 h4",
      scroller: "#main",
      scrub: 0.5,
      start: "top 1%",
      end:"top 2%"
    }
  })
}
navbarHide()

