(function() {
	
	angular.module( 'story-modules', [] )

	.controller( 
		'StoriesGridController', 
		function( loadStoriesFactory ) {
			var self 		= this;
			this.stories 	= loadStoriesFactory.stories;
			loadStoriesFactory.loadStories();
		}
	)
	.controller( 
		'CamperInfoController', 
		function( $scope, StateHolderFactory ) {
			var self = this;

			this.hasData = false;

			this.focusedStory = {
				username 	: null,
				points 		: null,
				date 		: null
			}
			$scope.focusedStory = this.focusedStory;

			this.updateStory = function( val ) {
				this.focusedStory.username 	= val.author.username;
				this.focusedStory.points 	= val.rank;
				this.focusedStory.date 		= val.timePosted;
				this.focusedStory.campUser 	= val.campUser;
				this.hasData 				= true;
				$scope.$apply();
			}

			StateHolderFactory.addCallback(
				function() {
					self.updateStory( StateHolderFactory.focusedData );
				}
			);
		}
	)

	.constant( 
		'endpoint', 
		'http://www.freecodecamp.com/news/hot' 
	)
	.constant(
		'basePath',
		'http://www.freecodecamp.com/'
	)
	.factory( 
		'loadStoriesFactory', 
		function( endpoint, basePath, $http ) {

			var stories 		= []
			var loadStories 	= function( ) {
				$http.get( endpoint ).success(function( data ) {
					data.forEach( function( curr ) {
						curr[ 'campUser' ] = basePath + curr.author.username;
						stories.push( curr );
					});
				});
			};
			return {
				stories 		: stories,
				loadStories 	: loadStories
			};
		}
	)
	.factory(
		'StateHolderFactory',
		function( ) {
			return {
				focusedData : null,
				callbacks : [],
				updatedFocused : function( focused ) {
					this.focusedData = focused;
					this.notifyObservers();
				},
				addCallback : function( c ) {
					this.callbacks.push( c );
				},
				notifyObservers : function() {
					this.callbacks.forEach( function( curr ) {
						curr( );
					});
				}
			};
		}
	)

	.directive( 
		'storiesHeader', 
		function( loadStoriesFactory ) {
			return {
				restrict		: 'E',
				templateUrl		: 'stories-header.html',
				link			: function( scope, element, attrs ) {
					element.click( function() {
						$('html, body').animate( 
							{ 'scrollTop' : 0 } , 500
						);
						loadStoriesFactory.loadStories();
					});
				}
			}
		}
	)
	.directive('storiesGrid', function() {
		return {
			restrict		: 'E',
			templateUrl		: 'stories-grid.html',
			controller		: 'StoriesGridController',
			controllerAs	: 'grid'
		}
	})
	.directive('storySingle', function( ) {
		return {
			restrict		: 'E',
			templateUrl		: 'story-single.html',
			controller 		: function( 
				$scope, 
				StateHolderFactory 
			) {
				this.current 		= $scope.story;
				this.updateShared 	= function( ) {
					StateHolderFactory.updatedFocused(
						this.current 
					);
				}
			},
			controllerAs 	: "single",
			link 			: function( scope, element, attrs, controller ) {
				element.hover(
					function( ) {
						if ( ! window.matchMedia( '(max-width:899px)' ).matches ) {
							controller.updateShared();
							$( 'div.meta-info' ).stop( true, true );
							$( 'div.meta-info' ).fadeTo( 100, 1 );
						}
					},
					function( ){
						if ( ! window.matchMedia( '(max-width:899px)' ).matches ) {
							$( 'div.meta-info' ).stop( true, true );
							$( 'div.meta-info' ).fadeTo( 100, 0.4 );
						}
					}
				);
			}
		}
	})
	.directive( 'camperSideInfo', function() {
		return {
			restrict 		: 'E',
			templateUrl 	: 'story-side-info.html',
			controller 		: 'CamperInfoController',
			controllerAs	: 'info',
			link 			: function( scope, element ) {
				$( 'div.meta-info' ).fadeTo( 0, 0.1 );
				$( 'div.meta-info' ).hover( function() {
					$( 'div.meta-info' ).stop( true, true );
					$( 'div.meta-info' ).fadeTo( 100, 1 );
				}, function() {
					$( 'div.meta-info' ).stop( true, true );
					$( 'div.meta-info' ).fadeTo( 100, 0.4 );
				});
			}
		}
	});

})();

