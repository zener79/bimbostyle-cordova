angular.module('starter.controllers', [])
.controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate, $localstorage) {
  $scope.hideIntro=false;
  $scope.startApp = function() {
    if($scope.hideIntro)
      $localstorage.setObject('hide_intro', true);
    else
      $localstorage.setObject('hide_intro', false);
    console.log($localstorage.get("hide_intro"));
    $state.go('scan');
  };
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };
})
.controller("ScanController", function($scope, $state, $cordovaBarcodeScanner, $cameraService, $ionicPopup) {
    $scope.scanBarcode = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
            text=imageData.text
            if(text!=""){
              if(text.substr(0,3) != "z3n"){
                var alertPopup = $ionicPopup.alert({
                  title: "ERRORE!!!",
                  template: "Il codice scansionato non è un codice valido. Assicurati di scansionare il codice fornito da Bimbo.Style",
                });
              }else{
                $cameraService.setArticle(text.substr(3,text.length));
                $state.go('shot');
              }
            }
        }, function(error) {
            console.log("An error happened -> " + error);
        });
    };
})
.controller("PhotoController", function($scope, $state, $cordovaCamera, $cameraService, $cordovaFileTransfer, $ionicPopup, $ionicLoading) {
  $scope.takePhoto = function () {
    var options = {
      quality: 75,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.CAMERA,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 1000,
      targetHeight: 1000,
      saveToPhotoAlbum: true
    };

    $cordovaCamera.getPicture(options).then(function (imageURI) {
      $scope.my_upload(imageURI);
    }, function (err) {
        // An error occured. Show a message to the user
    });
  }
  $scope.choosePhoto = function () {
    var options = {
      quality: 75,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      targetWidth: 1000,
      targetHeight: 1000,
    };

    $cordovaCamera.getPicture(options).then(function (imageURI) {
      $scope.my_upload(imageURI);
    }, function (err) {
      // An error occured. Show a message to the user
    });
  }
  $scope.my_upload = function(imageURI) {
    $ionicLoading.show();
    var options = new FileUploadOptions();
    options.fileKey = "fotografia[foto]";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
    if(options.fileName.lastIndexOf('?') > -1)
      options.fileName = options.fileName.substr(0,options.fileName.lastIndexOf('?'));
    options.mimeType = "image/jpeg";
    var params = {};
    params.articolo_id = $cameraService.article;
    params.from_app = "true";
    options.params=params;
    console.log("upload start");
    $cordovaFileTransfer.upload("https://bimbo.style/fotografie", imageURI,  options).then(function(results){
      console.log("upload success");
      $ionicLoading.hide();
      $scope.showConfirm();
    }, function(err){
      $ionicLoading.hide();
      console.log(err);
    }, function(progress){
      console.log("upload progress");
    });
  }
  $scope.showConfirm = function() {
    var confirmPopup = $ionicPopup.alert({
      title: "Foto inviata con successo",
      template: "Entro pochi secondi dovresti veder comparire la foto direttamente sul monitor del tuo PC",
    });
  }
  $scope.exitApp = function() {
    $ionicPlatform.exitApp();
  }

});
