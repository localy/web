var groupsController = angular.module("SearchApp" , [])
	.controller("RestaurantController", function($scope, $http, $location){
		$scope.searching = true;
		var absUrl = $location.absUrl();
		var splits = absUrl.split("/");
		var id = splits[splits.length-1];
		$scope.res = {};
		$http.get("http://localhost:8090/search/restaurant/"+id)
			.then(function(response) {
			    $scope.res = response.data;
				var locations = [];
		    	var loc = [$scope.res._source.name, $scope.res._source.latitude ,$scope.res._source.longitude ];
		    	locations.push(loc);
			    var map = new google.maps.Map(document.getElementById('map_canvas'), {
			      zoom: 11,
			      center: new google.maps.LatLng(12.9747291,77.6093752), //My Location Hard Coded. Must be taken from the geolocation
			      mapTypeId: google.maps.MapTypeId.ROADMAP
			    });

			    var infowindow = new google.maps.InfoWindow();
			   
			    var marker, i;

			    for (i = 0; i < locations.length; i++) {  
			      marker = new google.maps.Marker({
			        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
			        map: map
			      });

			      google.maps.event.addListener(marker, 'click', (function(marker, i) {
			        return function() {
			          infowindow.setContent(locations[i][0]);
			          infowindow.open(map, marker);
			        }
			      })(marker, i));
			    }

		  	}, function(response) {
				$scope.searching = false;
		  	});
	});