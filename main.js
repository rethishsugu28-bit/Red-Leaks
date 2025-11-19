// Red Leaks - Complete Platform JavaScript File

// Global variables
let currentDate = new Date();
let selectedProduct = 'pads';
let selectedFlow = 'medium';
let selectedBrand = 'always';
let p5Instance = null;
let testimonialSplide = null;
let stripe = null;
let elements = null;
let cardElement = null;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeTypedText();
    initializeCalendar();
    initializeProductSelector();
    initializeScrollAnimations();
    initializeCounters();
    initializeP5Background();
    initializeTestimonialCarousel();
    initializePaymentSystem();
    initializeAuthSystem();
    initializeHealthChart();
});

// Initialize scroll-triggered animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation for grid items
                if (entry.target.classList.contains('card-hover')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    entry.target.style.transitionDelay = delay + 'ms';
                }
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Initialize typed text animation
function initializeTypedText() {
    if (document.getElementById('typed-text')) {
        new Typed('#typed-text', {
            strings: [
                'Never Worry About Your Period Again',
                'Smart Period Care Delivered',
                'Your Personal Period Assistant',
                'Predict. Deliver. Empower.'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
}

// Initialize main animations
function initializeAnimations() {
    // Animate navigation on scroll
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });

    // Add hover effects to cards with 3D tilt
    document.querySelectorAll('.card-hover').forEach(card => {
        card.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.02,
                rotateX: 5,
                rotateY: 5,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });

        card.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                rotateX: 0,
                rotateY: 0,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });

    // Add glow effect to buttons
    document.querySelectorAll('.glow-effect').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 30px rgba(255, 107, 107, 0.4)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 0 20px rgba(255, 107, 107, 0.3)';
        });
    });
}

// Initialize calendar functionality with enhanced features
function initializeCalendar() {
    const currentMonthElement = document.getElementById('current-month');
    const calendarGrid = document.getElementById('calendar-grid');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');

    if (!currentMonthElement || !calendarGrid) return;

    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        // Update month display
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                           'July', 'August', 'September', 'October', 'November', 'December'];
        currentMonthElement.textContent = `${monthNames[month]} ${year}`;
        
        // Clear previous calendar
        calendarGrid.innerHTML = '';
        
        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        // Add empty cells for days before month starts
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'p-2';
            calendarGrid.appendChild(emptyDay);
        }
        
        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day p-2 text-center rounded-lg text-sm font-medium';
            dayElement.textContent = day;
            
            // Add special classes for demo purposes
            if (month === 2 && (day === 12 || day === 13 || day === 14)) {
                dayElement.classList.add('period');
            }
            if (month === 2 && day === 10) {
                dayElement.classList.add('delivery');
            }
            if (month === 2 && (day === 8 || day === 9)) {
                dayElement.style.background = '#FFC107';
                dayElement.style.color = 'white';
            }
            
            // Add click handler
            dayElement.addEventListener('click', function() {
                showDayDetails(year, month, day);
            });
            
            calendarGrid.appendChild(dayElement);
        }
    }

    function showDayDetails(year, month, day) {
        const date = new Date(year, month, day);
        const today = new Date();
        const isPeriodDay = (month === 2 && (day === 12 || day === 13 || day === 14));
        const isDeliveryDay = (month === 2 && day === 10);
        const isFertileDay = (month === 2 && (day === 8 || day === 9));
        
        let message = `📅 March ${day}, ${year}\n\n`;
        
        if (isPeriodDay) {
            message += `🔴 Predicted Period Day\n✨ Flow: Medium\n🕐 Duration: 3-5 days\n💡 Recommendation: Heavy flow products`;
        } else if (isDeliveryDay) {
            message += `📦 Delivery Scheduled\n📍 CVS Pharmacy (0.8 mi)\n⏰ Arriving by 3:00 PM\n📦 Products: Always Ultra Thin, 32 count`;
        } else if (isFertileDay) {
            message += `🌟 Fertile Window\n📊 Probability: High\n💡 Tip: Track symptoms for better predictions`;
        } else if (date > today) {
            message += `📊 Cycle Day Info\n🎯 Prediction confidence: 95%\n💡 No special events scheduled\n🔄 Next update: Tomorrow`;
        } else {
            message += `📊 Historical Data\n✅ Period completed\n📈 Flow: Light-Medium\n💪 Energy level: Normal`;
        }
        
        // Show modal instead of alert
        showModal('Cycle Day Details', message);
    }

    // Navigation handlers
    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        });
    }

    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        });
    }

    // Initial render
    renderCalendar();
}

