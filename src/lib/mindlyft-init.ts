import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import Swiper from "swiper/bundle";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText, CustomEase);

export function initMindlyft() {
    "use strict";

    //Header Sticky
    const getHeaderId = document.querySelector(".navbar-area");
    if (getHeaderId) {
        const navbar = document.querySelector('#navbar');
        window.addEventListener('scroll', (event: Event) => {
            if (!navbar) return;
            const height = 150;
            const { scrollTop } = (event.target as Document).scrollingElement!;
            navbar.classList.toggle('sticky', scrollTop >= height);
        });
    }

    // Back to Top
    const progressPath = document.getElementById("progress-path") as SVGPathElement | null;
    const progressWrap = document.getElementById("progress-wrap");
    if (progressPath && progressWrap) {
        let pathLength = progressPath.getTotalLength();
        progressPath.style.transition = (progressPath.style as any).webkitTransition = "none";
        progressPath.style.strokeDasharray = pathLength + " " + pathLength;
        progressPath.style.strokeDashoffset = String(pathLength);
        progressPath.getBoundingClientRect();
        progressPath.style.transition = (progressPath.style as any).webkitTransition =
            "stroke-dashoffset 10ms linear";

        const onScrollEvent = function () {
            const scroll = window.scrollY;
            const height = document.body.scrollHeight - window.innerHeight;
            const progress = pathLength - (scroll * pathLength) / height;
            progressPath.style.strokeDashoffset = String(progress);

            const offset = 50;
            if (window.scrollY > offset) {
                progressWrap.classList.add("active-progress");
            } else {
                progressWrap.classList.remove("active-progress");
            }
        };

        onScrollEvent();
        window.onscroll = onScrollEvent;
        progressWrap.onclick = function () {
            window.scroll({ top: 0, behavior: "smooth" });
            return false;
        };
    }

    // Preloader
    const getPreloaderId = document.getElementById('preloader');
    if (getPreloaderId) {
        getPreloaderId.style.display = 'none';
    }

    //Team Slider
    if (document.querySelector(".team-slider-one")) {
        new Swiper(".team-slider-one", {
            loop: true,
            speed: 1500,
            spaceBetween: 25,
            slidesPerView: 1,
            autoHeight: true,
            navigation: {
                nextEl: ".team-next",
                prevEl: ".team-prev",
            },
            breakpoints: {
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                992: { slidesPerView: 3 },
                1200: { slidesPerView: 4 }
            }
        });
    }

    //Product Slider
    if (document.querySelector(".product-slider-one")) {
        new Swiper(".product-slider-one", {
            loop: true,
            speed: 1500,
            spaceBetween: 25,
            navigation: {
                nextEl: ".product-next",
                prevEl: ".product-prev",
            },
            breakpoints: {
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                992: { slidesPerView: 3 },
                1200: { slidesPerView: 4 }
            }
        });
    }

    //Service Slider
    if (document.querySelector(".service-slider-one")) {
        new Swiper(".service-slider-one", {
            loop: true,
            speed: 1500,
            spaceBetween: 25,
            navigation: {
                nextEl: ".service-next",
                prevEl: ".service-prev",
            },
            breakpoints: {
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                992: { slidesPerView: 3 },
                1200: { slidesPerView: 3 },
                1400: { slidesPerView: 4 }
            }
        });
    }

    //Project Slider
    if (document.querySelector(".project-slider-one")) {
        new Swiper(".project-slider-one", {
            loop: true,
            speed: 1500,
            spaceBetween: 8,
            slidesPerView: 1,
            autoHeight: true,
            navigation: {
                nextEl: ".project-next",
                prevEl: ".project-prev",
            },
            breakpoints: {
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1200: { slidesPerView: 3 },
                1400: { slidesPerView: 4 }
            }
        });
    }

    //Testimonial Slider One
    if (document.querySelector(".testimonial-slider-one")) {
        new Swiper(".testimonial-slider-one", {
            loop: false,
            speed: 1500,
            spaceBetween: 25,
            slidesPerView: 1,
            autoHeight: true,
            navigation: {
                nextEl: ".testimonial-next",
                prevEl: ".testimonial-prev",
            },
            breakpoints: {
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1200: { slidesPerView: 3 },
                1400: { slidesPerView: 3.1 },
                1600: { slidesPerView: 3.65 }
            }
        });
    }

    if (document.querySelector(".testimonial-slider-two")) {
        new Swiper(".testimonial-slider-two", {
            loop: false,
            speed: 1500,
            spaceBetween: 25,
            autoHeight: true,
            slidesPerView: 1,
            fadeEffect: { crossFade: true },
            effect: "fade",
            navigation: {
                nextEl: ".testimonial-next",
                prevEl: ".testimonial-prev",
            },
            pagination: {
                el: ".testimonial-pagination",
                clickable: true,
            }
        });
    }

    if (document.querySelector(".testimonial-slider-three")) {
        new Swiper(".testimonial-slider-three", {
            loop: false,
            speed: 1500,
            spaceBetween: 10,
            autoHeight: true,
            slidesPerView: 1,
            fadeEffect: { crossFade: true },
            effect: "fade",
            navigation: {
                nextEl: ".testimonial-next",
                prevEl: ".testimonial-prev",
            },
        });
    }

    //Brand Slider
    if (document.querySelector(".brand-slider-one")) {
        new Swiper(".brand-slider-one", {
            loop: false,
            speed: 15000,
            spaceBetween: 45,
            simulateTouch: false,
            autoplay: {
                delay: 1,
                disableOnInteraction: false
            },
            breakpoints: {
                0: { slidesPerView: 2.5 },
                576: { slidesPerView: 3.5 },
                768: { slidesPerView: 4 },
                992: { slidesPerView: 4.5 },
                1200: { slidesPerView: 5 },
                1400: { slidesPerView: 5 },
                1600: { slidesPerView: 8 }
            }
        });
    }

    // Counter
    if ("IntersectionObserver" in window) {
        const counterObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const counter = entry.target as HTMLElement;
                    const target = parseInt(counter.innerText);
                    const step = target / 200;
                    let current = 0;
                    const timer = setInterval(function () {
                        current += step;
                        counter.innerText = String(Math.floor(current));
                        if (parseInt(counter.innerText) >= target) {
                            clearInterval(timer);
                        }
                    }, 10);
                    counterObserver.unobserve(counter);
                }
            });
        });
        document.querySelectorAll(".counter").forEach(function (counter) {
            counterObserver.observe(counter);
        });
    }

    //Custom Date
    const input = document.getElementById('customDateInput') as HTMLInputElement | null;
    const wrapper = document.getElementById('dateWrapper');

    if (input && wrapper) {
        const inp = input; // narrowed non-null reference for closures
        wrapper.addEventListener('click', () => {
            if (typeof (inp as any).showPicker === 'function') {
                (inp as any).showPicker();
            } else {
                inp.focus();
            }
        });
        function updateEmptyClass() {
            if (!inp.value) {
                inp.classList.add('empty');
            } else {
                inp.classList.remove('empty');
            }
        }
        inp.addEventListener('change', updateEmptyClass);
        updateEmptyClass();
    }

    //GSAP Mousemove Animation
    const moveonmouse = gsap.utils.toArray<HTMLElement>(".moveContent");
    if (moveonmouse.length) {
        function mouseMoveFunc(e: MouseEvent) {
            moveonmouse.forEach((circle, index) => {
                const depth = 65;
                const moveX = (e.pageX - window.innerWidth / 2) / depth;
                const moveY = (e.pageY - window.innerHeight / 2) / depth;
                index++;
                gsap.to(circle, { x: moveX * index, y: moveY * index });
            });
        }
        document.addEventListener("mousemove", mouseMoveFunc);
    }

    //Title Animation With SplitText
    const splitTitleLines = gsap.utils.toArray<HTMLElement>(".title-anim");
    splitTitleLines.forEach(splitTextLine => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: splitTextLine,
                start: 'top 90%',
                end: 'bottom 60%',
                scrub: false,
                markers: false,
                toggleActions: 'play none none none'
            }
        });
        const itemSplitted = new SplitText(splitTextLine, { type: "words, lines" });
        gsap.set(splitTextLine, { perspective: 400 });
        itemSplitted.split({ type: "lines" });
        tl.from(itemSplitted.lines, { duration: 1, delay: 0.3, opacity: 0, rotationX: -80, force3D: true, transformOrigin: "top center -50", stagger: 0.1 });
    });

    //Text Reveal Animation
    {
        const textRevealElements = document.querySelectorAll<HTMLElement>(".reveal-text");
        textRevealElements.forEach((element) => {
            if (element.dataset.processed) return;
            element.dataset.processed = "true";

            element.innerHTML = (element.textContent || "").replace(
                /([-A-Za-z0-9!$#%^&*@()_+|~=`{}\[\]:";'<>?,.\/]+)/g,
                '<div class="word">$1</div>'
            );

            const words = element.querySelectorAll<HTMLElement>(".word");
            words.forEach((word) => {
                word.innerHTML = (word.textContent || "").replace(
                    /[-A-Za-z0-9!$#%^&*@()_+|~=`{}\[\]:";'<>?,.\/]/g,
                    "<div class='perspective'><div class='letter'><div>$&</div></div></div>"
                );
            });

            const letters = element.querySelectorAll(".letter");
            const isLoop = element.classList.contains("reveal-loop");
            const tlVars: gsap.TimelineVars = {
                repeat: isLoop ? -1 : 0,
                repeatDelay: isLoop ? 2 : 0,
            };
            if (!isLoop) {
                tlVars.scrollTrigger = { trigger: element, toggleActions: "restart none none reset" };
            }
            const tl = gsap.timeline(tlVars);
            tl.set(element, { autoAlpha: 1 });
            tl.fromTo(
                letters,
                { transformOrigin: "center", rotationY: 90, x: 30 },
                { duration: 1.2, rotationY: 0.1, x: 0, stagger: 0.025, ease: CustomEase.create("custom", "M0,0 C0.425,0.005 0,1 1,1") }
            );
        });
    }

    //GSAP Image Tilt Effect
    document.querySelectorAll<HTMLElement>(".tilt-img").forEach((img) => {
        img.addEventListener("mousemove", (e) => {
            const { width, height, left, top } = img.getBoundingClientRect();
            const x = (e.clientX - left - width / 2) / width * 2;
            const y = (e.clientY - top - height / 2) / height * 2;
            gsap.to(img, {
                rotateY: x * 15,
                rotateX: y * -15,
                transformPerspective: 2000,
                ease: "power2.out",
                duration: 0.3,
            });
        });
        img.addEventListener("mouseleave", () => {
            gsap.to(img, { rotateY: 0, rotateX: 0, duration: 0.5, ease: "power2.out" });
        });
    });

    // ScrollTrigger is registered at module level above; re-registering is idempotent.
    gsap.registerPlugin(ScrollTrigger);

    //Move Element On Scroll
    if (document.querySelector(".move-left")) {
        gsap.to('.move-left', {
            xPercent: 60,
            ease: "none",
            scrollTrigger: { trigger: ".move-left", start: "0% 90%", end: "100% 10%", scrub: true }
        });
    }
    if (document.querySelector(".move-right")) {
        gsap.to('.move-right', {
            xPercent: -50,
            ease: "none",
            scrollTrigger: { trigger: ".move-right", start: "0% 90%", end: "100% 10%", scrub: true }
        });
    }
    if (document.querySelector(".move-top")) {
        gsap.to('.move-top', {
            yPercent: -70,
            ease: "none",
            scrollTrigger: { trigger: ".move-top", start: "0% 85%", end: "100% 10%", scrub: true }
        });
    }
    if (document.querySelector(".move-bottom")) {
        gsap.to('.move-bottom', {
            yPercent: 80,
            ease: "none",
            scrollTrigger: { trigger: ".move-bottom", start: "0% 5%", end: "100% 0%", scrub: true }
        });
    }

    //Quantity Counter
    const plusMinusWidgets = document.querySelectorAll<HTMLElement>(".v-counter");
    plusMinusWidgets.forEach((widget) => {
        const minusBtn = widget.querySelector(".minusBtn");
        const plusBtn = widget.querySelector(".plusBtn");
        if (minusBtn) minusBtn.addEventListener("click", clickHandler);
        if (plusBtn) plusBtn.addEventListener("click", clickHandler);
    });

    function clickHandler(event: Event) {
        const target = event.target as HTMLElement;
        const countEl = target.parentNode?.querySelector(".count") as HTMLInputElement | null;
        if (!countEl) return;
        if (target.className.match(/\bminusBtn\b/)) {
            countEl.value = String(Math.max(0, Number(countEl.value) - 1));
        } else if (target.className.match(/\bplusBtn\b/)) {
            countEl.value = String(Number(countEl.value) + 1);
        }
        if ('createEvent' in document) {
            const e = document.createEvent('HTMLEvents');
            e.initEvent("change", false, true);
            countEl.dispatchEvent(e);
        }
    }

    // ScrollCue — set by LibraryLoader via script injection
    const scrollCue = (window as any).scrollCue;
    if (scrollCue) scrollCue.init();

    //Price Range Slider
    const minPriceSlider = document.getElementById('minPrice') as HTMLInputElement | null;
    const maxPriceSlider = document.getElementById('maxPrice') as HTMLInputElement | null;
    const minPriceDisplay = document.getElementById('minPriceDisplay');
    const maxPriceDisplay = document.getElementById('maxPriceDisplay');
    const rangeProgress = document.querySelector<HTMLElement>('.range-progress');

    if (minPriceSlider && maxPriceSlider && minPriceDisplay && maxPriceDisplay && rangeProgress) {
        function updatePriceDisplay() {
            minPriceDisplay!.textContent = `$${minPriceSlider!.value}`;
            maxPriceDisplay!.textContent = `$${maxPriceSlider!.value}`;
        }
        function updateRangeProgress() {
            const minVal = parseInt(minPriceSlider!.value);
            const maxVal = parseInt(maxPriceSlider!.value);
            const minRange = parseInt(minPriceSlider!.min);
            const maxRange = parseInt(minPriceSlider!.max);
            const leftPercent = ((minVal - minRange) / (maxRange - minRange)) * 100;
            const rightPercent = ((maxVal - minRange) / (maxRange - minRange)) * 100;
            rangeProgress!.style.left = leftPercent + '%';
            rangeProgress!.style.right = (100 - rightPercent) + '%';
        }
        minPriceSlider.addEventListener('input', function () {
            if (parseInt(minPriceSlider.value) > parseInt(maxPriceSlider.value)) {
                minPriceSlider.value = maxPriceSlider.value;
            }
            updatePriceDisplay();
            updateRangeProgress();
        });
        maxPriceSlider.addEventListener('input', function () {
            if (parseInt(maxPriceSlider.value) < parseInt(minPriceSlider.value)) {
                maxPriceSlider.value = minPriceSlider.value;
            }
            updatePriceDisplay();
            updateRangeProgress();
        });
        updatePriceDisplay();
        updateRangeProgress();
    }

    //Custom Cursor
    const cursor = document.querySelector<HTMLElement>('.cursor');
    const cursorinner = document.querySelector<HTMLElement>('.cursor-inner');

    if (cursor && cursorinner) {
        let cursorVisible = false;
        document.addEventListener('mousemove', function (e) {
            if (!cursorVisible) {
                cursorVisible = true;
                cursor.style.opacity = '1';
                cursorinner.style.opacity = '0.9';
            }
            cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
            cursorinner.style.left = e.clientX + 'px';
            cursorinner.style.top = e.clientY + 'px';
        });
        document.addEventListener('mousedown', function () {
            cursor.classList.add('click');
            cursorinner.classList.add('cursorinnerhover');
        });
        document.addEventListener('mouseup', function () {
            cursor.classList.remove('click');
            cursorinner.classList.remove('cursorinnerhover');
        });
        document.querySelectorAll('a').forEach(item => {
            item.addEventListener('mouseover', () => { cursor.classList.add('hover'); });
            item.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); });
        });
    }

    //Theme Toggle
    try {
        function setTheme(themeName: string) {
            localStorage.setItem('aixio_theme', themeName);
            document.documentElement.className = themeName;
        }
        (window as any).toggleTheme = function () {
            if (localStorage.getItem('aixio_theme') === 'theme-dark') {
                setTheme('theme-light');
            } else {
                setTheme('theme-dark');
            }
        };
        (function () {
            const sliderBtn = document.querySelector<HTMLInputElement>('.slider-btn');
            if (localStorage.getItem('aixio_theme') === 'theme-dark') {
                setTheme('theme-dark');
                if (sliderBtn) sliderBtn.checked = false;
            } else {
                setTheme('theme-light');
                if (sliderBtn) sliderBtn.checked = true;
            }
        })();
    } catch (err) {}

    //Pricing Card Toggle
    (window as any).check = function () {
        const checkBox = document.getElementById("togBtn") as HTMLInputElement | null;
        if (!checkBox) return;
        const text1 = document.getElementsByClassName("text2");
        const text2 = document.getElementsByClassName("text1");
        for (let i = 0; i < text1.length; i++) {
            if (checkBox.checked === true) {
                (text1[i] as HTMLElement).style.display = "block";
                (text2[i] as HTMLElement).style.display = "none";
            } else {
                (text1[i] as HTMLElement).style.display = "none";
                (text2[i] as HTMLElement).style.display = "block";
            }
        }
    };
    (window as any).check();
}
