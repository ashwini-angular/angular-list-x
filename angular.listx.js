// Generated by CoffeeScript 1.7.1
angular.module('listxModule', []).value('listxConfig', {
  template: '/tpl/list-tpl.html',
  searchBarTemplate: '/tpl/search-bar-tpl.html',
  itemsTemplate: '/tpl/items-tpl.html',
  itemTemplate: '/tpl/item-tpl.html'
}).controller('listxController', function($scope, $element, $attrs, $transclude, $templateCache, listxConfig) {
  $scope.searchBarTemplate = listxConfig.searchBarTemplate;
  $scope.itemsTemplate = listxConfig.itemsTemplate;
  $scope.itemTemplate = listxConfig.itemTemplate;
  $scope.itemTpl = false;
  $scope.q = {
    val: ''
  };
  $scope.isSelected = function(item) {
    if (item.selected) {
      return 'active';
    }
  };
  $scope.selectItem = function(item) {
    var curItem, _i, _len, _ref;
    _ref = $scope.ngModel;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      curItem = _ref[_i];
      if (curItem.selected) {
        delete curItem.selected;
      }
    }
    item.selected = true;
    return $scope.onSelect({
      item: item
    });
  };
  this.setItemTemplate = function(tpl, src) {
    $scope.itemTpl = true;
    if (src) {
      $scope.itemTemplate = src;
    }
    return $templateCache.put('listxItemTpl', tpl);
  };
  return null;
}).directive('listX', [
  '$http', '$templateCache', 'listxConfig', function($http, $templateCache, listxConfig) {
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      require: 'ngModel',
      scope: {
        title: '@',
        hideSearchBar: '@',
        itemHandlers: '&',
        loadUrl: '@',
        ngModel: '=',
        onSelect: '&'
      },
      templateUrl: function(tElement, tAttrs) {
        return listxConfig.template;
      },
      controller: 'listxController',
      link: function(scope, iElement, iAttrs, controller) {
        if (scope.loadUrl) {
          $http.get(scope.loadUrl).success(function(data) {
            return scope.ngModel = data;
          });
        }
        return $('.list-x-main div[ng-transclude]').remove();
      }
    };
  }
]).directive('itemTemplate', function() {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    require: '^listX',
    scope: {
      itemTemplate: '@'
    },
    template: '<div ng-transclude></div>',
    link: function(scope, iElement, iAttrs, controller) {
      return controller.setItemTemplate(iElement.html(), scope.itemsTemplate);
    }
  };
});

//# sourceMappingURL=angular.listx.map
