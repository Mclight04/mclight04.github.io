/*
Program name: script.js
Author: Myles Carpenter
Date created: 03/27/2026
Date last edited: 03/27/2026
Version: 2.0
Description: External JavaScript for patient registration form review and validation.
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

function getCheckedHistory() {
    var checked = [];
    var historyBoxes = document.querySelectorAll('input[name="history"]:checked');

    historyBoxes.forEach(function(box) {
        checked.push(box.value);
    });

    if (checked.length === 0) {
        return "None selected";
    }

    return checked.join(", ");
}

function getSelectedValue(name) {
    var selected = document.querySelector('input[name="' + name + '"]:checked');
    return selected ? selected.value : "";
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
        alert("Password cannot equal your User ID.");
        return false;
    }

    if (userId !== "" && passwordLower.includes(userId)) {
        alert("Password cannot contain your User ID.");
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
    var idNumber = document.getElementById("idNumber").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var addr1 = document.getElementById("addr1").value;
    var addr2 = document.getElementById("addr2").value;
    var city = document.getElementById("city").value;
    var state = document.getElementById("state").value;
    var zip = document.getElementById("zip").value.substring(0, 10);
    var gender = getSelectedValue("gender");
    var vaccinated = getSelectedValue("vaccinated");
    var insurance = getSelectedValue("insurance");
    var history = getCheckedHistory();
    var healthRating = document.getElementById("healthRating").value;
    var symptoms = document.getElementById("symptoms").value;
    var userId = document.getElementById("userId").value;
    var password = document.getElementById("password").value;

    var reviewHTML = ""
        + "<p><strong>Name:</strong> " + firstName + " " + middleInitial + " " + lastName + "</p>"
        + "<p><strong>Date of Birth:</strong> " + dob + "</p>"
        + "<p><strong>ID Number:</strong> " + idNumber + "</p>"
        + "<p><strong>Email:</strong> " + email + "</p>"
        + "<p><strong>Phone:</strong> " + phone + "</p>"
        + "<p><strong>Address:</strong> " + addr1 + "<br>" + addr2 + "<br>" + city + ", " + state + " " + zip + "</p>"
        + "<p><strong>Gender:</strong> " + gender + "</p>"
        + "<p><strong>Vaccinated:</strong> " + vaccinated + "</p>"
        + "<p><strong>Insurance:</strong> " + insurance + "</p>"
        + "<p><strong>Medical History:</strong> " + history + "</p>"
        + "<p><strong>Health Rating:</strong> " + healthRating + "</p>"
        + "<p><strong>Symptoms:</strong> " + symptoms + "</p>"
        + "<p><strong>User ID:</strong> " + userId + "</p>"
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
