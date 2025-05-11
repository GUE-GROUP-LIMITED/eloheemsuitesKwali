const carousels = {};

async function init() {
    // Load rooms.json
    const response = await fetch('rooms.json');
    const rooms = await response.json();

    // Populate rooms section
    const roomsContainer = document.getElementById('rooms-container');
    rooms.forEach(room => {
        if (['ROYAL', 'QUEENS_KINGS', 'EXECUTIVE_LUXURY'].includes(room.type)) {
            roomsContainer.innerHTML += `
                <div class="bg-white p-6 rounded-lg shadow-lg relative" id="${room.id}">
                    <div class="carousel room-carousel" data-carousel-id="${room.id.split('-')[0]}">
                        <div class="carousel-inner h-64 overflow-hidden relative">
                            ${room.images.map(img => `
                                <img src="${img}" alt="${room.name} Image" 
                                     class="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 opacity-0" 
                                     onerror="this.src='https://via.placeholder.com/400x300?text=Image+Not+Found'; console.error('Failed to load image: ${img}');">
                            `).join('')}
                        </div>
                        <button class="carousel-btn prev accessible-focus bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 absolute top-1/2 left-2 transform -translate-y-1/2 z-10" onclick="changeSlide('${room.id.split('-')[0]}', -1)">❮</button>
                        <button class="carousel-btn next accessible-focus bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 absolute top-1/2 right-2 transform -translate-y-1/2 z-10" onclick="changeSlide('${room.id.split('-')[0]}', 1)">❯</button>
                    </div>
                    <h3 class="text-xl font-semibold mt-4">${room.name}</h3>
                    <p class="mt-2">${room.description}</p>
                    <button class="mt-4 bg-green-700 text-white p-2 rounded hover:bg-green-800 accessible-focus" onclick="showBookingForm('${room.id}', '${room.type}', ${room.price}, '${room.name}')">Book Now</button>
                </div>
            `;
        }
    });

    // Populate amenities section
    const amenitiesContainer = document.getElementById('amenities-container');
    rooms.forEach(room => {
        if (['GOLDEN_HALL', 'RECEPTION_GROUND'].includes(room.type)) {
            amenitiesContainer.innerHTML += `
                <div class="bg-white p-6 rounded-lg shadow-lg relative" id="${room.id}">
                    <div class="carousel amenity-carousel" data-carousel-id="${room.id.split('-')[0]}">
                        <div class="carousel-inner h-64 overflow-hidden relative">
                            ${room.images.map(img => `
                                <img src="${img}" alt="${room.name} Image" 
                                     class="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 opacity-0" 
                                     onerror="this.src='https://via.placeholder.com/400x300?text=Image+Not+Found'; console.error('Failed to load image: ${img}');">
                            `).join('')}
                        </div>
                        <button class="carousel-btn prev accessible-focus" onclick="changeSlide('${room.id.split('-')[0]}', -1)">❮</button>
                        <button class="carousel-btn next accessible-focus" onclick="changeSlide('${room.id.split('-')[0]}', 1)">❯</button>
                    </div>
                    <h3 class="text-xl font-semibold mt-4">${room.name}</h3>
                    <p class="mt-2">${room.description}</p>
                    <button class="mt-4 bg-green-700 text-white p-2 rounded hover:bg-green-800 accessible-focus" onclick="showBookingForm('${room.id}', '${room.type}', ${room.price}, '${room.name}')">Book Now</button>
                </div>
            `;
        }
    });

    // Initialize carousels
    ['hero', 'royal', 'queens-kings', 'executive-luxury', 'golden-hall', 'reception-ground'].forEach(initCarousel);

    // Attach event listener to the single booking form
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmit);
    }
}

function initCarousel(carouselId) {
    const carouselElement = document.querySelector(`.carousel[data-carousel-id="${carouselId}"]`);
    if (carouselElement) {
        carousels[carouselId] = {
            images: carouselElement.querySelectorAll('img'),
            currentIndex: 0,
            intervalId: null
        };
        if (carousels[carouselId].images.length > 0) {
            // Set the first image to active
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
            }
        } else {
            console.warn(`No images found for carousel: ${carouselId}`);
        }
    } else {
        console.warn(`Carousel element not found for ID: ${carouselId}`);
    }
}

