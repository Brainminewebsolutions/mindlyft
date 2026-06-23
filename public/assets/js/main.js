window.initMindlyft = function() {
    "use strict";

    //Header Sticky
    const getHeaderId = document.querySelector(".navbar-area");
    if (getHeaderId) {
        const navbar = document.querySelector('#navbar');
        window.addEventListener('scroll', event => {
            if (!navbar) return;
            const height = 150;
            const { scrollTop } = event.target.scrollingElement;
            navbar.classList.toggle('sticky', scrollTop >= height);
        });
    }

    // Back to Top
    let progressPath = document.getElementById("progress-path");
    let progressWrap = document.getElementById("progress-wrap");
    if (progressPath && progressWrap) {
        let pathLength = progressPath.getTotalLength();
        progressPath.style.transition = progressPath.style.webkitTransition = "none";
        progressPath.style.strokeDasharray = pathLength + " " + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.webkitTransition =
        "stroke-dashoffset 10ms linear";

        const onScollEvent = function (event) {
            let scroll = window.scrollY;
            let height = document.body.scrollHeight - window.innerHeight;
            let progress = pathLength - (scroll * pathLength) / height;
            progressPath.style.strokeDashoffset = progress;

            let offset = 50;
                if (window.scrollY > offset) {
                progressWrap.classList.add("active-progress");
                } else {
                progressWrap.classList.remove("active-progress");
            }
        };

        onScollEvent();
        window.onscroll = onScollEvent;
        progressWrap.onclick = function (event) {
            window.scroll({ top: 0, behavior: "smooth" });
            return false;
        };
    }

    // Preloader
    const getPreloaderId = document.getElementById('preloader');
    if (getPreloaderId) {
        getPreloaderId.style.display = 'none';
    }

    //Team Slider CSS
    if (document.querySelector(".team-slider-one")) {
        var team_sliderOne = new Swiper(".team-slider-one", {
            loop: true,
            speed: 1500,
            spaceBetween: 25,
            slidesPerView: 1,
            autoHeight: true,
            navigation: {
                nextEl: ".team-next",
                prevEl: ".team-prev",
            },
            breakpoints:{
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                992: { slidesPerView: 3 },
                1200: { slidesPerView: 4 }
            }
        });
    }

    //Product Slider
    if (document.querySelector(".product-slider-one")) {
        var product_sliderOne = new Swiper(".product-slider-one", {
            loop: true,
            speed: 1500,
            spaceBetween: 25,
            navigation: {
                nextEl: ".product-next",
                prevEl: ".product-prev",
            },
            breakpoints:{
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                992: { slidesPerView: 3 },
                1200: { slidesPerView: 4 }
            }
        });
    }

    //Service Slider
    if (document.querySelector(".service-slider-one")) {
        var service_sliderOne = new Swiper(".service-slider-one", {
            loop: true,
            speed: 1500,
            spaceBetween: 25,
            navigation: {
                nextEl: ".service-next",
                prevEl: ".service-prev",
            },
            breakpoints:{
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
        var project_sliderOne = new Swiper(".project-slider-one", {
            loop: true,
            speed: 1500,
            spaceBetween: 8,
            slidesPerView: 1,
            autoHeight: true,
            navigation: {
                nextEl: ".project-next",
                prevEl: ".project-prev",
            },
            breakpoints:{
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1200: { slidesPerView: 3 },
                1400: { slidesPerView: 4 }
            }
        });
    }

    //Testimonial Slider
    if (document.querySelector(".testimonial-slider-one")) {
        var testimonial_sliderOne = new Swiper(".testimonial-slider-one", {
            loop: false,
            speed: 1500,
            spaceBetween: 25,
            slidesPerView: 1,
            autoHeight: true,
            navigation: {
                nextEl: ".testimonial-next",
                prevEl: ".testimonial-prev",
            },
            breakpoints:{
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1200: { slidesPerView: 3 },
                1400: { slidesPerView: 3.1 },
                1600: { slidesPerView: 3.65 }
            }
        });
    }

    if (document.querySelector(".testimonial-slider-two")) {
        var testimonial_sliderTwo = new Swiper(".testimonial-slider-two", {
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
        var testimonial_sliderThree = new Swiper(".testimonial-slider-three", {
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
        var brand_sliderOne = new Swiper(".brand-slider-one", {
            loop: false,
            speed: 15000,
            freemode: false,
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

    // Counter Js
    if ("IntersectionObserver" in window) {
        let counterObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                let counter = entry.target;
                let target = parseInt(counter.innerText);
                let step = target / 200;
                let current = 0;
                let timer = setInterval(function () {
                    current += step;
                    counter.innerText = Math.floor(current);
                    if (parseInt(counter.innerText) >= target) {
                    clearInterval(timer);
                    }
                }, 10);
                counterObserver.unobserve(counter);
                }
            });
        });
        let counters = document.querySelectorAll(".counter");
        counters.forEach(function (counter) {
            counterObserver.observe(counter);
        });
    }

    //Custom Date
    const input = document.getElementById('customDateInput');
    const wrapper = document.getElementById('dateWrapper');

    if (input && wrapper) {
        wrapper.addEventListener('click', () => {
            if (typeof input.showPicker === 'function') {
                input.showPicker();
            } else {
                input.focus();
            }
        });
        function updateEmptyClass() {
            if (!input.value) {
                input.classList.add('empty');
            } else {
                input.classList.remove('empty');
            }
        }
        input.addEventListener('change', updateEmptyClass);
        updateEmptyClass();
    }

    //Gsap Mousemove Animation
    let moveonmouse = gsap.utils.toArray(".moveContent");
    if (moveonmouse.length) {
        function mouseMoveFunc(e) {
            moveonmouse.forEach((circle, index) => {
                const depth = 65;
                const moveX = (e.pageX - window.innerWidth / 2) / depth;
                const moveY = (e.pageY - window.innerHeight / 2) / depth;
                index++;
                gsap.to(circle, {
                    x: moveX * index,
                    y: moveY * index,
                });
            });
        }
        document.addEventListener("mousemove", mouseMoveFunc);
    }

    //Title Animation With SplitText
    let splitTitleLines = gsap.utils.toArray(".title-anim");
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
    if (typeof CustomEase !== 'undefined') {
        gsap.registerPlugin(CustomEase);

        const textRevealElements = document.querySelectorAll(".reveal-text");
        textRevealElements.forEach((element) => {
            if (element.dataset.processed) return;
            element.dataset.processed = true;

            element.innerHTML = element.textContent.replace(
                /([-A-Za-z0-9!$#%^&*@()_+|~=`{}\[\]:";'<>?,.\/]+)/g,
                '<div class="word">$1</div>'
            );

            let words = element.querySelectorAll(".word");
            words.forEach((word) => {
                word.innerHTML = word.textContent.replace(
                    /[-A-Za-z0-9!$#%^&*@()_+|~=`{}\[\]:";'<>?,.\/]/g,
                    "<div class='perspective'><div class='letter'><div>$&</div></div></div>"
                );
            });

            const letters = element.querySelectorAll(".letter");
            let tl = gsap.timeline({
                scrollTrigger: element.classList.contains("reveal-loop") ? false : {
                    trigger: element,
                    toggleActions: "restart none none reset"
                },
                repeat: element.classList.contains("reveal-loop") ? -1 : 0,
                repeatDelay: element.classList.contains("reveal-loop") ? 2 : 0
            });
            tl.set(element, { autoAlpha: 1 });
            tl.fromTo(
                letters,
                { transformOrigin: "center", rotationY: 90, x: 30 },
                { duration: 1.2, rotationY: 0.1, x: 0, stagger: 0.025, ease: CustomEase.create("custom", "M0,0 C0.425,0.005 0,1 1,1") }
            );
        });
    }

    //Gsap Image Tilt Effect
    const tiltImages = document.querySelectorAll(".tilt-img");
    tiltImages.forEach((img) => {
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

    // Lenis + ScrollTrigger setup moved to SmoothScrollProvider (React / npm lenis).
    // main.js no longer owns smooth scroll; it only registers the GSAP plugin
    // so SplitText / CustomEase animations below continue to work.
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
    var plusMinusWidgets = document.querySelectorAll(".v-counter");
    for (var i = 0; i < plusMinusWidgets.length; i++) {
        var minusBtn = plusMinusWidgets[i].querySelector(".minusBtn");
        var plusBtn = plusMinusWidgets[i].querySelector(".plusBtn");
        if (minusBtn) minusBtn.addEventListener("click", clickHandler);
        if (plusBtn) plusBtn.addEventListener("click", clickHandler);
    }

    function clickHandler(event) {
        var countEl = event.target.parentNode.querySelector(".count");
        if (event.target.className.match(/\bminusBtn\b/)) {
            countEl.value = Math.max(0, Number(countEl.value) - 1);
        } else if (event.target.className.match(/\bplusBtn\b/)) {
            countEl.value = Number(countEl.value) + 1;
        }
        if ('createEvent' in document) {
            var e = document.createEvent('HTMLEvents');
            e.initEvent("change", false, true);
            countEl.dispatchEvent(e);
        }
    }

    // Scrollcue
    scrollCue.init();

    //Price Range Slider
    const minPriceSlider = document.getElementById('minPrice');
    const maxPriceSlider = document.getElementById('maxPrice');
    const minPriceDisplay = document.getElementById('minPriceDisplay');
    const maxPriceDisplay = document.getElementById('maxPriceDisplay');
    const rangeProgress = document.querySelector('.range-progress');

    if (minPriceSlider && maxPriceSlider && minPriceDisplay && maxPriceDisplay && rangeProgress) {
        function updatePriceDisplay() {
            minPriceDisplay.textContent = `$${minPriceSlider.value}`;
            maxPriceDisplay.textContent = `$${maxPriceSlider.value}`;
        }
        function updateRangeProgress() {
            const minVal = parseInt(minPriceSlider.value);
            const maxVal = parseInt(maxPriceSlider.value);
            const minRange = parseInt(minPriceSlider.min);
            const maxRange = parseInt(minPriceSlider.max);
            const leftPercent = ((minVal - minRange) / (maxRange - minRange)) * 100;
            const rightPercent = ((maxVal - minRange) / (maxRange - minRange)) * 100;
            rangeProgress.style.left = leftPercent + '%';
            rangeProgress.style.right = (100 - rightPercent) + '%';
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
    var cursor = document.querySelector('.cursor');
    var cursorinner = document.querySelector('.cursor-inner');

    if (cursor && cursorinner) {
        document.addEventListener('mousemove', function(e){
            cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
        });
        document.addEventListener('mousemove', function(e){
            cursorinner.style.left = e.clientX + 'px';
            cursorinner.style.top = e.clientY + 'px';
        });
        document.addEventListener('mousedown', function(){
            cursor.classList.add('click');
            cursorinner.classList.add('cursorinnerhover');
        });
        document.addEventListener('mouseup', function(){
            cursor.classList.remove('click');
            cursorinner.classList.remove('cursorinnerhover');
        });
        var links = document.querySelectorAll('a');
        links.forEach(item => {
            item.addEventListener('mouseover', () => { cursor.classList.add('hover'); });
            item.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); });
        });
    }

    //Theme Toggle
    try {
        function setTheme(themeName) {
            localStorage.setItem('aixio_theme', themeName);
            document.documentElement.className = themeName;
        }
        window.toggleTheme = function() {
            if (localStorage.getItem('aixio_theme') === 'theme-dark') {
                setTheme('theme-light');
            } else {
                setTheme('theme-dark');
            }
        };
        (function () {
            var sliderBtn = document.querySelector('.slider-btn');
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
    window.check = function() {
        var checkBox = document.getElementById("togBtn");
        if (!checkBox) return;
        var text1 = document.getElementsByClassName("text2");
        var text2 = document.getElementsByClassName("text1");
        for (var i = 0; i < text1.length; i++) {
            if (checkBox.checked == true) {
                text1[i].style.display = "block";
                text2[i].style.display = "none";
            } else {
                text1[i].style.display = "none";
                text2[i].style.display = "block";
            }
        }
    };
    window.check();
};