// Initialize enhanced product selector
function initializeProductSelector() {
    const productCards = document.querySelectorAll('.product-card');
    const flowButtons = document.querySelectorAll('.flow-btn');
    const brandSelect = document.getElementById('brand-select');
    const monthlyCostElement = document.getElementById('monthly-cost');
    const subscriptionCostElement = document.getElementById('subscription-cost');

    // Product selection
    productCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove selection from all cards
            productCards.forEach(c => c.classList.remove('selected'));
            // Add selection to clicked card
            this.classList.add('selected');
            
            selectedProduct = this.dataset.product;
            updatePricing();
            
            // Animate selection
            anime({
                targets: this,
                scale: [1, 1.05, 1],
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });

    // Flow selection
    flowButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove selection from all buttons
            flowButtons.forEach(b => {
                b.classList.remove('bg-coral-rose', 'text-white');
                b.classList.add('border-gray-300');
            });
            // Add selection to clicked button
            this.classList.add('bg-coral-rose', 'text-white');
            this.classList.remove('border-gray-300');
            
            selectedFlow = this.dataset.flow;
            updatePricing();
        });
    });

    // Brand selection
    if (brandSelect) {
        brandSelect.addEventListener('change', function() {
            selectedBrand = this.value;
            updatePricing();
        });
    }

    function updatePricing() {
        let basePrice = 12.99;
        
        // Product type adjustment
        if (selectedProduct === 'tampons') {
            basePrice += 2.00;
        }
        
        // Brand adjustment
        switch (selectedBrand) {
            case 'kotex':
                basePrice -= 1.00;
                break;
            case 'playtex':
                basePrice += 1.00;
                break;
            case 'organic':
                basePrice += 3.00;
                break;
        }
        
        // Flow adjustment
        switch (selectedFlow) {
            case 'light':
                basePrice -= 2.00;
                break;
            case 'heavy':
                basePrice += 3.00;
                break;
        }
        
        const subscriptionPrice = basePrice * 0.8; // 20% discount
        
        if (monthlyCostElement) {
            monthlyCostElement.textContent = `$${basePrice.toFixed(2)}`;
        }
        
        if (subscriptionCostElement) {
            subscriptionCostElement.textContent = `$${subscriptionPrice.toFixed(2)}`;
        }
        
        // Animate the price change
        if (monthlyCostElement) {
            anime({
                targets: monthlyCostElement,
                scale: [1, 1.2, 1],
                color: ['#FF6B6B', '#C44569', '#FF6B6B'],
                duration: 400,
                easing: 'easeOutQuad'
            });
        }
    }
}

// Initialize counter animations with enhanced effects
function initializeCounters() {
    const usersCounter = document.getElementById('users-count');
    const deliveriesCounter = document.getElementById('deliveries-count');
    const satisfactionCounter = document.getElementById('satisfaction-rate');

    function animateCounter(element, target, suffix = '') {
        if (!element) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Start counter animation
                    anime({
                        targets: { count: 0 },
                        count: target,
                        duration: 2500,
                        easing: 'easeOutQuad',
                        update: function(anim) {
                            element.textContent = Math.floor(anim.animatables[0].target.count).toLocaleString() + suffix;
                        }
                    });
                    
                    // Add pulse animation when complete
                    setTimeout(() => {
                        element.classList.add('pulse-animation');
                    }, 2500);
                    
                    observer.unobserve(element);
                }
            });
        });
        
        observer.observe(element);
    }

    animateCounter(usersCounter, 15420);
    animateCounter(deliveriesCounter, 89340);
    animateCounter(satisfactionCounter, 98, '%');
}

