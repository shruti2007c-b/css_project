var app = angular.module("contactApp", []);

app.controller("ContactController", function ($scope) {

    $scope.contacts = [];
    $scope.contact = {};
    $scope.editMode = false;
    $scope.editIndex = null;

    $scope.currentPage = "list";
    $scope.showSearch = false;
    $scope.errorMsg = "";

    // Navigation
    $scope.goToAdd = function () {
        $scope.contact = {};
        $scope.editMode = false;
        $scope.currentPage = "form";
    };

    $scope.goBack = function () {
        $scope.currentPage = "list";
        $scope.errorMsg = "";
    };

    $scope.toggleSearch = function () {
        $scope.showSearch = !$scope.showSearch;
    };

    // Save Contact
    $scope.saveContact = function () {

        if (!$scope.contact.name || !$scope.contact.mobile) {
            $scope.errorMsg = "Name and Mobile number are required";
            return;
        }

        if (!/^[0-9]{10}$/.test($scope.contact.mobile)) {
            $scope.errorMsg = "Enter valid 10-digit mobile number";
            return;
        }

        $scope.errorMsg = "";

        if ($scope.editMode) {
            $scope.contacts[$scope.editIndex] =
                angular.copy($scope.contact);
        } else {
            $scope.contacts.push(
                angular.copy($scope.contact)
            );
        }

        $scope.goBack();
    };

    // Edit Contact
    $scope.editContact = function (index) {
        $scope.contact =
            angular.copy($scope.contacts[index]);

        $scope.editIndex = index;
        $scope.editMode = true;
        $scope.currentPage = "form";
    };

    // Delete Contact
    $scope.deleteContact = function (index) {
        if (confirm("Delete this contact?")) {
            $scope.contacts.splice(index, 1);
        }
    };

});
