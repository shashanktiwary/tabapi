var dashboard = {
  templateUrl: './dashboard.component.html',
  controller: 'DashboardController',
  controllerAs: '$ctrl'
};

angular
  .module('dashboard')
  .component('dashboard', dashboard);