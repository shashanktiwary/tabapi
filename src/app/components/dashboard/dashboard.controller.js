function DashboardController($q, tabService) {
    var $ctrl = this;
    $ctrl.form = {
        section: {

        },
        columns: {

        }
    };

    var tabs = [
        {
            id: 'section',
            title: 'Section',
            hasNext: true,
            hasPrevious: false,
            load: angular.bind($ctrl, function (lastTab, aForm) {
                var $ctrl = this;
                if (aForm) {
                    $ctrl.form.section = aForm.section;
                } else {
                    $ctrl.form.section.selectedSection = 'AB';
                }
                console.log('load called');
                return $q.resolve({ data: true });
            }),
            validate: angular.bind($ctrl, function (nextTab) {
                var $ctrl = this;
                if (!$ctrl.form.section.name || !$ctrl.form.section.name.match(/^\w+/g)) {
                    alert('Please enter section name');
                    return $q.reject({ reason: 'validation', message: 'Validation fails.' });
                }
                console.log('validation called', nextTab);
                return $q.resolve({ data: true });
            }),
            autoSave: angular.bind($ctrl, function (targetTab, result) {
                console.log('auto save called', targetTab, result);
                return $ctrl._autoSave(targetTab).then(function (result) {
                    if (!targetTab) {
                        alert('Section saved succesfully');
                    }
                    return $q.resolve(result);
                }, function (error) {
                    return $q.reject(result);
                });
            }),
            unload: angular.bind($ctrl, function (targetTab, aForm) {
                $ctrl.form.section.disableSelect = true;
                console.log('unload called', targetTab);
                return $q.resolve(aForm);
            })
        },
        {
            id: 'columns',
            title: 'Columns',
            hasNext: true,
            hasPrevious: true,
            load: angular.bind($ctrl, function (lastTab, aForm) {
                if (aForm) {
                    $ctrl.form.columns.sectionName = aForm.section.name;
                }

                console.log('load called');
                return $q.resolve({ data: true });
            }),
            validate: function (nextTab) {
                console.log('validation called', nextTab);
                return $q.resolve({ data: true });
            },
            autoSave: function (targetTab, result) {
                console.log('auto save called', targetTab, result);
                return $q.resolve($ctrl.form);
            },
            unload: function (targetTab, result) {
                console.log('unload called', targetTab, result);
                return $q.resolve(result);
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

    $ctrl._autoSave = function (targetTab) {
        return $q.resolve($ctrl.form);
    }

    $ctrl.$tabs = tabService;
    $ctrl.$tabs.build(tabs, 'section');

    $ctrl.moveTab = function (tab) {
        $ctrl.$tabs.moveTab(tab).then(function (result) {
            console.log(result);
        }, function (error) {
            console.log(error);
        });
    }

    $ctrl.moveNext = function () {
        $ctrl.$tabs.next().then(function (result) {
            console.log(result);
        }, function (error) {
            console.log(error);
        });
    }

    $ctrl.movePrevious = function () {
        $ctrl.$tabs.previous().then(function (result) {
            console.log(result);
        }, function (error) {
            console.log(error);
        });
    }

    $ctrl.autoSave = function () {
        $ctrl.$tabs.autoSave(null).then(function (result) {
            console.log(result);
        }, function (error) {
            console.log(error);
        });
    }

    $ctrl.cancel = function(){
        $ctrl.$tabs.cancel();
    }
}

angular
    .module('app')
    .controller('DashboardController', DashboardController);