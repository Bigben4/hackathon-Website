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
    var darkModeBtn = document.getElementById('darkModeToggle');
    if (darkModeBtn) {
        darkModeBtn.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            this.classList.toggle('active');
            this.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
        });
    }
    // Language toggle
    var langBtn = document.getElementById('langToggle');
    var lang = 'en';
    var translations = {
        en: {
            navFeatures: 'Features',
            navImpact: 'Impact',
            navContact: 'Contact',
            navDownload: 'Download',
            heroTitle: 'Your Future, Mapped Intelligently',
            heroDesc: 'At Smart Orient, our mission is to empower students with AI-driven tools that create personalized study plans, manage academic life, and build smart financial habits—preparing them not just for exams, but for life after school.',
            ctaButton: 'Get Started',
            contactBtn: 'Contact',
            impactTitle: 'Why Smart Orient Matters',
            impactDesc: 'In today’s fast-paced academic world, students often struggle to balance learning, budgeting, and personal growth. Smart Orient is designed to solve this by offering a centralized roadmap tailored to each student’s goals.<br /><br />From AI-generated assignments and optimized study plans to budget tracking and reminders, Smart Orient doesn’t just help students succeed academically—it builds habits that prepare them for real life.<br /><br />Schools benefit too, as students become more focused, financially aware, and career-oriented—creating a smarter, more self-reliant learning environment.',
            impactStatsTitle: 'Our Impact So Far',
            impactLabels: ['Students Helped', 'Study Plan Completion', 'AI Assignments', 'Schools Impacted'],
            testimonialsTitle: 'What Students Say',
            testimonials: [
                '“SmartRoadmap helped me organize my semester and stay on top of assignments. The reminders are a lifesaver!”',
                '“I love the budgeting feature! I finally know where my money goes each month.”',
                '“The career roadmap gave me clarity on what courses to pick for my dream job.”'
            ],
            benefits: [
                {
                    title: 'Personalized Study Plans',
                    desc: 'Smart Orient creates custom study schedules tailored to your unique academic goals, helping you stay organized and motivated.'
                },
                {
                    title: 'AI-Powered Assignments',
                    desc: 'Our AI helps you brainstorm, organize, and track assignments, making your workload easier to manage and more efficient.'
                },
                {
                    title: 'Budget & Expense Tracking',
                    desc: 'Monitor your spending and savings with intuitive tools, so you can focus on your studies without financial stress.'
                },
                {
                    title: 'Career-Oriented Roadmaps',
                    desc: 'Plan your academic journey with career-focused guidance, ensuring you make the right choices for your future.'
                }
            ],
            pricingTitle: 'Affordable Plans for Every Student',
            pricingDesc: 'We believe every student deserves access to tools that can shape their future. Our pricing is designed for students in Cameroon to stay on track without breaking the bank.',
            planNames: ['Free Plan', 'Monthly Plan', 'Yearly Plan'],
            planBtns: 'Choose Plan',
            contactTitle: 'Contact Us',
            contactDesc: 'Have questions or want to get in touch? Fill out the form below and our team will respond soon.',
            sendMsg: 'Send Message',
            finalCta: 'Get Started',
            footerLinks: ['Contact', 'Privacy', 'Terms']
        },
        fr: {
            navFeatures: 'Fonctionnalités',
            navImpact: 'Impact',
            navContact: 'Contact',
            navDownload: 'Télécharger',
            heroTitle: 'Votre avenir, cartographié intelligemment',
            heroDesc: "Chez Smart Orient, notre mission est d'aider les étudiants avec des outils IA qui créent des plans d'étude personnalisés, gèrent la vie académique et développent de bonnes habitudes financières—pour réussir aux examens et dans la vie.",
            ctaButton: 'Commencer',
            contactBtn: 'Contact',
            impactTitle: "Pourquoi Smart Orient est important",
            impactDesc: "Dans le monde académique d'aujourd'hui, les étudiants ont du mal à équilibrer apprentissage, budget et développement personnel. Smart Orient résout cela en offrant une feuille de route centralisée adaptée à chaque étudiant.<br /><br />Des devoirs générés par IA et des plans d'étude optimisés au suivi du budget et aux rappels, Smart Orient aide à réussir académiquement et à préparer la vraie vie.<br /><br />Les écoles en bénéficient aussi, car les étudiants deviennent plus concentrés, autonomes et orientés carrière—créant un environnement d'apprentissage plus intelligent.",
            impactStatsTitle: 'Notre impact jusqu’ici',
            impactLabels: ['Étudiants aidés', 'Plans d’étude complétés', 'Devoirs IA', 'Écoles impactées'],
            testimonialsTitle: 'Ce que disent les étudiants',
            testimonials: [
                '« SmartRoadmap m’a aidé à organiser mon semestre et à gérer mes devoirs. Les rappels sont indispensables ! »',
                '« J’adore la fonction budget ! Je sais enfin où va mon argent chaque mois. »',
                '« La feuille de route carrière m’a aidé à choisir les bons cours pour mon métier de rêve. »'
            ],
            benefits: [
                {
                    title: 'Plans d’étude personnalisés',
                    desc: 'Smart Orient crée des plannings adaptés à vos objectifs académiques, pour rester organisé et motivé.'
                },
                {
                    title: 'Devoirs assistés par IA',
                    desc: 'Notre IA vous aide à organiser et suivre vos devoirs, pour un travail plus efficace.'
                },
                {
                    title: 'Suivi du budget et des dépenses',
                    desc: 'Surveillez vos dépenses et économies avec des outils intuitifs, pour étudier sans stress financier.'
                },
                {
                    title: 'Feuilles de route carrière',
                    desc: 'Planifiez votre parcours académique avec des conseils orientés métier, pour faire les bons choix.'
                }
            ],
            pricingTitle: 'Des plans abordables pour chaque étudiant',
            pricingDesc: 'Nous pensons que chaque étudiant mérite des outils pour façonner son avenir. Nos tarifs sont conçus pour les étudiants du Cameroun.',
            planNames: ['Gratuit', 'Mensuel', 'Annuel'],
            planBtns: 'Choisir',
            contactTitle: 'Nous contacter',
            contactDesc: 'Des questions ou envie de nous joindre ? Remplissez le formulaire et notre équipe vous répondra vite.',
            sendMsg: 'Envoyer',
            finalCta: 'Commencer',
            footerLinks: ['Contact', 'Confidentialité', 'Conditions']
        }
    };
    function setLanguage(lang) {
        document.getElementById('nav-features').textContent = translations[lang].navFeatures;
        document.getElementById('nav-impact').textContent = translations[lang].navImpact;
        document.getElementById('nav-contact').textContent = translations[lang].navContact;
        document.getElementById('nav-download').textContent = translations[lang].navDownload;
        var heroTitle = document.querySelector('.hero-text h2');
        if (heroTitle) heroTitle.textContent = translations[lang].heroTitle;
        var heroDesc = document.querySelector('.hero-text p');
        if (heroDesc) heroDesc.textContent = translations[lang].heroDesc;
        var ctaBtn = document.querySelector('.cta-button');
        if (ctaBtn) ctaBtn.textContent = translations[lang].ctaButton;
        var contactBtn = document.querySelector('.contact-btn');
        if (contactBtn) contactBtn.textContent = translations[lang].contactBtn;
        // Impact section
        var impactTitle = document.querySelector('.impact-section h3');
        if (impactTitle) impactTitle.textContent = translations[lang].impactTitle;
        var impactDesc = document.querySelector('.impact-section p');
        if (impactDesc) impactDesc.innerHTML = translations[lang].impactDesc;
        // Impact stats
        var statsTitle = document.querySelector('.impact-stats-section h2');
        if (statsTitle) statsTitle.textContent = translations[lang].impactStatsTitle;
        var statLabels = document.querySelectorAll('.impact-label');
        translations[lang].impactLabels.forEach(function(label, i) {
            if (statLabels[i]) statLabels[i].textContent = label;
        });
        // Testimonials
        var testimonialsTitle = document.querySelector('.testimonials-title');
        if (testimonialsTitle) testimonialsTitle.textContent = translations[lang].testimonialsTitle;
        var testimonialQuotes = document.querySelectorAll('.testimonial-quote');
        translations[lang].testimonials.forEach(function(quote, i) {
            if (testimonialQuotes[i]) testimonialQuotes[i].textContent = quote;
        });
        // Benefits
        var benefitTitles = document.querySelectorAll('.benefit-desc h4');
        var benefitDescs = document.querySelectorAll('.benefit-desc p');
        translations[lang].benefits.forEach(function(benefit, i) {
            if (benefitTitles[i]) benefitTitles[i].textContent = benefit.title;
            if (benefitDescs[i]) benefitDescs[i].textContent = benefit.desc;
        });
        // Pricing
        var pricingTitle = document.querySelector('.pricing-header h2');
        if (pricingTitle) pricingTitle.textContent = translations[lang].pricingTitle;
        var pricingDesc = document.querySelector('.pricing-header p');
        if (pricingDesc) pricingDesc.textContent = translations[lang].pricingDesc;
        var planNames = document.querySelectorAll('.plan-card h3');
        translations[lang].planNames.forEach(function(name, i) {
            if (planNames[i]) planNames[i].textContent = name;
        });
        var planBtns = document.querySelectorAll('.plan-btn');
        planBtns.forEach(function(btn) { btn.textContent = translations[lang].planBtns; });
        // Contact section
        var contactTitle = document.querySelector('.contact-section h3');
        if (contactTitle) contactTitle.textContent = translations[lang].contactTitle;
        var contactDesc = document.querySelector('.contact-section p');
        if (contactDesc) contactDesc.textContent = translations[lang].contactDesc;
        var sendMsgBtn = document.querySelector('.contact-form button');
        if (sendMsgBtn) sendMsgBtn.textContent = translations[lang].sendMsg;
        // Final CTA
        var finalCtaBtn = document.querySelector('.final-cta-section .hero-btn');
        if (finalCtaBtn) finalCtaBtn.textContent = translations[lang].finalCta;
        // Footer links
        var footerLinks = document.querySelectorAll('.footer-links a');
        translations[lang].footerLinks.forEach(function(link, i) {
            if (footerLinks[i]) footerLinks[i].textContent = link;
        });
    }
    if (langBtn) {
        langBtn.addEventListener('click', function() {
            lang = lang === 'en' ? 'fr' : 'en';
            setLanguage(lang);
            this.textContent = lang === 'en' ? 'FR' : 'EN';
        });
    }
    setLanguage(lang);
});

// Mobile nav dropdown
var navToggle = document.getElementById('navToggle');
var navMenu = document.getElementById('navMenu');
if (navToggle && navMenu) {
    navToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        navMenu.classList.toggle('open');
    });
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && e.target !== navToggle) {
            navMenu.classList.remove('open');
        }
    });
}


