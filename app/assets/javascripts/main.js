var app = angular.module('RepairShoprCalendar', ['ui.calendar', 'ui.bootstrap']);

app.controller('CalendarCtrl', ['$scope', '$http', function($scope, $http) {

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
      'name': 'Christopher',
      'repair_item': 'macbook',
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

  $scope.emailCalendarUpdate = function(event) {
    $scope.ticket['start'] = event.start.format();
    $scope.ticket['end'] = event.end.format();

    var formattedStart = event.start.format('MM/DD/YYYY hh:mma');
    var formattedEnd = event.end.format('hh:mma');
    $scope.ticket['rescheduled_time'] = formattedStart + ' - ' + formattedEnd;

    var token = $("meta[name='csrf-token']").attr('content');
    console.log($scope.ticket);
    $http({
      method: 'POST',
      url: 'email/calendar_update',
      data: {'user': $scope.ticket, 'authenticity_token': token}
    }).
    success(function(data, status, headers, config) {
      console.log('success', data, status, headers, config);
      $('#myModal').modal('hide')
    }).
    error(function(data, status, headers, config) {
      console.log('error', data, status, headers, config);
    });
  };

  $scope.openModal = function(event, delta, revertFunc, jsEvent, ui, view) {
    $scope.dropEvent = event;
    $('#myModal').modal();
  };

  /* config object */
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
      eventDrop: $scope.openModal
    }
  };

  $scope.eventSources = [$scope.tickets];
}]);
