(function () {
  function TabService($q) {
    this.tabs = null;
    this.current = null;

    this.build = function (tabs, defaultTabId) {
      this.tabs = tabs;
      this.current = this.getTabByKey(defaultTabId);
      return this.current.load();
    };

    this.remove = function (tabId) {
      var tab = this.getTabByKey(tabId);
      var index = this.tabs.indexOf(tab);
      this.tabs.splice(index, 1);
    };

    this.replaceWith = function (tabId, tabs) {
      var tab = this.getTabByKey(tabId);
      var index = this.tabs.indexOf(tab);
      this.tabs.splice(index, 0, tabs);
    };

    this.getTabByKey = function (key) {
      return this.tabs.find(function (tab) {
        if (tab.id === key)
          return true;
        return false;
      })
    };

    this.moveTab = function (targetTab) {
      var defex = $q.defer();
      // validation
      this.validate(targetTab).then(angular.bind(this, function (result) {

        // auto save current tab
        this.autoSave(targetTab, result).then(angular.bind(this, function (autoResult) {

          // unload current tab
          this.unload(targetTab, autoResult).then(angular.bind(this, function (result) {

            // on success set target tab as current tab
            this.current = targetTab;
            this.current.load(autoResult).then(angular.bind(this, function () {
              defex.resolve(result);
            }), function (error) {
              defex.reject({ reason: 'load', error: error });
            });

          }), function (error) {
            defex.reject({ reason: 'unload', error: error });
          })
        }), function (error) {
          defex.reject({ reason: 'autosave', error: error })
        })
      }), function (error) {
        defex.reject({ reason: 'validate', error: error })
      });

      return defex.promise;
    };

    this.getNextTab = function () {
      return this.tabs[this.tabs.indexOf(this.current) + 1];
    };

    this.getPreviousTab = function () {
      return this.tabs[this.tabs.indexOf(this.current) - 1];
    };

    this.hasNext = function () {
      return this.current.hasNext;
    };

    this.hasPrevious = function () {
      return this.current.hasPrevious;
    };

    this.next = function (targetTab) {
      if (!targetTab)
        targetTab = this.getNextTab();
      return this.moveTab(targetTab);
    };

    this.previous = function (targetTab) {
      if (!targetTab)
        targetTab = this.getPreviousTab();
      return this.moveTab(targetTab);
    };

    this.validate = function (nextTab) {
      return this.current.validate(nextTab);
    }

    this.autoSave = function (nextTab, result) {
      return this.current.autoSave(nextTab, result);
    };

    this.unload = function (nextTab, result) {
      return this.current.unload(nextTab, result);
    };

    this.cancel = function () {
      return this.current.cancel();
    };
  };

  angular
    .module('app')
    .service('tabService', TabService);
})();