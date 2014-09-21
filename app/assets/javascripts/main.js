angular.module('RepairShoprCalendar', ['ui.calendar', 'ui.bootstrap'])
.controller('CalendarCtrl', ['$scope', '$http', function($scope, $http) {

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


  var updateTicket = function(ticket, event) {
    ticket['start'] = event.start.format();
    ticket['end'] = event.end.format();

    var formattedStart = event.start.format('MM/DD/YYYY hh:mma');
    var formattedEnd = event.end.format('hh:mma');
    ticket['rescheduled_time'] = formattedStart + ' - ' + formattedEnd;

    return ticket;
  };

  $scope.showSendBtn = true;
  $scope.emailCalendarUpdate = function(event) {
    $scope.showSendBtn = false;
    $scope.ticket = updateTicket($scope.ticket, event);

    var token = $("meta[name='csrf-token']").attr('content');

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
    }).
    finally(function() {
      $scope.showSendBtn = true;
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
}])
.directive('spinner', function() {
  return function(scope, elem, attrs) {
    var elId = attrs.id;
    var opts = {
      lines: 13,            // The number of lines to draw
      length: 10,           // The length of each line
      width: 3,            // The line thickness
      radius: 5,           // The radius of the inner circle
      corners: 1,           // Corner roundness (0..1)
      rotate: 0,            // The rotation offset
      direction: 1,         // 1: clockwise, -1: counterclockwise
      color: '#000',        // #rgb or #rrggbb or array of colors
      speed: 1,             // Rounds per second
      trail: 60,            // Afterglow percentage
      shadow: false,        // Whether to render a shadow
      hwaccel: false,       // Whether to use hardware acceleration
      className: 'spinner', // The CSS class to assign to the spinner
      zIndex: 2e9,          // The z-index (defaults to 2000000000)
      top: '50%',           // Top position relative to parent
      left: '50%'           // Left position relative to parent
    };
    var target = document.getElementById(elId);
    var spinner = new Spinner(opts).spin(target);
  };
});