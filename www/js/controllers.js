angular.module('starter.controllers', [])

.controller("ScanController", function($scope, $cordovaBarcodeScanner) {
    $scope.scanBarcode = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
            // alert(imageData.text);
            console.log("Barcode Format -> " + imageData.format);
            console.log("Cancelled -> " + imageData.cancelled);
            $scope.go('ready');
        }, function(error) {
            console.log("An error happened -> " + error);
        });
    };
});

