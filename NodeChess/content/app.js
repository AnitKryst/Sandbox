angular.module("nodeChessApp", [])
    .controller('GamesController', function ($scope,$http) {
    	$scope.games = [];

    	$http.get('api/games')
    		.success(
    			function(data){
    				$scope.games = data;
    			})
    		.error(
    			function(data){

    			});

    })
    .controller('PlayersController', function ($scope,$http) {
    	$scope.players = [];

    	$http.get('api/players')
    		.success(
    			function(data){
    				$scope.players = data;
    			})
    		.error(
    			function(data){

    			});

    });
