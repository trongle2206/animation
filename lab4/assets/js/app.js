// AOS
AOS.init({
  duration: 1000,
  once: true
});

// GSAP basic tween
window.addEventListener("load", () => {
  gsap.to(".gsap-box", {
    x: 200,
    opacity: 1,
    duration: 1.5
  });
});

// GSAP timeline
const tl = gsap.timeline();
tl.from(".header-anim", { y: -50, opacity: 0 })
  .from(".hero-title", { y: 30, opacity: 0 })
  .from(".hero-cta", { scale: 0, opacity: 0 });

// GSAP stagger on scroll
window.addEventListener("scroll", () => {
  const section = document.querySelector("#bai5");
  if (section.getBoundingClientRect().top < window.innerHeight / 1.3) {
    gsap.to(".card", {
      opacity: 1,
      y: 0,
      stagger: 0.2
    });
  }
});

// Toggle code theo từng bài
document.querySelectorAll(".toggle-code").forEach(btn => {
  btn.addEventListener("click", () => {
    const code = btn.nextElementSibling;
    const open = code.style.display === "block";
    code.style.display = open ? "none" : "block";
    btn.textContent = open ? "Hiện code" : "Ẩn code";
  });
});
