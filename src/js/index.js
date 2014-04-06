var examApp = angular.module('exam', []);
var url = new URL(document.URL);

examApp.controller('ExamCtrl', ['$scope', function($scope){
  var params = url.query;
  $scope.isMarked = false;

  $scope.fills = _.shuffle(window.data.fills).slice(0, params.Fill);
  $scope.mark_fill = function(ind){
    var fill = $scope.fills[ind];
    for (var i=0; i < fill.ans.length; ++i) {
      if (fill.ans[i] != fill.answers[i])
        return false;
    }
    return true;
  };

  $scope.radios = _.shuffle(window.data.radios).slice(0, params.Radio);
  $scope.mark_radio = function(ind){
    return $scope.radios[ind].ans == $scope.radios[ind].answer;
  };

  $scope.checkboxs = _.shuffle(window.data.checkboxs).slice(0, params.Checkbox);
  $scope.mark_checkbox = function(ind){
    var checkbox = $scope.checkboxs[ind];
    for (var i=0; i < checkbox.ans.length; ++i) {
      if (!(checkbox.ans[i] ^ checkbox.answer.indexOf(i) == -1))
          return false;
    }
    return true;
  };
}]);
