/*====================================================
                    PANDA HoReCa
                    horeca.js
====================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*====================================================
                    VARIABLES
    ====================================================*/

    const quoteForm = document.getElementById("quoteForm");
    const formMsg = document.getElementById("formMsg");
    const selCount = document.getElementById("selCount");

    const addButtons = document.querySelectorAll(".hc-add");
    const segmentButtons = document.querySelectorAll(".hc-link");

    const whatsappButton = document.querySelector(
        '[data-channel="whatsapp"]'
    );

    const emailButton = document.querySelector(
        '[data-channel="email"]'
    );


    /*====================================================
                    SELECTED PRODUCTS
    ====================================================*/

    let selectedProducts = [];


    /*====================================================
                    UPDATE PRODUCT COUNTER
    ====================================================*/

    function updateSelectedCount() {

        if (!selCount) return;

        if (selectedProducts.length === 0) {

            selCount.textContent = "(none selected)";

        } else if (selectedProducts.length === 1) {

            selCount.textContent = "(1 product selected)";

        } else {

            selCount.textContent =
                `(${selectedProducts.length} products selected)`;

        }
    }


    /*====================================================
                    SHOW MESSAGE
    ====================================================*/

    function showMessage(message, type = "success") {

        if (!formMsg) return;

        formMsg.hidden = false;
        formMsg.textContent = message;

        formMsg.classList.remove("success", "error");
        formMsg.classList.add(type);

        formMsg.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }


    /*====================================================
                    ADD PRODUCT TO QUOTE
    ====================================================*/

    addButtons.forEach(button => {

        button.addEventListener("click", () => {

            const product = button.dataset.product;

            if (!product) return;


            /* Add product if it isn't already selected */

            if (!selectedProducts.includes(product)) {

                selectedProducts.push(product);

                button.classList.add("selected");

                button.innerHTML =
                    '<i class="fa-solid fa-check"></i> Added';

            }

            /* Remove product if clicked again */

            else {

                selectedProducts =
                    selectedProducts.filter(item => item !== product);

                button.classList.remove("selected");

                button.innerHTML =
                    '<i class="fa-solid fa-plus"></i> Add to quote';
            }


            updateSelectedCount();


            /* Scroll to quote section */

            const quoteSection = document.getElementById("quote");

            if (quoteSection) {

                quoteSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }


            /* Update checkboxes */

            syncCheckboxes();

        });

    });


    /*====================================================
                    CHECKBOXES
    ====================================================*/

    const productCheckboxes =
        document.querySelectorAll(
            '#quoteForm input[type="checkbox"]'
        );


    productCheckboxes.forEach(checkbox => {

        checkbox.addEventListener("change", () => {

            const product = checkbox.value;

            if (checkbox.checked) {

                if (!selectedProducts.includes(product)) {

                    selectedProducts.push(product);

                }

            } else {

                selectedProducts =
                    selectedProducts.filter(item => item !== product);

            }

            updateSelectedCount();

            updateProductButtons();

        });

    });


    /*====================================================
                SYNC CHECKBOXES WITH PRODUCTS
    ====================================================*/

    function syncCheckboxes() {

        productCheckboxes.forEach(checkbox => {

            checkbox.checked =
                selectedProducts.includes(checkbox.value);

        });

    }


    /*====================================================
                UPDATE PRODUCT BUTTONS
    ====================================================*/

    function updateProductButtons() {

        addButtons.forEach(button => {

            const product = button.dataset.product;

            if (!product) return;

            if (selectedProducts.includes(product)) {

                button.classList.add("selected");

                button.innerHTML =
                    '<i class="fa-solid fa-check"></i> Added';

            } else {

                button.classList.remove("selected");

                button.innerHTML =
                    '<i class="fa-solid fa-plus"></i> Add to quote';

            }

        });

    }


    /*====================================================
                BUSINESS TYPE BUTTONS
    ====================================================*/

    segmentButtons.forEach(button => {

        button.addEventListener("click", () => {

            const businessType = button.dataset.type;

            const businessTypeInput =
                document.getElementById("btype");

            if (businessTypeInput && businessType) {

                businessTypeInput.value = businessType;

            }

            const quoteSection =
                document.getElementById("quote");

            if (quoteSection) {

                quoteSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /*====================================================
                    FORM VALIDATION
    ====================================================*/

    function validateForm() {

        if (!quoteForm) return false;

        const business =
            document.getElementById("business");

        const person =
            document.getElementById("person");

        const phone =
            document.getElementById("phone");

        const city =
            document.getElementById("city");


        if (!business || !business.value.trim()) {

            showMessage(
                "Please enter your business name.",
                "error"
            );

            business?.focus();

            return false;
        }


        if (!person || !person.value.trim()) {

            showMessage(
                "Please enter your name.",
                "error"
            );

            person?.focus();

            return false;
        }


        if (!phone || !phone.value.trim()) {

            showMessage(
                "Please enter your phone number.",
                "error"
            );

            phone?.focus();

            return false;
        }


        if (!city || !city.value.trim()) {

            showMessage(
                "Please enter your city.",
                "error"
            );

            city?.focus();

            return false;
        }


        if (selectedProducts.length === 0) {

            showMessage(
                "Please select at least one product.",
                "error"
            );

            return false;
        }


        return true;
    }


    /*====================================================
                GET FORM INFORMATION
    ====================================================*/

    function getFormData() {

        const business =
            document.getElementById("business")?.value.trim() || "";

        const businessType =
            document.getElementById("btype")?.value.trim() || "";

        const person =
            document.getElementById("person")?.value.trim() || "";

        const phone =
            document.getElementById("phone")?.value.trim() || "";

        const city =
            document.getElementById("city")?.value.trim() || "";

        const volume =
            document.getElementById("volume")?.value.trim() || "";

        const notes =
            document.getElementById("notes")?.value.trim() || "";


        return {
            business,
            businessType,
            person,
            phone,
            city,
            volume,
            notes
        };

    }


    /*====================================================
                CREATE QUOTE MESSAGE
    ====================================================*/

    function createQuoteMessage() {

        const data = getFormData();

        let message = "";

        message += "Hello Panda HoReCa Team,%0A%0A";

        message += "I would like to request a quotation.%0A%0A";

        message +=
            "*Business:* " +
            encodeURIComponent(data.business) +
            "%0A";

        message +=
            "*Business Type:* " +
            encodeURIComponent(data.businessType) +
            "%0A";

        message +=
            "*Contact Person:* " +
            encodeURIComponent(data.person) +
            "%0A";

        message +=
            "*Phone:* " +
            encodeURIComponent(data.phone) +
            "%0A";

        message +=
            "*City:* " +
            encodeURIComponent(data.city) +
            "%0A";

        if (data.volume) {

            message +=
                "*Expected Volume:* " +
                encodeURIComponent(data.volume) +
                "%0A";

        }

        message += "%0A";

        message += "*Products:*%0A";

        selectedProducts.forEach(product => {

            message +=
                "- " +
                encodeURIComponent(product) +
                "%0A";

        });


        if (data.notes) {

            message += "%0A";

            message +=
                "*Additional Notes:*%0A" +
                encodeURIComponent(data.notes) +
                "%0A";

        }


        message += "%0AThank you.";

        return message;
    }


    /*====================================================
                    WHATSAPP
    ====================================================*/

    if (whatsappButton) {

        whatsappButton.addEventListener("click", () => {

            if (!validateForm()) return;


            /*
                IMPORTANT:
                Replace this number with the real
                Panda / Arab Dairy WhatsApp number.

                Format:
                Egypt:
                201XXXXXXXXX

                Do NOT use:
                +
                spaces
                brackets
                dashes
            */

            const whatsappNumber =
                "201XXXXXXXXX";


            const message =
                createQuoteMessage();


            const whatsappURL =
                `https://wa.me/${whatsappNumber}?text=${message}`;


            window.open(
                whatsappURL,
                "_blank"
            );

        });

    }


    /*====================================================
                        EMAIL
    ====================================================*/

    if (emailButton) {

        emailButton.addEventListener("click", () => {

            if (!validateForm()) return;


            const data =
                getFormData();


            const email =
                "info@arabdairy.com";


            const subject =
                "Panda HoReCa Quote Request - " +
                data.business;


            let body = "";

            body +=
                "Hello Panda HoReCa Team,\n\n";

            body +=
                "I would like to request a quotation.\n\n";

            body +=
                "Business: " +
                data.business +
                "\n";

            body +=
                "Business Type: " +
                data.businessType +
                "\n";

            body +=
                "Contact Person: " +
                data.person +
                "\n";

            body +=
                "Phone: " +
                data.phone +
                "\n";

            body +=
                "City: " +
                data.city +
                "\n";


            if (data.volume) {

                body +=
                    "Expected Volume: " +
                    data.volume +
                    "\n";

            }


            body += "\nProducts:\n";

            selectedProducts.forEach(product => {

                body +=
                    "- " +
                    product +
                    "\n";

            });


            if (data.notes) {

                body +=
                    "\nAdditional Notes:\n" +
                    data.notes +
                    "\n";

            }


            body +=
                "\nThank you.";


            const mailto =
                `mailto:${email}` +
                `?subject=${encodeURIComponent(subject)}` +
                `&body=${encodeURIComponent(body)}`;


            window.location.href =
                mailto;

        });

    }


    /*====================================================
                    FORM SUBMIT
    ====================================================*/

    if (quoteForm) {

        quoteForm.addEventListener("submit", event => {

            event.preventDefault();

            if (validateForm()) {

                showMessage(
                    "Your quote information is ready. Please choose WhatsApp or Email.",
                    "success"
                );

            }

        });

    }


    /*====================================================
                INITIALIZE
    ====================================================*/

    updateSelectedCount();

    syncCheckboxes();

    updateProductButtons();


    /*====================================================
                    CONSOLE MESSAGE
    ====================================================*/

    console.log(
        "%cPanda HoReCa",
        "color:#008C5A;font-size:20px;font-weight:bold;"
    );

    console.log(
        "HoReCa quote system loaded successfully."
    );

});
