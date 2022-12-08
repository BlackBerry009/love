var globe, scene;

window.addEventListener("load", () => {
  const scene = new Scene();
  scene.init();
  const gsap = new Gsap();
  gsap.init();
});

window.addEventListener("DOMContentLoaded", () => {
  setTime();
});

function setTime() {
  const beginTime = new Date("2022/10/24").getTime();
  setInterval(() => {
    const now = new Date();
    const gapDay = Math.floor(
      (now.getTime() - beginTime) / (1000 * 60 * 60 * 24)
    );
    const time = new Date().toTimeString().split(" ")[0];
    document.getElementById(
      "subheading"
    ).innerText = `这是我们在一起的第 ${gapDay} 天 ${time}`;
  }, 1000);
}

class Scene {
  constructor() {
    this.controller = new ScrollMagic.Controller();
  }
  init() {
    this.controller.addScene([
      this.intro(),
      this.autodidact(),
      this.photo(),
      this.design(),
      this.camarts(),
      this.camartsShowcase(),
    ]);
  }
  intro() {
    const e = new TimelineMax().add([
      TweenMax.fromTo(
        "#heading",
        1,
        { zIndex: 1, z: 1 },
        { yPercent: -23.6, autoAlpha: 0, ease: Linear.easeNone }
      ),
      TweenMax.fromTo(
        "#subheading",
        1,
        { zIndex: 1 },
        { yPercent: -14.5, autoAlpha: 0, ease: Linear.easeNone }
      ),
      TweenMax.to("#slice-left", 1, {
        yPercent: -38.2,
        autoAlpha: 0,
        ease: Linear.easeNone,
      }),
      TweenMax.to("#slice-right", 1, {
        yPercent: -61.8,
        autoAlpha: 0,
        ease: Linear.easeNone,
      }),
    ]);
    return new ScrollMagic.Scene({ duration: "61.8%" }).setTween(e);
  }
  autodidact() {
    const e = new TimelineMax().add([
      TweenMax.set("#content", { y: -200 }),
      TweenMax.fromTo(
        "#text-become-autodidact",
        1,
        { y: 200 },
        { y: 0, ease: Linear.easeNone }
      ),
      TweenMax.to("#text-become-autodidact", 0.5, {
        autoAlpha: 0,
        ease: Linear.easeNone,
      }),
      TweenMax.fromTo(
        "#text-learn-from",
        1,
        { y: 200 },
        { y: 0, ease: Linear.easeNone }
      ),
      TweenMax.to("#text-learn-from", 0.5, {
        autoAlpha: 0,
        ease: Linear.easeNone,
      }),
      TweenMax.fromTo(
        "#traveling",
        1,
        { y: 300 },
        { y: 480, ease: Linear.easeNone }
      ),
      TweenMax.fromTo(
        "#traveling",
        0.5,
        { autoAlpha: 0 },
        { autoAlpha: 1, ease: Linear.easeNone }
      ),
      TweenMax.fromTo(
        "#sentence1",
        1,
        { y: 200 },
        { x: -1000, ease: Linear.easeNone }
      ),
      TweenMax.fromTo(
        "#sentence1",
        0.5,
        { autoAlpha: 0 },
        { autoAlpha: 1, ease: Linear.easeNone }
      ),
      TweenMax.fromTo(
        "#sentence2",
        1,
        { x: 0, y: 0 },
        { x: 500, ease: Linear.easeNone }
      ),
      TweenMax.fromTo(
        "#sentence2",
        0.5,
        { autoAlpha: 0 },
        { autoAlpha: 1, ease: Linear.easeNone }
      ),
      TweenMax.fromTo(
        "#sentence3",
        1,
        { y: -200 },
        { x: -500, y: 1000, ease: Linear.easeNone }
      ),
      TweenMax.fromTo(
        "#sentence3",
        0.5,
        { autoAlpha: 0 },
        { autoAlpha: 1, ease: Linear.easeNone }
      ),
      TweenMax.fromTo(
        "#sentence4",
        1,
        { x: 0, y: -300 },
        { x: 200, y: 800, ease: Linear.easeNone }
      ),
      TweenMax.fromTo(
        "#sentence4",
        0.5,
        { autoAlpha: 0 },
        { autoAlpha: 1, ease: Linear.easeNone }
      ),
    ]);
    return new ScrollMagic.Scene({
      triggerElement: "#content",
      duration: "61.8%",
      offset: 500,
    }).setTween(e);
  }
  photo() {
    const e = new TimelineMax().add([
      TweenMax.to("#group", 1, {
        rotationX: 6,
        rotationY: 0,
        rotationZ: 4.5,
        ease: Linear.easeNone,
      }),
      TweenMax.fromTo(
        "#photo-a",
        1,
        { "-webkit-filter": "blur(0)" },
        {
          "-webkit-filter": "blur(3px)",
          scale: 1.3,
          xPercent: -38.2,
          yPercent: -38.2,
          ease: Linear.easeIn,
        }
      ),
      TweenMax.to("#photo-b", 1, {
        xPercent: -18.2,
        yPercent: -18.2,
        ease: Linear.easeIn,
      }),
      TweenMax.fromTo(
        "#photo-c",
        1,
        { "-webkit-filter": "blur(0)" },
        {
          "-webkit-filter": "blur(6px)",
          scale: 1.6,
          xPercent: -61.8,
          yPercent: -61.8,
          ease: Linear.easeIn,
        }
      ),
      TweenMax.to("#photo-d", 1, {
        xPercent: -1.8,
        yPercent: -1.8,
        ease: Linear.easeIn,
      }),
      TweenMax.fromTo(
        "#photo-e",
        1,
        { "-webkit-filter": "blur(0)" },
        {
          "-webkit-filter": "blur(8px)",
          scale: 1.8,
          xPercent: -88.8,
          yPercent: -88.8,
          ease: Linear.easeIn,
        }
      ),
      TweenMax.fromTo(
        "#photo-f",
        1,
        { "-webkit-filter": "blur(0)" },
        {
          "-webkit-filter": "blur(6px)",
          scale: 1.6,
          xPercent: -61.8,
          yPercent: -61.8,
          ease: Linear.easeIn,
        }
      ),
      TweenMax.fromTo(
        "#photo-g",
        1,
        { "-webkit-filter": "blur(0)" },
        {
          "-webkit-filter": "blur(3px)",
          xPercent: -38.2,
          yPercent: -38.2,
          ease: Linear.easeIn,
        }
      ),
      TweenMax.fromTo(
        "#photo-h",
        1,
        { "-webkit-filter": "blur(0)" },
        {
          "-webkit-filter": "blur(2px)",
          xPercent: -21.8,
          yPercent: -21.8,
          ease: Linear.easeIn,
        }
      ),
    ]);
    return new ScrollMagic.Scene({
      triggerElement: "#photography",
      triggerHook: 0.1,
      duration: "100%",
    }).setTween(e);
  }
  design() {
    const e = new TimelineMax().add([
      TweenMax.to("#text-design", 1, {
        yPercent: -30,
        autoAlpha: 0,
        ease: Linear.easeNone,
      }),
      TweenMax.fromTo(
        "#text-dot-connecting",
        1,
        { autoAlpha: 0 },
        { autoAlpha: 1, ease: Linear.easeNone }
      ),
    ]);
    return new ScrollMagic.Scene({
      triggerElement: "#design",
      triggerHook: 0.5,
      duration: "38.2%",
    }).setTween(e);
  }
  camarts() {
    const e = new TimelineMax().add([
      TweenMax.fromTo(
        "#text-camarts",
        1,
        { y: "-50vh" },
        { y: 0, ease: Linear.easeNone }
      ),
      TweenMax.fromTo(
        "#backdrop",
        1,
        { height: 0 },
        { height: "100%", ease: Linear.easeNone }
      ),
    ]);
    return new ScrollMagic.Scene({
      triggerElement: "#camarts",
      triggerHook: 1,
      duration: "100%",
    }).setTween(e);
  }
  camartsShowcase() {
    return new ScrollMagic.Scene({
      triggerElement: "#camarts",
      triggerHook: 0.1,
      duration: "100%",
    }).setClassToggle("#camarts", "active");
  }
}

class Gsap {
  init() {
    this.gallery();
  }
  gallery() {
    let sections = gsap.utils.toArray(".panel");
    gsap.to(sections, {
      xPercent: -200 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: "#sectionRow1Pin",
        pin: true,
        scrub: true,
        end: "+=" + document.querySelector(".pin-wrap").offsetWidth,
      },
    });
  }
}
