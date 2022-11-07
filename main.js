var globe, scene, node, guestbook;
window.onload = () => {
  // (globe = new Globe()).init(),
  (scene = new Scene()).init(),
    (node = new Node()),
    (guestbook = new Guestbook()).init();
  const beginTime = new Date("2022/10/24").getTime();
  setInterval(() => {
    const now = new Date();
    const gapDay = Math.floor(
      (now.getTime() - beginTime) / (1000 * 60 * 60 * 24)
    );
    const time = now.toLocaleTimeString();
    document.getElementById(
      "subheading"
    ).innerText = `这是我们在一起的第 ${gapDay} 天 ${time}`;
  }, 1000);
};
class Globe {
  constructor() {
    (this.canvas = document.getElementById("globe")),
      (this.planet = planetaryjs.planet()),
      (this.diameter = 0);
  }
  init() {
    this.planet.loadPlugin(this.rotate(10)),
      this.planet.loadPlugin(
        planetaryjs.plugins.earth({
          topojson: { file: "data/borderless-world.json" },
          oceans: { fill: "#dddee0" },
          land: { fill: "#f7f7f7" },
        })
      ),
      this.planet.loadPlugin(
        planetaryjs.plugins.drag({
          onDragStart() {
            this.plugins.rotate.pause();
          },
          onDragEnd() {
            this.plugins.rotate.resume();
          },
        })
      ),
      this.planet.loadPlugin(
        planetaryjs.plugins.pings({ color: "#df5f5f", ttl: 2e3, angle: 2 })
      ),
      this.locations(),
      this.scale(),
      this.planet.draw(this.canvas),
      this.planet.projection.rotate([0, -25, 0]),
      window.addEventListener("resize", () => this.scale());
  }
  scale() {
    const e = window.innerWidth,
      t = Math.max(300, Math.min(500, e - 0.6 * e)),
      n = t / 2;
    (this.canvas.width = t),
      (this.canvas.height = t),
      this.planet.projection.scale(n).translate([n, n]),
      (this.diameter = t);
  }
  rotate(e) {
    return (t) => {
      let n = null,
        a = !1;
      (t.plugins.rotate = {
        pause() {
          a = !0;
        },
        resume() {
          a = !1;
        },
      }),
        t.onDraw(() => {
          if (a || !n) n = new Date();
          else {
            const a = new Date(),
              s = a - n,
              o = t.projection.rotate();
            (o[0] += (e * s) / 1e3),
              o[0] >= 180 && (o[0] -= 360),
              t.projection.rotate(o),
              (n = a);
          }
        });
    };
  }
  locations() {
    d3.json("data/coordinates.json", (e, t) => {
      if (e) return console.error(e);
      for (const e of t.coordinates)
        setInterval(() => {
          this.planet.plugins.pings.add(e[0], e[1]);
        }, Math.floor(3e3 * Math.random()) + 2e3);
    });
  }
}
class Scene {
  constructor() {
    this.controller = new ScrollMagic.Controller();
  }
  init() {
    this.controller.addScene([
      this.intro(),
      this.autodidact(),
      // this.globe(),
      this.photo(),
      this.node(),
      this.design(),
      this.camarts(),
      this.camartsShowcase(),
      this.markly(),
      this.vary(),
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
  // globe() {
  //   const e = d3.scale.linear().domain([375, 2560]).range([3, 6]),
  //     t = new TimelineMax().add([
  //       TweenMax.fromTo(
  //         "#globe-container",
  //         0.8,
  //         { "-webkit-filter": `blur(${e(window.innerWidth)}px)` },
  //         { "-webkit-filter": "blur(0)", ease: Linear.easeNone }
  //       ),
  //       TweenMax.fromTo(
  //         "#globe",
  //         1,
  //         { scale: Math.max(800, window.innerWidth) / globe.diameter },
  //         { scale: 1, y: 220, ease: Linear.easeNone }
  //       ),
  //     ]);
  //   return new ScrollMagic.Scene({
  //     triggerElement: "#content",
  //     duration: "50%",
  //     offset: 380,
  //   }).setTween(t);
  // }
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
  node() {
    const e = new TimelineMax().add([
      TweenMax.fromTo(
        "#nodes path",
        1,
        { "stroke-dashoffset": 1200 },
        { "stroke-dashoffset": 0, ease: Linear.easeIn }
      ),
    ]);
    return new ScrollMagic.Scene({
      triggerElement: "#nodes",
      triggerHook: 0.5,
      duration: "80%",
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
  markly() {
    const e = new TimelineMax().add([
      TweenMax.to("#markly-showcase-a", 1, {
        yPercent: -10,
        ease: Linear.easeNone,
      }),
      TweenMax.to("#markly-showcase-b", 1, {
        yPercent: -30,
        ease: Linear.easeNone,
      }),
    ]);
    return new ScrollMagic.Scene({
      triggerElement: "#markly",
      triggerHook: 0.1,
      duration: "100%",
    }).setTween(e);
  }
  vary() {
    const e = new TimelineMax().add([
      TweenMax.from("#vary-showcase-a", 1, {
        xPercent: 10,
        ease: Linear.easeNone,
      }),
      TweenMax.from("#vary-showcase-b", 1, {
        xPercent: 30,
        ease: Linear.easeNone,
      }),
      TweenMax.from("#vary-showcase-c", 1, {
        xPercent: 60,
        ease: Linear.easeNone,
      }),
    ]);
    return new ScrollMagic.Scene({
      triggerElement: "#vary",
      triggerHook: 0.9,
      duration: "100%",
    }).setTween(e);
  }
}
class Node {
  constructor() {
    this.container = document.getElementById("nodes");
  }
  increment() {
    this.container.scrollLeft += window.innerWidth;
  }
  didScroll() {
    const e =
      this.container.scrollWidth - this.container.scrollLeft <=
      window.innerWidth + 60;
    this.container.classList = e ? "reached" : "";
  }
}
class Guestbook {
  constructor() {
    (this.messages = this.element("recent-messages")),
      (this.container = this.element("new-message")),
      (this.nextButton = this.element("next-step-button")),
      (this.contentField = this.element("message-content")),
      (this.nameField = this.element("message-name")),
      (this.emailField = this.element("message-email")),
      (this.URLField = this.element("message-url"));
  }
  init() {
    this.messages &&
      this.GET((e) => {
        200 == e.status || 201 == e.status
          ? (this.render(JSON.parse(e.responseText)),
            (this.messages.parentNode.classList += " fetched"))
          : console.error("Failed to load messages");
      });
  }
  render(e) {
    e.forEach((e) =>
      this.messages.insertAdjacentHTML("beforeend", this.template(e))
    );
  }
  template(e) {
    return `<div class="message">\n\t\t\t\t\t<header>\n\t\t\t\t\t\t<img src="${
      e.avatar || "?"
    }" />\n\t\t\t\t\t\t<h3>${
      e.name
    }</h3>\n\t\t\t\t\t</header>\n\t\t\t\t\t<div class="message-content">\n\t\t\t\t\t\t<p>${
      e.content
    }</p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>`;
  }
  element(e) {
    return document.getElementById(e);
  }
  next() {
    this.container.className = "second-step";
  }
  post(e) {
    const t = {
      post: 1008,
      content: this.contentField.value,
      author_name: this.nameField.value,
      author_email: this.emailField.value,
      author_url: this.URLField.value,
      author_user_agent: navigator.userAgent + " DWAPI/7.0",
    };
    t.author_email.length > 0 && !/\S+@\S+\.\S+/.test(t.author_email)
      ? console.info("Todo: handle invalid email address")
      : ((e.className = "posting"),
        (e.innerHTML = ""),
        this.POST(t, (e) => {
          200 == e.status || 201 == e.status
            ? this.messageDidPost()
            : alert("Please try again later");
        }));
  }
  contentDidChange(e) {
    this.nextButton.className = e.value.length < 5 ? "inactive" : "";
  }
  messageDidPost() {
    this.container.className = "third-step";
  }
  request(e, t, n, a) {
    const s = new XMLHttpRequest();
    (s.onreadystatechange = () => {
      4 === s.readyState && a && a(s);
    }),
      s.open(t, "https://blog.dandyweng.com/wp-json/wp/v2/" + e, !0),
      s.setRequestHeader("Content-Type", "application/json"),
      s.send(JSON.stringify(n));
  }
  GET(e) {
    this.request("homepage-comment", "GET", null, e);
  }
  POST(e, t) {
    this.request("comments", "POST", e, t);
  }
}
