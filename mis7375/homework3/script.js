/*
Program name: script.js
Author: Myles Carpenter
Date created: 03/20/2026
Date last edited: 04/17/2026
Version: 3.0
Description: External JavaScript for on the fly form validation.
*/

function showDate() {
    var today = new Date();
    document.getElementById("today").innerHTML = today.toDateString();
}

function setDateLimits() {
    var dobField = document.getElementById("dob");
    var today = new Date();
    var maxDate = today.toISOString().split("T")[0];

    var minDateObj = new Date();
    minDateObj.setFullYear(today.getFullYear() - 120);
    var minDate = minDateObj.toISOString().split("T")[0];

    dobField.max = maxDate;
    dobField.min = minDate;
}

function updateHealthValue() {
    var slider = document.getElementById("healthRating");
    document.getElementById("healthValue").innerHTML = slider.value;
}

function forceLowercaseUserId() {
    var userIdField = document.getElementById("userId");
    userIdField.value = userIdField.value.toLowerCase();
}

function showError(id, message) {
    document.getElementById(id).innerHTML = message;
}

function clearError(id) {
    document.getElementById(id).innerHTML = "";
}

function validateFirstName() {
    var value = document.getElementById("firstName").value;
    var regex = /^[A-Za-z'-]{1,30}$/;

    if (!regex.test(value)) {
        showError("nameError", "First name must be 1 to 30 characters using letters, apostrophes, or dashes only.");
        return false;
    }
    clearError("nameError");
    return true;
}

function validateMiddleInitial() {
    var value = document.getElementById("middleInitial").value;
    var regex = /^[A-Za-z]?$/;

    if (!regex.test(value)) {
        showError("nameError", "Middle initial must be one letter or blank.");
        return false;
    }
    if (document.getElementById("nameError").innerHTML.includes("Middle")) {
        clearError("nameError");
    }
    return true;
}

function validateLastName() {
    var value = document.getElementById("lastName").value;
    var regex = /^[A-Za-z'-]{1,30}$/;

    if (!regex.test(value)) {
        showError("nameError", "Last name must be 1 to 30 characters using letters, apostrophes, or dashes only.");
        return false;
    }
    clearError("nameError");
    return true;
}

function validateDob() {
    var dob = document.getElementById("dob").value;
    if (dob === "") {
        showError("dobError", "Date of birth is required.");
        return false;
    }

    var selectedDate = new Date(dob);
    var today = new Date();
    var minDate = new Date();
    minDate.setFullYear(today.getFullYear() - 120);

    if (selectedDate > today || selectedDate < minDate) {
        showError("dobError", "Date of birth cannot be in the future or more than 120 years ago.");
        return false;
    }

    clearError("dobError");
    return true;
}

function validateSsn() {
    var value = document.getElementById("ssn").value;
    var digitsOnly = value.replace(/\D/g, "");

    if (!/^\d{9}$/.test(digitsOnly)) {
        showError("ssnError", "Social Security / ID must contain exactly 9 digits.");
        return false;
    }

    clearError("ssnError");
    return true;
}

function validateEmail() {
    var field = document.getElementById("email");
    field.value = field.value.toLowerCase();
    var value = field.value;
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(value)) {
        showError("emailError", "Email must be in the format name@domain.tld.");
        return false;
    }

    clearError("emailError");
    return true;
}

function validatePhone() {
    var value = document.getElementById("phone").value;
    var regex = /^\d{3}-\d{3}-\d{4}$/;

    if (!regex.test(value)) {
        showError("phoneError", "Phone must be in the format 000-000-0000.");
        return false;
    }

    clearError("phoneError");
    return true;
}

function validateAddress1() {
    var value = document.getElementById("addr1").value.trim();

    if (value.length < 2 || value.length > 30) {
        showError("addressError", "Address Line 1 must be 2 to 30 characters.");
        return false;
    }

    clearError("addressError");
    return true;
}

function validateAddress2() {
    var value = document.getElementById("addr2").value.trim();

    if (value !== "" && (value.length < 2 || value.length > 30)) {
        showError("addressError", "Address Line 2 must be 2 to 30 characters if entered.");
        return false;
    }

    if (document.getElementById("addressError").innerHTML.includes("Address Line 2")) {
        clearError("addressError");
    }
    return true;
}

function validateCity() {
    var value = document.getElementById("city").value.trim();

    if (value.length < 2 || value.length > 30) {
        showError("cityStateZipError", "City must be 2 to 30 characters.");
        return false;
    }

    clearError("cityStateZipError");
    return true;
}

function validateState() {
    var value = document.getElementById("state").value;

    if (value === "") {
        showError("cityStateZipError", "Please select a state.");
        return false;
    }

    clearError("cityStateZipError");
    return true;
}

function validateZip() {
    var value = document.getElementById("zip").value;
    var regex = /^\d{5}$/;

    if (!regex.test(value)) {
        showError("cityStateZipError", "Zip code must be exactly 5 digits.");
        return false;
    }

    clearError("cityStateZipError");
    return true;
}

function validateUserId() {
    var value = document.getElementById("userId").value;
    var regex = /^[A-Za-z][A-Za-z0-9_-]{4,19}$/;

    if (!regex.test(value)) {
        showError("userIdError", "User ID must be 5 to 20 characters, start with a letter, and contain only letters, numbers, underscores, or dashes.");
        return false;
    }

    clearError("userIdError");
    return true;
}

function validatePassword() {
    var userId = document.getElementById("userId").value.toLowerCase();
    var firstName = document.getElementById("firstName").value.toLowerCase();
    var lastName = document.getElementById("lastName").value.toLowerCase();
    var password = document.getElementById("password").value;
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,30}$/;
    var lowerPassword = password.toLowerCase();

    if (!regex.test(password)) {
        showError("passwordError", "Password must be 8 to 30 characters and include an uppercase letter, lowercase letter, and number.");
        return false;
    }

    if (lowerPassword === userId) {
        showError("passwordError", "Password cannot equal your user ID.");
        return false;
    }

    if (userId !== "" && lowerPassword.includes(userId)) {
        showError("passwordError", "Password cannot contain your user ID.");
        return false;
    }

    if (firstName !== "" && lowerPassword.includes(firstName)) {
        showError("passwordError", "Password cannot contain your first name.");
        return false;
    }

    if (lastName !== "" && lowerPassword.includes(lastName)) {
        showError("passwordError", "Password cannot contain your last name.");
        return false;
    }

    clearError("passwordError");
    return true;
}

