// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers'])

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
    .state('intro1', {
      url: '/intro1',
      templateUrl: 'templates/intro1.html'
    })  
    .state('intro2', {
      url: '/intro2',
      templateUrl: 'templates/intro2.html'
    })  
    .state('ready', {
      url: '/ready',
      templateUrl: 'templates/ready.html'
    })  

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/intro1');
})




