angular.module("nodeChessApp", [])
    .controller('GamesController', function ($scope,$http) {
    	$scope.games = [];

    	$http.get('/api/games')
    		.sucess(
    			function(data){
    				$scope.games = data;
    			})
    		.error(
    			function(data){

    			});

    })
    .controller('PlayersController', function ($scope,$http) {
    	$scope.players = [];

    	$http.get('/api/players')
    		.sucess(
    			function(data){
    				$scope.players = data;
    			})
    		.error(
    			function(data){

    			});

    });