function validateConfirmPassword() {
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        showError("passwordError", "Passwords do not match.");
        return false;
    }

    clearError("passwordError");
    return true;
}

function validateGender() {
    var selected = document.querySelector('input[name="gender"]:checked');
    if (!selected) {
        showError("genderError", "Please select a gender.");
        return false;
    }
    clearError("genderError");
    return true;
}

function validateVaccinated() {
    var selected = document.querySelector('input[name="vaccinated"]:checked');
    if (!selected) {
        showError("vaccinatedError", "Please select a vaccinated option.");
        return false;
    }
    clearError("vaccinatedError");
    return true;
}

function validateInsurance() {
    var selected = document.querySelector('input[name="insurance"]:checked');
    if (!selected) {
        showError("insuranceError", "Please select an insurance option.");
        return false;
    }
    clearError("insuranceError");
    return true;
}

function validateHealthRating() {
    return true;
}

function validateSymptoms() {
    var value = document.getElementById("symptoms").value;
    if (value.includes('"')) {
        showError("symptomsError", 'Please do not use double quotes in the symptoms field.');
        return false;
    }
    clearError("symptomsError");
    return true;
}

function getSelectedValue(name) {
    var selected = document.querySelector('input[name="' + name + '"]:checked');
    return selected ? selected.value : "";
}