function changeSlide(carouselId, direction) {
    const carousel = carousels[carouselId];
    if (carousel && carousel.images.length > 0) {
        carousel.images[carousel.currentIndex].classList.remove('active');
        carousel.currentIndex = (carousel.currentIndex + direction + carousel.images.length) % carousel.images.length;
        carousel.images[carousel.currentIndex].classList.add('active');
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

let currentBooking = null;

function showBookingForm(id, roomType, basePrice, name) {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
        bookingSection.classList.remove('hidden');
        bookingSection.classList.add('fixed', 'inset-0', 'bg-black', 'bg-opacity-50', 'flex', 'items-center', 'justify-center', 'z-50');
        bookingSection.setAttribute('aria-hidden', 'false');
        document.getElementById('booking-title').textContent = `Book Your ${name}`;
        document.getElementById('booking-type').textContent = roomType;
        document.getElementById('booking-roomType').value = roomType;
        document.getElementById('amount').value = 0;
        document.getElementById('reference').value = `txref_${id}_${Date.now()}`;
        document.getElementById('metadata').value = `{"custom_fields":[{"display_name":"Room Type","variable_name":"room_type","value":"${roomType}"}]}`;
        currentBooking = { id, basePrice, name, roomType };

        const checkInInput = document.getElementById('checkIn');
        const checkOutInput = document.getElementById('checkOut');
        const daysElement = document.getElementById('booking-days');
        const totalPriceElement = document.getElementById('totalPrice');
        const amountInput = document.getElementById('amount');

        // Reset form fields
        checkInInput.value = '';
        checkOutInput.value = '';
        daysElement.textContent = '0';
        totalPriceElement.textContent = '₦0';
        amountInput.value = 0;

        const updateTotalPrice = () => {
            const checkInDate = new Date(checkInInput.value);
            const checkOutDate = new Date(checkOutInput.value);
            if (checkInDate && checkOutDate && checkOutDate > checkInDate && !isNaN(checkInDate) && !isNaN(checkOutDate)) {
                const diffTime = Math.abs(checkOutDate - checkInDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                daysElement.textContent = diffDays;
                const totalPrice = basePrice * diffDays;
                totalPriceElement.textContent = `₦${totalPrice.toLocaleString()}`;
                amountInput.value = totalPrice * 100; // Convert to kobo
            } else {
                daysElement.textContent = '0';
                totalPriceElement.textContent = '₦0';
                amountInput.value = 0;
            }
        };

        checkInInput.addEventListener('change', updateTotalPrice);
        checkOutInput.addEventListener('change', updateTotalPrice);

        if (!document.getElementById('close-modal')) {
            const closeBtn = document.createElement('button');
            closeBtn.id = 'close-modal';
            closeBtn.className = 'absolute top-4 right-4 text-white bg-gray-500 hover:bg-gray-600 p-2 rounded accessible-focus';
            closeBtn.innerHTML = '×';
            closeBtn.addEventListener('click', hideBookingForm);
            bookingSection.appendChild(closeBtn);
        }
    }
}

function handleBookingSubmit(e) {
    e.preventDefault();
    const emailInput = document.getElementById('email');
    const fullNameInput = document.getElementById('fullName');
    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');
    const amountInput = document.getElementById('amount');
    const daysElement = document.getElementById('booking-days');

    const email = emailInput.value;
    const fullName = fullNameInput.value.trim();
    const amount = parseInt(amountInput.value);
    const days = parseInt(daysElement.textContent);

    if (!fullName) {
        alert('Please enter your full name.');
        return;
    }
    if (!email) {
        alert('Please enter a valid email address.');
        return;
    }
    if (amount <= 0 || days <= 0) {
        alert('Please select valid check-in and check-out dates.');
        return;
    }

    if (window.PaystackPop) {
        const paystack = new PaystackPop();
        paystack.newTransaction({
            key: 'pk_test_ae4308057c9ff208f4ee6e029a8beab9f05b082d',
            email: email,
            amount: amount,
            currency: 'NGN',
            ref: document.getElementById('reference').value,
            metadata: {
                room_type: currentBooking.roomType,
                check_in: checkInInput.value,
                check_out: checkOutInput.value,
                full_name: fullName,
                days: days
            },
            callback: function(response) {
                const confirmationMessage = `
                    Payment Successful!
                    Transaction Reference: ${response.reference}
                    Room/Amenity Type: ${currentBooking.roomType}
                    Check-in: ${checkInInput.value}
                    Check-out: ${checkOutInput.value}
                    Number of Days: ${days}
                    Amount: ₦${(amount / 100).toLocaleString()}
                    Thank you for your booking! You can continue exploring our site.
                `;
                alert(confirmationMessage);
                const transactionDetails = {
                    reference: response.reference,
                    roomType: currentBooking.roomType,
                    checkIn: checkInInput.value,
                    checkOut: checkOutInput.value,
                    days: days,
                    amount: amount / 100,
                    email: email,
                    fullName: fullName,
                    status: 'success'
                };
                localStorage.setItem('lastTransaction', JSON.stringify(transactionDetails));
                hideBookingForm();
            },
            onClose: function() {
                alert('Transaction was not completed, payment window closed.');
            }
        }).openIframe();
    } else {
        alert('Paystack payment system is not available. Please try again later.');
    }
}

function hideBookingForm() {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
        bookingSection.classList.add('hidden');
        bookingSection.classList.remove('fixed', 'inset-0', 'bg-black', 'bg-opacity-50', 'flex', 'items-center', 'justify-center', 'z-50');
        bookingSection.setAttribute('aria-hidden', 'true');
        currentBooking = null;
        document.getElementById('checkIn').value = '';
        document.getElementById('checkOut').value = '';
        document.getElementById('fullName').value = '';
        document.getElementById('email').value = '';
        document.getElementById('booking-days').textContent = '0';
        document.getElementById('totalPrice').textContent = '₦0';
        document.getElementById('amount').value = 0;
        document.getElementById('booking-title').textContent = '';
        document.getElementById('booking-type').textContent = '';
        const closeBtn = document.getElementById('close-modal');
        if (closeBtn) closeBtn.remove();
    }
}

document.getElementById('language-switcher').addEventListener('change', function(e) {
    const lang = e.target.value;
    alert(`Language switched to ${lang}. (Translation functionality to be implemented)`);
});

if (typeof PaystackPop === 'undefined') {
    alert('Paystack payment system is not available. Please check your internet connection and try again.');
}

document.addEventListener('DOMContentLoaded', init);