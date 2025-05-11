const carousels = {};

function initCarousel(carouselId) {
    const carouselElement = document.querySelector(`.carousel[data-carousel-id="${carouselId}"]`);
    if (carouselElement) {
        carousels[carouselId] = {
            images: carouselElement.querySelectorAll('img'),
            currentIndex: 0,
            intervalId: null
        };
        if (carousels[carouselId].images.length > 0) {
            carousels[carouselId].images[0].classList.add('active');
            startAutoScroll(carouselId);
            const prevBtn = carouselElement.querySelector('.carousel-btn.prev');
            const nextBtn = carouselElement.querySelector('.carousel-btn.next');
            if (prevBtn && nextBtn) {
                prevBtn.addEventListener('click', () => {
                    pauseAutoScroll(carouselId);
                    changeSlide(carouselId, -1);
                    startAutoScroll(carouselId);
                });
                nextBtn.addEventListener('click', () => {
                    pauseAutoScroll(carouselId);
                    changeSlide(carouselId, 1);
                    startAutoScroll(carouselId);
                });
            } else {
                console.warn(`Buttons not found for carousel ${carouselId}`);
            }
        } else {
            console.warn(`No images found for carousel ${carouselId}`);
        }
    } else {
        console.error(`Carousel element not found for ${carouselId}`);
    }
}

function changeSlide(carouselId, direction) {
    const carousel = carousels[carouselId];
    if (carousel && carousel.images.length > 0) {
        carousel.images[carousel.currentIndex].classList.remove('active');
        carousel.currentIndex = (carousel.currentIndex + direction + carousel.images.length) % carousel.images.length;
        carousel.images[carousel.currentIndex].classList.add('active');
    } else {
        console.warn(`Carousel ${carouselId} not initialized or has no images`);
    }
}

function startAutoScroll(carouselId) {
    const carousel = carousels[carouselId];
    if (carousel && !carousel.intervalId) {
        carousel.intervalId = setInterval(() => {
            changeSlide(carouselId, 1);
        }, carouselId === 'hero' ? 5000 : 3000);
    }
}

function pauseAutoScroll(carouselId) {
    const carousel = carousels[carouselId];
    if (carousel && carousel.intervalId) {
        clearInterval(carousel.intervalId);
        carousel.intervalId = null;
    }
}

['hero', 'royal', 'queens-kings', 'executive-luxury', 'golden-hall', 'reception-ground'].forEach(initCarousel);

let currentForm = null;
let currentBasePrice = 0;

function showBookingForm(id, roomType, basePrice) {
    // Hide all booking forms first
    document.querySelectorAll('.booking-form').forEach(form => {
        form.classList.remove('active');
    });

    const form = document.getElementById(`booking-form-${id}`);
    if (form) {
        form.classList.add('active');
        currentForm = form;
        currentBasePrice = basePrice;

        const totalPriceElement = form.querySelector('#totalPrice-' + id.replace(/-/g, '_'));
        const amountInput = form.querySelector('#amount-' + id.replace(/-/g, '_'));
        if (totalPriceElement && amountInput) {
            totalPriceElement.textContent = '₦0';
            amountInput.value = 0;

            const checkInInput = form.querySelector('#checkIn-' + id.replace(/-/g, '_'));
            const checkOutInput = form.querySelector('#checkOut-' + id.replace(/-/g, '_'));

            const updateTotalPrice = () => {
                const checkInDate = new Date(checkInInput.value);
                const checkOutDate = new Date(checkOutInput.value);
                if (checkInDate && checkOutDate && checkOutDate > checkInDate && !isNaN(checkInDate) && !isNaN(checkOutDate)) {
                    const diffTime = Math.abs(checkOutDate - checkInDate);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    const totalPrice = basePrice * diffDays;
                    totalPriceElement.textContent = `₦${totalPrice.toLocaleString()}`;
                    amountInput.value = totalPrice * 100; // Convert to kobo
                } else {
                    totalPriceElement.textContent = '₦0';
                    amountInput.value = 0;
                }
            };

            if (checkInInput && checkOutInput) {
                checkInInput.addEventListener('change', updateTotalPrice);
                checkOutInput.addEventListener('change', updateTotalPrice);
            } else {
                console.error(`Check-in or Check-out input not found for ${id}`);
            }

            const paymentForm = form.querySelector('.payment-form');
            if (paymentForm) {
                paymentForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const email = form.querySelector('#email-' + id.replace(/-/g, '_')).value;
                    const amount = parseInt(amountInput.value);
                    if (amount <= 0) {
                        alert('Please select valid check-in and check-out dates.');
                        return;
                    }
                    if (window.PaystackPop) {
                        const transactionRef = `txref_${id}_${Date.now()}`; // Generate unique reference
                        let handler = PaystackPop.setup({
                            key: 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxx', // Replace with your Paystack Test Public Key
                            email: email,
                            amount: amount, // Already in kobo
                            currency: 'NGN',
                            ref: transactionRef,
                            metadata: {
                                room_type: roomType,
                                check_in: checkInInput.value,
                                check_out: checkOutInput.value
                            },
                            callback: function(response) {
                                alert(`Payment successful! Transaction Reference: ${response.reference}\nPlease save this reference for your records.`);
                                // Optionally store the transaction reference in localStorage for static site tracking
                                localStorage.setItem('lastTransactionRef', response.reference);
                                hideBookingForm(id);
                            },
                            onClose: function() {
                                alert('Transaction was not completed, payment window closed.');
                            }
                        });
                        handler.openIframe();
                    } else {
                        console.error('PaystackPop is not loaded');
                    }
                });
            } else {
                console.error(`Payment form not found for ${id}`);
            }
        } else {
            console.error(`Total price or amount input not found for ${id}`);
        }
    } else {
        console.error(`Booking form not found for ${id}`);
    }
}

function hideBookingForm(id) {
    const form = document.getElementById(`booking-form-${id}`);
    if (form) {
        form.classList.remove('active');
        currentForm = null;
        currentBasePrice = 0;
    } else {
        console.error(`Form with ID booking-form-${id} not found`);
    }
}

document.getElementById('language-switcher').addEventListener('change', function(e) {
    const lang = e.target.value;
    alert(`Language switched to ${lang}. (Translation functionality to be implemented)`);
});

if (typeof PaystackPop === 'undefined') {
    console.error('Paystack script failed to load. Check your internet connection or script URL.');
}