function getCheckedHistory() {
    var checkedBoxes = document.querySelectorAll('input[name="history"]:checked');
    var selectedHistory = [];

    checkedBoxes.forEach(function(box) {
        selectedHistory.push(box.value);
    });

    if (selectedHistory.length === 0) {
        return "None selected";
    }

    return selectedHistory.join(", ");
}

function validateAllFields() {
    var valid = true;

    if (!validateFirstName()) valid = false;
    if (!validateMiddleInitial()) valid = false;
    if (!validateLastName()) valid = false;
    if (!validateDob()) valid = false;
    if (!validateSsn()) valid = false;
    if (!validateEmail()) valid = false;
    if (!validatePhone()) valid = false;
    if (!validateAddress1()) valid = false;
    if (!validateAddress2()) valid = false;
    if (!validateCity()) valid = false;
    if (!validateState()) valid = false;
    if (!validateZip()) valid = false;
    if (!validateUserId()) valid = false;
    if (!validatePassword()) valid = false;
    if (!validateConfirmPassword()) valid = false;
    if (!validateGender()) valid = false;
    if (!validateVaccinated()) valid = false;
    if (!validateInsurance()) valid = false;
    if (!validateSymptoms()) valid = false;

    if (valid) {
        document.getElementById("submitButton").style.display = "inline-block";
        reviewForm();
    } else {
        document.getElementById("submitButton").style.display = "none";
        document.getElementById("reviewContent").innerHTML = "Please correct the errors above before submitting.";
    }

    return valid;
}

function reviewForm() {
    var firstName = document.getElementById("firstName").value;
    var middleInitial = document.getElementById("middleInitial").value;
    var lastName = document.getElementById("lastName").value;
    var dob = document.getElementById("dob").value;
    var ssn = document.getElementById("ssn").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var addr1 = document.getElementById("addr1").value;
    var addr2 = document.getElementById("addr2").value;
    var city = document.getElementById("city").value;
    var state = document.getElementById("state").value;
    var zip = document.getElementById("zip").value;
    var userId = document.getElementById("userId").value;
    var gender = getSelectedValue("gender");
    var vaccinated = getSelectedValue("vaccinated");
    var insurance = getSelectedValue("insurance");
    var healthRating = document.getElementById("healthRating").value;
    var symptoms = document.getElementById("symptoms").value;
    var history = getCheckedHistory();

    var reviewHTML = ""
        + "<p><strong>Name:</strong> " + firstName + " " + middleInitial + " " + lastName + "</p>"
        + "<p><strong>Date of Birth:</strong> " + dob + "</p>"
        + "<p><strong>Social Security / ID:</strong> " + ssn + "</p>"
        + "<p><strong>Email:</strong> " + email + "</p>"
        + "<p><strong>Phone:</strong> " + phone + "</p>"
        + "<p><strong>Address:</strong> " + addr1 + "<br>" + addr2 + "<br>" + city + ", " + state + " " + zip + "</p>"
        + "<p><strong>User ID:</strong> " + userId + "</p>"
        + "<p><strong>Gender:</strong> " + gender + "</p>"
        + "<p><strong>Vaccinated:</strong> " + vaccinated + "</p>"
        + "<p><strong>Insurance:</strong> " + insurance + "</p>"
        + "<p><strong>Medical History:</strong> " + history + "</p>"
        + "<p><strong>Health Rating:</strong> " + healthRating + "</p>"
        + "<p><strong>Symptoms:</strong> " + symptoms + "</p>";

    document.getElementById("reviewContent").innerHTML = reviewHTML;
}

function hideSubmitButton() {
    document.getElementById("submitButton").style.display = "none";
}

function clearReview() {
    document.getElementById("reviewContent").innerHTML = "Validation messages and reviewed data will appear here.";
}

function clearErrors() {
    var errors = document.querySelectorAll(".error-message");
    errors.forEach(function(error) {
        error.innerHTML = "";
    });
}

function finalSubmitCheck() {
    return validateAllFields();
}
