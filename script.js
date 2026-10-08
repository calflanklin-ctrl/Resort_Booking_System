const form = document.getElementById("bookingForm");

const checkIn = document.getElementById("checkIn");
const checkOut = document.getElementById("checkOut");

const successMessage = document.getElementById("successMessage");


// Get today's date

const today = new Date();

const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");

const todayString = ${year}-${month}-${day};

checkIn.min = todayString;
checkOut.min = todayString;


// Update checkout minimum date

checkIn.addEventListener("change", function () {

    checkOut.min = checkIn.value;

    if (checkOut.value && checkOut.value <= checkIn.value) {
        checkOut.value = "";
    }

});


// Form submission

form.addEventListener("submit", async function(event) {

    event.preventDefault();


    // Clear previous errors

    document.querySelectorAll(".error").forEach(function(error) {
        error.textContent = "";
    });


    let valid = true;


    // Guest information

    const fullName =
        document.getElementById("fullName").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const phone =
        document.getElementById("phone").value.trim();


    // Full name validation

    if (fullName.length < 2) {

        document.getElementById("fullNameError").textContent =
            "Please enter your full name.";

        valid = false;
    }


    // Email validation

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        document.getElementById("emailError").textContent =
            "Please enter a valid email address.";

        valid = false;
    }


    // Philippine phone validation

    const phonePattern =
        /^(09|\+639)\d{9}$/;

    if (!phonePattern.test(phone)) {

        document.getElementById("phoneError").textContent =
            "Please enter a valid phone number.";

        valid = false;
    }


    // Date validation

    if (!checkIn.value) {

        document.getElementById("checkInError").textContent =
            "Please select a check-in date.";

        valid = false;
    }


    if (!checkOut.value) {

        document.getElementById("checkOutError").textContent =
            "Please select a check-out date.";

        valid = false;
    }


    if (
        checkIn.value &&
        checkOut.value &&
        checkOut.value <= checkIn.value
    ) {

        document.getElementById("checkOutError").textContent =
            "Check-out date must be after check-in date.";

        valid = false;
    }


    // Room validation

    const room =
        document.getElementById("room").value;

    if (!room) {

        document.getElementById("roomError").textContent =
            "Please select a room.";

        valid = false;
    }


    // Stop submission if invalid

    if (!valid) {
        return;
    }


    // Prepare booking information

    const bookingData = {
        fullName: fullName,
        email: email,
        phone: phone,
        checkIn: checkIn.value,
        checkOut: checkOut.value,
        room: room,
        adults: document.getElementById("adults").value,
        children: document.getElementById("children").value,
        specialRequests:
            document.getElementById("specialRequests").value
    };


    /*
       AJAX-style asynchronous submission.

       Replace "/api/bookings" with your real
       backend/API endpoint when available.
    */

   try {

    const response = await fetch("book.php", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(bookingData)

    });

    const result = await response.json();

    if (result.success) {

        showSuccess();

    } else {

        alert(result.message);

    }

} catch (error) {

    console.error("Submission error:", error);

    alert("Unable to submit the booking. Please try again.");

}

        });


        /*
           For this front-end demonstration,
           show the success message even when
           no backend endpoint is connected.
        */

        showSuccess();

    } catch (error) {

        console.log(
            "Demo submission:",
            bookingData
        );

        showSuccess();
    }

});


// Show success message

const form = document.getElementById("bookingForm");

const checkIn = document.getElementById("checkIn");
const checkOut = document.getElementById("checkOut");

const successMessage = document.getElementById("successMessage");

// Today's date
const today = new Date();

const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");

const todayString = ${year}-${month}-${day};

// Prevent past dates
checkIn.min = todayString;
checkOut.min = todayString;


// Check-out must be after check-in
checkIn.addEventListener("change", function () {

    checkOut.min = checkIn.value;

    if (checkOut.value && checkOut.value <= checkIn.value) {
        checkOut.value = "";
    }

});


// Form submission
form.addEventListener("submit", function(event) {

    event.preventDefault();

    // Clear previous errors
    document.querySelectorAll(".error").forEach(function(error) {
        error.textContent = "";
    });

    let valid = true;

    // Get values
    const fullName =
        document.getElementById("fullName").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const room =
        document.getElementById("room").value;


    // Full name
    if (fullName.length < 2) {

        document.getElementById("fullNameError").textContent =
            "Please enter your full name.";

        valid = false;
    }


    // Email
    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        document.getElementById("emailError").textContent =
            "Please enter a valid email address.";

        valid = false;
    }


    // Phone
    const phonePattern =
        /^(09|\+639)\d{9}$/;

    if (!phonePattern.test(phone)) {

        document.getElementById("phoneError").textContent =
            "Please enter a valid Philippine phone number.";

        valid = false;
    }


    // Check-in
    if (!checkIn.value) {

        document.getElementById("checkInError").textContent =
            "Please select a check-in date.";

        valid = false;
    }


    // Check-out
    if (!checkOut.value) {

        document.getElementById("checkOutError").textContent =
            "Please select a check-out date.";

        valid = false;
    }


    // Date comparison
    if (
        checkIn.value &&
        checkOut.value &&
        checkOut.value <= checkIn.value
    ) {

        document.getElementById("checkOutError").textContent =
            "Check-out must be after check-in.";

        valid = false;
    }


    // Room
    if (!room) {

        document.getElementById("roomError").textContent =
            "Please select a room.";

        valid = false;
    }


    // Stop if invalid
    if (!valid) {
        return;
    }


    // Show successful booking
    showSuccess();

});


// Success message
function showSuccess() {

    const name =
        document.getElementById("fullName").value;

    const room =
        document.getElementById("room").value;

    const checkInDate =
        document.getElementById("checkIn").value;

    const checkOutDate =
        document.getElementById("checkOut").value;


    successMessage.innerHTML = `
        <h3>Booking Submitted Successfully!</h3>

        <p>
            Thank you, <strong>${name}</strong>.
        </p>

        <div class="booking-summary">

            <p>
                <strong>Room:</strong>
                ${room}
            </p>

            <p>
                <strong>Check-In:</strong>
                ${checkInDate}
            </p>

            <p>
                <strong>Check-Out:</strong>
                ${checkOutDate}
            </p>

        </div>

        <p>
            Your reservation request has been received.
        </p>

        <button onclick="closeSuccess()">
            Make Another Booking
        </button>
    `;


    successMessage.style.display = "block";

    form.style.display = "none";

    successMessage.scrollIntoView({
        behavior: "smooth"
    });

}


// Make another booking
function closeSuccess() {

    successMessage.style.display = "none";

    form.style.display = "block";

    form.reset();

    checkIn.min = todayString;

    checkOut.min = todayString;

    window.location.hash = "booking";

}