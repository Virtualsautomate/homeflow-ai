const WEB_APP_URL =
    "https://script.google.com/macros/s/AKfycby4DfzVMQ_rir_4wj7DsSs2Idm9I_qUo3yarQtK4j54NvTP00DUhWL5Sh20MgptUzztfw/exec";

const demoButton = document.querySelector("#demoButton");
const demoForm = document.querySelector("#demoForm");
const submitDemo = document.querySelector("#submitDemo");
const successMessage = document.querySelector("#successMessage");

demoButton.addEventListener("click", () => {
    demoForm.classList.remove("hidden");
    demoButton.classList.add("hidden");
    successMessage.classList.add("hidden");
});

demoForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = {
        name: document.querySelector("#name").value.trim(),
        email: document.querySelector("#email").value.trim(),
        phone: document.querySelector("#phone").value.trim(),
        business: document.querySelector("#business").value.trim()
    };

    if (!data.name || !data.email) {
        alert("Please enter your name and email.");
        return;
    }

    submitDemo.disabled = true;
    submitDemo.textContent = "Submitting...";

    try {
        await fetch(WEB_APP_URL, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify(data)
        });

        demoForm.reset();
        demoForm.classList.add("hidden");
        successMessage.classList.remove("hidden");
        demoButton.classList.remove("hidden");
    } catch (error) {
        console.error(error);
        alert("The request could not be submitted. Please try again.");
    } finally {
        submitDemo.disabled = false;
        submitDemo.textContent = "Schedule Demo";
    }
});