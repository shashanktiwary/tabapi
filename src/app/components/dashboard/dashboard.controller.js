function DashboardController($q, tabService) {
    var $ctrl = this;
    var tabs = [
        {
            id: 'section',
            title: 'Section',
            hasNext: true,
            hasPrevious: false,
            load: angular.bind($ctrl, function (lastTab) {
                console.log('load called');
                return $q.resolve({ data: true });
            }),
            validate: angular.bind($ctrl, function (nextTab) {
                console.log('validation called', nextTab);
                return $q.resolve({ data: true });
            }),
            autoSave: angular.bind($ctrl, function (targetTab, result) {
                console.log('auto save called', targetTab, result);
                return $q.resolve({ data: true });
            }),
            unload: angular.bind($ctrl, function (targetTab, result) {
                console.log('unload called', targetTab, result);
                return $q.resolve({ data: true });
            })
        },
        {
            id: 'columns',
            title: 'Columns',
            hasNext: true,
            hasPrevious: true,
            load: function (lastTab) {
                console.log('load called');
                return $q.resolve({ data: true });
            },
            validate: function (nextTab) {
                console.log('validation called', nextTab);
                return $q.resolve({ data: true });
            },
            autoSave: function (targetTab, result) {
                console.log('auto save called', targetTab, result);
                return $q.resolve({ data: true });
            },
            unload: function (targetTab, result) {
                console.log('unload called', targetTab, result);
                return $q.resolve({ data: true });
            }
        },
        {
            id: 'rows',
            title: 'Rows',
            hasNext: true,
            hasPrevious: true,
            load: function (lastTab) {
                console.log('load called');
                return $q.resolve({ data: true });
            },
            validate: function (nextTab) {
                console.log('validation called', nextTab);
                return $q.resolve({ data: true });
            },
            autoSave: function (targetTab, result) {
                console.log('auto save called', targetTab, result);
                return $q.resolve({ data: true });
            },
            unload: function (targetTab, result) {
                console.log('unload called', targetTab, result);
                return $q.resolve({ data: true });
            }
        },
        {
            id: 'anything',
            title: 'Anything',
            hasNext: false,
            hasPrevious: true,
            load: function (lastTab) {
                console.log('load called');
                return $q.resolve({ data: true });
            },
            validate: function (nextTab) {
                console.log('validation called', nextTab);
                return $q.resolve({ data: true });
            },
            autoSave: function (targetTab, result) {
                console.log('auto save called', targetTab, result);
                return $q.resolve({ data: true });
            },
            unload: function (targetTab, result) {
                console.log('unload called', targetTab, result);
                return $q.resolve({ data: true });
            }
        }
    ];

    // $ctrl.$tabs = new (function () {


    // })();
    $ctrl.$tabs = tabService;
    $ctrl.$tabs.build(tabs, 'section');

    $ctrl.moveTab = function (tab) {
        $ctrl.$tabs.moveTab(tab).then(function () {
            console.log(result);
        }, function (error) {
            console.log(error);
        })
    }
}

angular
    .module('app')
    .controller('DashboardController', DashboardController);