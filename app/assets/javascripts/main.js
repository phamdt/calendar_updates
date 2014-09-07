var app = angular.module('RepairShoprCalendar', ['ui.calendar', 'ui.bootstrap']);

app.controller('CalendarCtrl', ['$scope', function($scope) {

  // fake data so it always shows a date on load
  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();
  var STARTTIME = 10;
  var ENDTIME = 12;

  $scope.tickets = [
    {
      'title': 'Christopher Herman - macbook',
      'start': new Date(y, m, d, STARTTIME),
      'end': new Date(y, m, d, ENDTIME)
    }
  ];
  // default. fullcalendar tracks old and new time so i used angular.copy
  // to prevent a clone error that occurs when modifying a ticket that's part of
  // the list of tickets, which is fed into eventSources
  $scope.ticket = angular.copy($scope.tickets[0]);

  $scope.techs = ["Troy Anderson"];
  // default
  $scope.tech = $scope.techs[0];

  /* alert on Drop */
   $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
    $scope.ticket['start'] = event.start.format();
    $scope.ticket['end'] = event.end.format();
  };

  // /* add custom event*/
  // $scope.addEvent = function() {
  //   $scope.events.push({
  //     title: 'Open Sesame',
  //     start: new Date(y, m, d),
  //     end: new Date(y, m, d),
  //     className: ['openSesame']
  //   });
  // };

  // /* config object */
  $scope.uiConfig = {
    calendar: {
      defaultView: 'agendaWeek',
      height: 450,
      editable: true,
      header:{
        left: 'prev,next',
        center: 'title',
        right: ''
      },
      minTime: '09:00:00',
      maxTime: '18:00:00',
      eventDrop: $scope.alertOnDrop
    }
  };

  $scope.eventSources = [$scope.tickets];
}]);
