import React, { useEffect } from 'react';

// Simple fade-in animation using Intersection Observer
const useScrollAnimation = () => {
    useEffect(() => {
        const elements = document.querySelectorAll('.scroll-animate');
        const observer = new window.IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.2 }
        );
        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);
};

const App = () => {
    useScrollAnimation();

    // Enable scroll snap for main sections
    const main = document.querySelector('main');
    if (main) {
        main.style.scrollSnapType = 'y mandatory';
        Array.from(main.children).forEach(section => {
            section.style.scrollSnapAlign = 'start';
        });
    }
    // Smooth scroll for nav links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Impact stats counter animation
    function animateCounters() {
        const counters = document.querySelectorAll('.impact-number');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const isPercent = counter.textContent.includes('%');
            let count = 0;
            const duration = 1200;
            const step = Math.ceil(target / (duration / 16));
            function update() {
                if (count < target) {
                    count += step;
                    if (count > target) count = target;
                    counter.textContent = isPercent ? count + '%' : count;
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target;
                }
            }
            update();
        });
    }
    const statsSection = document.getElementById('impact-stats');
    if (statsSection) {
        let statsAnimated = false;
        const observer = new window.IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    animateCounters();
                    statsAnimated = true;
                }
            });
        }, { threshold: 0.3 });
        observer.observe(statsSection);
    }
    document.addEventListener('DOMContentLoaded', function() {
        const darkModeBtn = document.getElementById('darkModeToggle');
        if (darkModeBtn) {
            darkModeBtn.addEventListener('click', function() {
                document.body.classList.toggle('dark-mode');
                this.classList.toggle('active');
                this.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
            });
        }
    });

    return (
        <div>
            <h1 className="scroll-animate">Welcome to the Hackathon!</h1>
            <section className="scroll-animate">
                <p>
                    Scroll down to see stunning animations as content appears!
                </p>
            </section>
            <section className="scroll-animate">
                <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6" alt="Hackathon" style={{ width: '100%', borderRadius: '12px' }} />
            </section>
            <section className="scroll-animate">
                <h2>Join the excitement!</h2>
                <p>
                    Collaborate, innovate, and create amazing projects.
                </p>
            </section>
        </div>
    );
};

export default App;

// Add this CSS to your main stylesheet for the animation effect:
/*
.scroll-animate {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.8s cubic-bezier(.77,0,.18,1), transform 0.8s cubic-bezier(.77,0,.18,1);
}
.scroll-animate.visible {
    opacity: 1;
    transform: translateY(0);
}
*/