// Initialize P5.js background animation with enhanced particles
function initializeP5Background() {
    if (document.getElementById('p5-canvas-container')) {
        p5Instance = new p5(function(p) {
            let particles = [];
            let numParticles = 80;
            let connections = [];

            p.setup = function() {
                const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
                canvas.parent('p5-canvas-container');
                canvas.id('p5-canvas');
                
                // Create particles
                for (let i = 0; i < numParticles; i++) {
                    particles.push({
                        x: p.random(p.width),
                        y: p.random(p.height),
                        size: p.random(2, 6),
                        speedX: p.random(-0.3, 0.3),
                        speedY: p.random(-0.3, 0.3),
                        opacity: p.random(0.1, 0.4),
                        color: p.random(['#FF6B6B', '#C44569', '#95C7A3', '#FFC107'])
                    });
                }
            };

            p.draw = function() {
                p.clear();
                
                // Update and draw particles
                particles.forEach(particle => {
                    // Update position
                    particle.x += particle.speedX;
                    particle.y += particle.speedY;
                    
                    // Wrap around edges
                    if (particle.x < 0) particle.x = p.width;
                    if (particle.x > p.width) particle.x = 0;
                    if (particle.y < 0) particle.y = p.height;
                    if (particle.y > p.height) particle.y = 0;
                    
                    // Draw particle
                    p.fill(particle.color + Math.floor(particle.opacity * 255).toString(16));
                    p.noStroke();
                    p.ellipse(particle.x, particle.y, particle.size);
                });
                
                // Draw connections between nearby particles
                for (let i = 0; i < particles.length; i++) {
                    for (let j = i + 1; j < particles.length; j++) {
                        const dist = p.dist(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
                        if (dist < 120) {
                            p.stroke(255, 107, 107, (1 - dist / 120) * 30);
                            p.strokeWeight(1);
                            p.line(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
                        }
                    }
                }
            };

            p.windowResized = function() {
                p.resizeCanvas(p.windowWidth, p.windowHeight);
            };
        });
    }
}

// Initialize testimonial carousel
function initializeTestimonialCarousel() {
    if (document.getElementById('testimonial-splide')) {
        testimonialSplide = new Splide('#testimonial-splide', {
            type: 'loop',
            perPage: 1,
            perMove: 1,
            autoplay: true,
            interval: 5000,
            pauseOnHover: true,
            arrows: false,
            pagination: true,
            gap: '2rem',
            breakpoints: {
                768: {
                    perPage: 1,
                }
            }
        });
        
        testimonialSplide.mount();
    }
}

// Initialize payment system with Stripe
function initializePaymentSystem() {
    // Initialize Stripe
    if (typeof Stripe !== 'undefined') {
        stripe = Stripe('pk_test_your_stripe_publishable_key_here'); // Replace with actual key
        elements = stripe.elements();
        
        // Create card element
        const style = {
            base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                    color: '#aab7c4',
                },
            },
            invalid: {
                color: '#9e2146',
            },
        };
        
        // Create individual card elements
        const cardNumberElement = elements.create('cardNumber', { style });
        const cardExpiryElement = elements.create('cardExpiry', { style });
        const cardCvcElement = elements.create('cardCvc', { style });
        
        // Mount elements
        const cardNumberEl = document.getElementById('card-number-element');
        const cardExpiryEl = document.getElementById('card-expiry-element');
        const cardCvcEl = document.getElementById('card-cvc-element');
        
        if (cardNumberEl) cardNumberElement.mount('#card-number-element');
        if (cardExpiryEl) cardExpiryElement.mount('#card-expiry-element');
        if (cardCvcEl) cardCvcElement.mount('#card-cvc-element');
        
        // Handle payment form submission
        const paymentForm = document.getElementById('payment-form');
        if (paymentForm) {
            paymentForm.addEventListener('submit', handlePaymentSubmission);
        }
        
        // Handle payment method selection
        document.querySelectorAll('.payment-method').forEach(method => {
            method.addEventListener('click', function() {
                document.querySelectorAll('.payment-method').forEach(m => {
                    m.classList.remove('border-coral-rose');
                    m.querySelector('.text-coral-rose').style.display = 'none';
                });
                this.classList.add('border-coral-rose');
                this.querySelector('.text-coral-rose').style.display = 'block';
            });
        });
    }
}

