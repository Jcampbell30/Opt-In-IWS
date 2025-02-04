document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("optInForm");
    const phoneNumberInput = document.getElementById("phoneNumber");
    const checkbox = document.getElementById("checkbox");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const phoneNumber = phoneNumberInput.value.trim();
        const phoneRegex = /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/; // US phone validation
        
        if (!phoneRegex.test(phoneNumber)) {
            showError("Please enter a valid phone number.");
            return;
        }
        if(phoneRegex.test(phoneNumber)){
            showSuccess("Thank you! You will receive a text message shortly.");
        }

        if (!checkbox.checked) {
            showError("You must agree to receive SMS notifications.");
            return;
        }

        // If validation passes, show confetti
        showConfetti();
        form.reset();
    });

    function showError(message) {
        if(document.querySelector(".form-success")){
            document.querySelector(".form-success").remove();
        }
        let errorDiv = document.querySelector(".form-error");
        if (!errorDiv) {
            errorDiv = document.createElement("p");
            errorDiv.className = "text-danger form-error text-center";
            form.prepend(errorDiv);
        }
        errorDiv.textContent = message;
    }
    function showSuccess(message) {
        if(document.querySelector(".form-error")){
            document.querySelector(".form-error").remove();
        }
        let successDiv = document.querySelector(".form-success");
        if (!successDiv) {
            successDiv = document.createElement("p");
            successDiv.className = "text-success form-success text-center";
            form.prepend(successDiv);
        }
        successDiv.textContent = message;
    }

    function showConfetti() {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const colors = ["#bb0000", "#ffffff"];

        (function frame() {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return;

            const confettiElement = document.createElement("div");
            confettiElement.style.position = "fixed";
            confettiElement.style.left = Math.random() * 100 + "vw";
            confettiElement.style.top = "-10px";
            confettiElement.style.width = "10px";
            confettiElement.style.height = "10px";
            confettiElement.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confettiElement.style.opacity = "0.7";
            confettiElement.style.transition = "top 3s linear, opacity 3s";
            document.body.appendChild(confettiElement);

            setTimeout(() => {
                confettiElement.style.top = "100vh";
                confettiElement.style.opacity = "0";
                setTimeout(() => confettiElement.remove(), 3000);
            }, 100);

            requestAnimationFrame(frame);
        })();
    }
});
