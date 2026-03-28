/*
Program name: script.js
Author: Myles Carpenter
Date created: 03/20/2026
Date last edited: 03/27/2026
Version: 2.0
Description: External JavaScript for form review and validation.
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

function validatePasswords() {
    var userId = document.getElementById("userId").value.toLowerCase();
    var firstName = document.getElementById("firstName").value.toLowerCase();
    var lastName = document.getElementById("lastName").value.toLowerCase();
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var passwordLower = password.toLowerCase();

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return false;
    }

    if (passwordLower === userId) {
        alert("Password cannot equal your user ID.");
        return false;
    }

    if (userId !== "" && passwordLower.includes(userId)) {
        alert("Password cannot contain your user ID.");
        return false;
    }

    if (firstName !== "" && passwordLower.includes(firstName)) {
        alert("Password cannot contain your first name.");
        return false;
    }

    if (lastName !== "" && passwordLower.includes(lastName)) {
        alert("Password cannot contain your last name.");
        return false;
    }

    return true;
}

function reviewForm() {
    var form = document.getElementById("patientForm");

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    if (!validatePasswords()) {
        return;
    }

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
    var zip = document.getElementById("zip").value.substring(0, 10);
    var userId = document.getElementById("userId").value;
    var gender = getSelectedValue("gender");
    var vaccinated = getSelectedValue("vaccinated");
    var insurance = getSelectedValue("insurance");
    var healthRating = document.getElementById("healthRating").value;
    var symptoms = document.getElementById("symptoms").value;
    var history = getCheckedHistory();
    var password = document.getElementById("password").value;

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
        + "<p><strong>Symptoms:</strong> " + symptoms + "</p>"
        + "<p><strong>Password:</strong> " + password + "</p>";

    document.getElementById("reviewContent").innerHTML = reviewHTML;
}

function validateForm() {
    var form = document.getElementById("patientForm");

    if (!form.checkValidity()) {
        form.reportValidity();
        return false;
    }

    if (!validatePasswords()) {
        return false;
    }

    return true;
}

function clearReview() {
    document.getElementById("reviewContent").innerHTML = "No information reviewed yet.";
}