// Handle payment submission
async function handlePaymentSubmission(event) {
    event.preventDefault();
    
    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Processing...';
    submitButton.disabled = true;
    
    try {
        // Create payment method
        const { paymentMethod, error } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });
        
        if (error) {
            throw error;
        }
        
        // Simulate payment processing
        setTimeout(() => {
            showNotification('Payment successful! Welcome to Red Leaks Premium.', 'success');
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            // Close any open modals
            document.querySelectorAll('.modal').forEach(modal => {
                modal.classList.add('hidden');
            });
        }, 2000);
        
    } catch (error) {
        showNotification('Payment failed. Please try again.', 'error');
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
}

// Initialize authentication system
function initializeAuthSystem() {
    const loginBtn = document.getElementById('login-btn');
    const loginModal = document.getElementById('login-modal');
    const signupModal = document.getElementById('signup-modal');
    const closeLogin = document.getElementById('close-login');
    const closeSignup = document.getElementById('close-signup');
    const showSignup = document.getElementById('show-signup');
    const showLogin = document.getElementById('show-login');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    // Modal controls
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            loginModal.classList.remove('hidden');
        });
    }
    
    if (closeLogin) {
        closeLogin.addEventListener('click', () => {
            loginModal.classList.add('hidden');
        });
    }
    
    if (closeSignup) {
        closeSignup.addEventListener('click', () => {
            signupModal.classList.add('hidden');
        });
    }
    
    if (showSignup) {
        showSignup.addEventListener('click', () => {
            loginModal.classList.add('hidden');
            signupModal.classList.remove('hidden');
        });
    }
    
    if (showLogin) {
        showLogin.addEventListener('click', () => {
            signupModal.classList.add('hidden');
            loginModal.classList.remove('hidden');
        });
    }
    
    // Form submissions
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
}

// Handle login
function handleLogin(event) {
    event.preventDefault();
    
    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Signing in...';
    submitButton.disabled = true;
    
    // Simulate login process
    setTimeout(() => {
        showNotification('Login successful! Welcome back to Red Leaks.', 'success');
        document.getElementById('login-modal').classList.add('hidden');
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Update UI to show logged in state
        updateLoginState(true);
    }, 1500);
}

// Handle signup
function handleSignup(event) {
    event.preventDefault();
    
    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Creating account...';
    submitButton.disabled = true;
    
    // Simulate signup process
    setTimeout(() => {
        showNotification('Account created successfully! Welcome to Red Leaks.', 'success');
        document.getElementById('signup-modal').classList.add('hidden');
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Update UI to show logged in state
        updateLoginState(true);
    }, 1500);
}

// Update login state in UI
function updateLoginState(isLoggedIn) {
    const loginBtn = document.getElementById('login-btn');
    const getStartedBtn = document.querySelector('.btn-primary');
    
    if (isLoggedIn) {
        if (loginBtn) {
            loginBtn.textContent = 'Dashboard';
            loginBtn.removeEventListener('click', () => {});
            loginBtn.addEventListener('click', () => {
                showNotification('Redirecting to dashboard...', 'info');
            });
        }
        
        if (getStartedBtn) {
            getStartedBtn.textContent = 'Go to Dashboard';
        }
    }
}

