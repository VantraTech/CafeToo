// Optimized Menu Functionality
class CafeTooMenu {
    constructor() {
        this.isReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        this.isMobile = window.innerWidth <= 768;
        this.init();
    }

    init() {
        // Only add heavy animations on desktop with motion enabled
        if (!this.isMobile && !this.isReducedMotion) {
            this.createMinimalCoffeeBeans();
        }

        this.addScrollAnimations();
        this.addOptimizedHoverEffects();
        this.addKeyboardNavigation();
        this.addPrintFunctionality();
        this.handleResize();
    }

    // Minimal coffee beans - much fewer elements
    createMinimalCoffeeBeans() {
        const coffeeBeansContainer = document.querySelector(".coffee-beans");
        const beanCount = 3; // Reduced from 15 to 3

        for (let i = 0; i < beanCount; i++) {
            const bean = document.createElement("div");
            bean.className = "coffee-bean";
            bean.style.cssText = `
          position: absolute;
          width: 4px;
          height: 6px;
          background: #F4A460;
          border-radius: 50%;
          top: ${20 + i * 30}%;
          left: ${10 + i * 40}%;
          opacity: 0.05;
          animation: slowFloat ${20 + i * 5}s ease-in-out infinite;
          animation-delay: ${i * 3}s;
          will-change: transform;
        `;
            coffeeBeansContainer.appendChild(bean);
        }
    }

    // Optimized scroll animations using Intersection Observer
    addScrollAnimations() {
        if (this.isReducedMotion) return;

        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -30px 0px",
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate-in");
                    // Unobserve after animation to improve performance
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Only observe sections, not individual items
        document.querySelectorAll(".menu-section").forEach((section) => {
            observer.observe(section);
        });
    }

    // Simplified hover effects
    addOptimizedHoverEffects() {
        // Use event delegation for better performance
        const menuGrid = document.querySelector(".menu-grid");

        menuGrid.addEventListener(
            "mouseenter",
            (e) => {
                if (e.target.classList.contains("menu-item")) {
                    const icon = e.target.querySelector(".item-icon");
                    if (icon) {
                        icon.style.transform = "scale(1.1)";
                    }
                }
            },
            true
        );

        menuGrid.addEventListener(
            "mouseleave",
            (e) => {
                if (e.target.classList.contains("menu-item")) {
                    const icon = e.target.querySelector(".item-icon");
                    if (icon) {
                        icon.style.transform = "";
                    }
                }
            },
            true
        );
    }

    // Simplified keyboard navigation
    addKeyboardNavigation() {
        document.addEventListener("keydown", (e) => {
            if (e.key === "Tab") {
                const focusableElements =
                    document.querySelectorAll(".menu-item");
                focusableElements.forEach((el) => {
                    el.setAttribute("tabindex", "0");
                });
            }
        });
    }

    // Optimized print functionality
    addPrintFunctionality() {
        const printButton = document.createElement("button");
        printButton.innerHTML = "🖨️ Print";
        printButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #8B4513;
        color: white;
        border: none;
        padding: 10px 16px;
        border-radius: 20px;
        cursor: pointer;
        font-size: 14px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        transition: background-color 0.2s ease;
        z-index: 1000;
      `;

        printButton.addEventListener("mouseenter", () => {
            printButton.style.background = "#A0522D";
        });

        printButton.addEventListener("mouseleave", () => {
            printButton.style.background = "#8B4513";
        });

        printButton.addEventListener("click", () => {
            window.print();
        });

        document.body.appendChild(printButton);
    }

    // Handle window resize
    handleResize() {
        let resizeTimer;
        window.addEventListener("resize", () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.isMobile = window.innerWidth <= 768;
                // Disable animations on mobile after resize
                if (this.isMobile) {
                    document
                        .querySelectorAll(".coffee-bean")
                        .forEach((bean) => {
                            bean.style.animation = "none";
                        });
                }
            }, 250);
        });
    }
}

// Simplified utility functions
const utils = {
    showLoading() {
        const loader = document.createElement("div");
        loader.className = "loader";
        loader.innerHTML = "☕ Loading...";
        loader.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(139, 69, 19, 0.9);
        color: #F4E4BC;
        padding: 15px 30px;
        border-radius: 8px;
        font-size: 16px;
        z-index: 9999;
      `;
        document.body.appendChild(loader);

        setTimeout(() => {
            loader.remove();
        }, 800); // Reduced loading time
    },
};

// Optimized initialization
document.addEventListener("DOMContentLoaded", () => {
    // Skip loading animation on slow devices
    const isSlowDevice =
        navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;

    if (!isSlowDevice) {
        utils.showLoading();
    }

    setTimeout(
        () => {
            new CafeTooMenu();
        },
        isSlowDevice ? 0 : 500
    );
});

// Add minimal CSS for animate-in class
const style = document.createElement("style");
style.textContent = `
    .animate-in {
      animation: fadeInUp 0.4s ease-out forwards;
    }
  `;
document.head.appendChild(style);
