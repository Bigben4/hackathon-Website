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