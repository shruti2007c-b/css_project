var app = angular.module("contactApp", []);

app.controller("ContactController", function ($scope) {

    $scope.contacts = [];
    $scope.contact = {};
    $scope.editMode = false;
    $scope.editIndex = null;

    $scope.showForm = true;
    $scope.showSearch = false;
    $scope.errorMsg = "";
    $scope.isDarkMode = false;

    $scope.toastMsg = "";
    $scope.toastClass = "";

    // Toggle Add/Edit Form
    $scope.toggleForm = function () {
        $scope.showForm = !$scope.showForm;
        $scope.contact = {};
        $scope.editMode = false;
        $scope.errorMsg = "";
    };

    // Toggle search bar
    $scope.toggleSearch = function () {
        $scope.showSearch = !$scope.showSearch;
    };

    // Toggle Dark Mode
    $scope.toggleDarkMode = function () {
        $scope.isDarkMode = !$scope.isDarkMode;
    };

    // Show toast popup
    $scope.showToast = function(message, type) {
        $scope.toastMsg = message;
        $scope.toastClass = type === 'error' ? 'toast-error' : 'toast-success';
        setTimeout(() => {
            $scope.toastMsg = "";
            $scope.toastClass = "";
        }, 3000);
    };

    // Navigate back to contact list
    $scope.goBack = function () {
        $scope.showForm = true;
        $scope.contact = {};
        $scope.editMode = false;
        $scope.errorMsg = "";
        $scope.emailError = "";
    };

    // Save Contact
    $scope.saveContact = function () {
        $scope.errorMsg = "";
        $scope.emailError = "";

        // Required fields
        if (!$scope.contact.name || !$scope.contact.mobile) {
            $scope.showToast("Name and Mobile number are required!", "error");
            return;
        }

        // Mobile validation
        if (!/^[0-9]{10}$/.test($scope.contact.mobile)) {
            $scope.showToast("Enter a valid 10-digit mobile number!", "error");
            return;
        }

        // Email validation (optional)
        if ($scope.contact.email) {
            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test($scope.contact.email)) {
                $scope.showToast("Enter a valid email address!", "error");
                return;
            }
        }

        // Save or update contact
        if ($scope.editMode) {
            $scope.contacts[$scope.editIndex] = angular.copy($scope.contact);
            $scope.showToast("Contact updated successfully!", "success");
        } else {
            $scope.contacts.push(angular.copy($scope.contact));
            $scope.showToast("Contact added successfully!", "success");
        }

        $scope.contact = {};
        $scope.editMode = false;
        $scope.goBack();
    };

    // Edit Contact
    $scope.editContact = function (index) {
        $scope.contact = angular.copy($scope.contacts[index]);
        $scope.editIndex = index;
        $scope.editMode = true;
        $scope.showForm = true;
    };

    // Delete Contact
    $scope.deleteContact = function (index) {
        if (confirm("Delete this contact?")) {
            $scope.contacts.splice(index, 1);
            $scope.showToast("Contact deleted!", "success");
        }
    };

});
