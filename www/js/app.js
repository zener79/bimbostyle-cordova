// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('intro', {
      url: '/intro',
      templateUrl: 'templates/intro.html',
      controller: 'IntroCtrl'
    })  
    .state('shot', {
      url: 'shot',
      templateUrl: 'templates/shot.html'
    })  
    .state('scan', {
      url: 'scan',
      templateUrl: 'templates/scan.html'
    })  

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise(function($injector, $location){
    var state = $injector.get('$state');
    var localstorage = $injector.get('$localstorage');
    if(localstorage.get("hide_intro") == "true")
      state.go('scan');
    else
      state.go('intro');
    return $location.path();
  });
})

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}])
.service('$cameraService', function() {
  this.article= 0;
  this.article = function() {
        return this.article;
  };
  this.setArticle = function(id) {
        this.article = id;
  };
})