// Initialize health chart
function initializeHealthChart() {
    const chartElement = document.getElementById('health-chart');
    if (!chartElement) return;
    
    const chart = echarts.init(chartElement);
    
    const option = {
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisLine: { show: false },
            axisTick: { show: false }
        },
        yAxis: {
            type: 'value',
            show: false
        },
        series: [{
            data: [85, 92, 78, 88, 95, 82, 89],
            type: 'line',
            smooth: true,
            lineStyle: {
                color: '#FF6B6B',
                width: 3
            },
            itemStyle: {
                color: '#FF6B6B'
            },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: 'rgba(255, 107, 107, 0.3)'
                    }, {
                        offset: 1, color: 'rgba(255, 107, 107, 0.05)'
                    }]
                }
            }
        }]
    };
    
    chart.setOption(option);
    
    // Make chart responsive
    window.addEventListener('resize', function() {
        chart.resize();
    });
}

// Enhanced notification system
function showNotification(message, type = 'info', duration = 3000) {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification fixed top-20 right-4 p-4 rounded-lg shadow-lg z-50 max-w-sm ${
        type === 'success' ? 'bg-green-500 text-white' :
        type === 'error' ? 'bg-red-500 text-white' :
        type === 'warning' ? 'bg-yellow-500 text-black' :
        'bg-blue-500 text-white'
    }`;
    
    notification.innerHTML = `
        <div class="flex items-center justify-between">
            <span class="flex-1">${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-lg">×</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    anime({
        targets: notification,
        translateX: [300, 0],
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutQuad'
    });
    
    // Auto remove after duration
    setTimeout(() => {
        if (notification.parentNode) {
            anime({
                targets: notification,
                translateX: 300,
                opacity: 0,
                duration: 300,
                easing: 'easeInQuad',
                complete: () => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }
            });
        }
    }, duration);
}

// Modal system
function showModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="modal-content bg-white p-8 rounded-3xl max-w-md mx-4 shadow-2xl">
            <h3 class="text-xl font-bold mb-4 text-coral-rose">${title}</h3>
            <pre class="text-gray-700 mb-6 whitespace-pre-line font-sans">${content}</pre>
            <button onclick="this.parentElement.parentElement.remove()" 
                    class="btn-primary text-white px-6 py-2 rounded-full w-full">
                Close
            </button>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Handle form submissions and button clicks with enhanced interactions
document.addEventListener('click', function(e) {
    // Start trial button
    if (e.target.id === 'start-trial-btn' || e.target.id === 'complete-signup-btn') {
        e.preventDefault();
        document.getElementById('signup-modal').classList.remove('hidden');
    }
    
    // Watch demo button
    if (e.target.id === 'watch-demo-btn') {
        e.preventDefault();
        showModal('Red Leaks Demo', 'Experience the complete Red Leaks platform:\n\n🎯 AI-powered cycle prediction\n📦 Smart product delivery\n💳 Secure payment integration\n📊 Comprehensive health insights\n👥 Community support features\n\nFull demo coming soon! Try our interactive features above.');
    }
    
    // Mobile menu toggle
    if (e.target.id === 'mobile-menu-btn' || e.target.closest('#mobile-menu-btn')) {
        e.preventDefault();
        showNotification('Mobile menu - Coming soon!', 'info');
    }
});

// Smooth scrolling for navigation links with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed nav
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add loading animation for page transitions
window.addEventListener('beforeunload', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
});

// Cleanup P5.js instance on page unload
window.addEventListener('unload', function() {
    if (p5Instance) {
        p5Instance.remove();
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any open modals
        document.querySelectorAll('.modal, .notification').forEach(el => {
            if (el.classList.contains('modal')) {
                el.classList.add('hidden');
            } else {
                el.remove();
            }
        });
    }
});

// Add performance optimization: lazy load images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if needed
document.addEventListener('DOMContentLoaded', initializeLazyLoading);