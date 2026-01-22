/* ================= BÀI 1: ĐỔI NỀN ================= */
document.getElementById("toggleTheme").onclick = () => {
    document.body.classList.toggle("light");
};

/* ================= BÀI 2: MENU ACTIVE + PROGRESS ================= */
const sections = document.querySelectorAll(".panel");
const links = document.querySelectorAll("nav a");
const progress = document.querySelector(".progress");

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const height = document.body.scrollHeight - window.innerHeight;

    // Thanh tiến trình cuộn
    progress.style.width = (scrollY / height) * 100 + "%";

    sections.forEach(sec => {
        const top = sec.offsetTop - 200;
        const bottom = top + sec.offsetHeight;

        if (scrollY >= top && scrollY < bottom) {
            links.forEach(a => a.classList.remove("active"));
            document
                .querySelector(`nav a[href="#${sec.id}"]`)
                .classList.add("active");
        }
    });
});

/* ================= BÀI 3: BOX HIỆN / ẨN VÔ HẠN ================= */
const items = document.querySelectorAll(".item");

window.addEventListener("scroll", () => {
    items.forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100 && rect.bottom > 100) {
            item.classList.add("show");
        } else {
            item.classList.remove("show");
        }
    });
});

/* ================= CURSOR THEO CHUỘT (MƯỢT) ================= */
const cursor = document.querySelector(".cursor");
let mouseX = 0, mouseY = 0;
let currentX = 0, currentY = 0;

window.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function cursorLoop() {
    currentX += (mouseX - currentX) * 0.2;
    currentY += (mouseY - currentY) * 0.2;

    cursor.style.left = currentX + "px";
    cursor.style.top = currentY + "px";

    requestAnimationFrame(cursorLoop);
}
cursorLoop();

/* ================= CURSOR ĐỔI TRẠNG THÁI KHI HOVER NÚT ================= */
const hoverTargets = document.querySelectorAll("button, a");

hoverTargets.forEach(el => {
    el.addEventListener("mouseenter", () => {
        cursor.classList.add("hover-btn");
    });
    el.addEventListener("mouseleave", () => {
        cursor.classList.remove("hover-btn");
    });
});

/* ================= ĐỔI KIỂU CURSOR NGẪU NHIÊN ================= */
const styles = [
    "style-1","style-2","style-3","style-4",
    "style-5","style-6","style-7","style-8",
    "style-9","style-10","style-11","style-12"
];

document.getElementById("cursorBtn").onclick = () => {
    const random = styles[Math.floor(Math.random() * styles.length)];
    cursor.className = "cursor " + random;
};
