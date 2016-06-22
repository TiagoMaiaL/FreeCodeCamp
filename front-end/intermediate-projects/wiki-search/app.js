
/* FIXME: App not working on chrome; */

/* NiceToHave: Improve OnBoarding experience by linking h1 to a search action */
/* NiceToHave: Add loading animations to the text */
/* NiceToHave: Setup No results suggestions experiences. -> Typing in term */
/* NiceToHave: Setup error experiences. -> Retry request */

( function() {

	angular.module( 
		'wiki', 
		[ 'ngAnimate' ]
	)

	.constant( 
		'enterKeyCode', 
		13 
	)
	.constant(
		'baseWikiPath',
		'http://en.wikipedia.org/wiki/'
	)
	.constant(
		'searchRequestPath', 
		'http://en.wikipedia.org/w/api.php?action=query&list=search&format=json&continue&callback=JSON_CALLBACK&'
	)
	.factory( 'AbortableAJAXFactory', function( $http, $q ) {
		return {
			GETAbortableAjax : function( resource ) {

				var deferrable 	= $q.defer();
				var promise 	= $http( {
					method		: 'JSONP', /* TODO: Try to use common get methods */
					url 		: resource,
					timeout 	: deferrable.promise
				});
				promise.then( function success( data ) {
					return data;
				});
				promise.abort = function() {
					deferrable.resolve();
				};
				return promise;
			}
		};
	})
	.factory( 'SearchRequesterFactory', function( searchRequestPath, AbortableAJAXFactory ) {

		var factory = {
			request 			: null,
			responseData 		: null,
			searchResults 		: [],
			countObservers 		: [],
			errorObservers 		: [],
			loadingObservers 	: [],
			addCountObserver 	: function( c ) {
				this.countObservers.push( c );
			},
			addErrorObserver 	: function( c ) {
				this.errorObservers.push( c );
			},
			addLoadingObserver 	: function( c ) {
				this.loadingObservers.push( c );
			},
			notify 				: function( config ) {
				this.countObservers.forEach( function( curr ) {
					curr( this.searchResults.length, config.callingApply );
				}.bind( this ) );
			},
			notifyErrors 		: function( config ) {
				this.errorObservers.forEach( function( curr ) {
					curr( config.error, false );
				});
			},
			notifyLoading 		: function( config ) {
				this.loadingObservers.forEach( function( curr ) {
					curr( config.isLoading );
				});
			},
			search 				: function( searchString ) {

				this.searchResults.length 	= 0;

				if ( this.request ) {
					this.request.abort();
					this.request = null;
				}

				if ( searchString ) {
					var requestPath = searchRequestPath + 
						"srsearch=" + 
						searchString;

					this.request = AbortableAJAXFactory.GETAbortableAjax( requestPath );

					factory.notifyLoading( { isLoading : true } );

					this.request.then( function success( value ) {

						factory.responseData = value;

						value.data.query.search.forEach( function( curr ) {
							factory.searchResults.push( curr );
						});

						factory.notify( { callingApply : false } );
						factory.notifyLoading( { isLoading : false } );

					}, function failure( error ) {

						factory.notifyErrors( { error : error } );
						factory.notifyLoading( { isLoading : false } );
					});
				} else {

					factory.notify( { callingApply : true } );
					factory.notifyLoading( { isLoading : false } );
				}
			}
		}
		return factory;
	})
	.factory( 'SearchBoxFactory', function( searchRequestPath, AbortableAJAXFactory ) {
		return {
			request 		: null,
			responseData 	: null,	
			abortRequest 	: function() {
				if ( this.request ) {
					this.request.abort();
					this.request = null;
				}
			},
			getTitleTips 	: function( searchText, tipLength, c ) {

				if ( ! tipLength ) return;

				this.abortRequest();

				if ( searchText ) {

					var requestPath = searchRequestPath + 
						'srsearch=' 					+ 
						searchText 						+ 
						'&srprop=null';

					this.request = AbortableAJAXFactory.GETAbortableAjax( requestPath );
					this.request.then( function success( value ) {
						this.responseData = value;
						c( value.data.query.search.slice( 0, tipLength ).map( 
							function( curr ) {
								return curr.title;
							} 
						) );
					}.bind( this ) );

				} else {
					c( null );
				}
			}
		};
	})

	.directive( 'searchBox', function( enterKeyCode ) {
		return {
			restrict 			: 'E',
			templateUrl 		: 'search-box.html',
			controller 			: 'SearchBoxController',
			controllerAs 		: 'SearchController',
			link 				: function( scope, element, attrs, controller ) {

				var mediaQueryChecker = function() {
					var width = $( window ).width();

					if ( $( window ).width() < 660 ) {
						controller.setTipsLength( 2 );
					} else if ( $( '#searchMenu' ).css( 'display' ) == 'none' ) {
						controller.setTipsLength( 0 );
					}
				}

				$( '#searchInput' ).keyup( function( e ) {
					if ( e.keyCode == enterKeyCode ) {
						$( '#searchInput' ).autocomplete( 'close' );
						controller.searchForText( $( this ).val() );
					}
				});
				$( "#searchInput" ).autocomplete({
					source 			: function( request, response ) {
						controller.searchForTitleTips( request.term, response );
					},
					appendTo 		: "#searchMenu",
					position 		: {
						my : 'right top',
						at : 'right bottom'
					}
				});
				$( window ).resize( mediaQueryChecker );
			}
		}
	})
	.controller( 'SearchBoxController', function( SearchRequesterFactory, SearchBoxFactory, SearchBoxFactory ) {
		var tipsLength = 4;

		this.currentSearchData 			= SearchRequesterFactory.searchResults;
		this.searchForText				= function( searchStr ) {
			SearchRequesterFactory.search( searchStr );
			SearchBoxFactory.abortRequest();
		};
		this.searchForTitleTips 		= function( term, c ) {
			if ( tipsLength ) {
				SearchBoxFactory.getTitleTips( term, tipsLength, c );
			}
		};
		this.setTipsLength 				= function( length ) {
			if ( length > 4 ) {
				length = 4;
			} else if ( length < 0 ) {
				length = 0;
			}
			tipsLength = length;
		};
	})

	.directive( 'wikiResults', function() {
		return {
			restrict 		: 'E',
			templateUrl 	: 'wiki-results.html',
			controller 		: 'WikiResultsController',
			controllerAs 	: 'results'
		}
	})
	.controller( 'WikiResultsController', function( $scope, SearchRequesterFactory, SearchBoxFactory ) {

		this.articles 				= SearchRequesterFactory.searchResults;
		this.hasArticles 			= false;

		this.canDisplayArticles 	= false;
		this.canDisplayEmpty 		= false;
		this.errorOccurred 			= false;

		this.loadingResults 		= false;

		this.updateCountStates = function( count, shouldApply ) {
			this.errorOccurred 			= false;
			this.hasArticles 			= count > 0;
			this.canDisplayArticles 	= 	this.hasArticles 		&& 
											!this.errorOccurred;

			this.canDisplayEmpty 		= 	!this.hasArticles 		&& 
											!this.errorOccurred 	&& 
											!$scope.isOnboarding;
			if ( shouldApply ) {
				$scope.$apply();
			}
		}

		this.updateErrorStates = function( error, shouldApply ) {
			this.errorOccurred 			= true;
			this.canDisplayEmpty 		= false;
			this.canDisplayArticles 	= false;

			if ( shouldApply ) {
				$scope.$apply();
			}
		}
		SearchRequesterFactory.addCountObserver( function( count, shouldApply ) {
			SearchBoxFactory.abortRequest();
			this.updateCountStates( count, shouldApply );
		}.bind( this ) );

		SearchRequesterFactory.addErrorObserver( function( error, shouldApply ) {
			this.updateErrorStates( error, shouldApply );
		}.bind( this ) );

		SearchRequesterFactory.addLoadingObserver( function( isLoading ) {
			SearchBoxFactory.abortRequest();
			this.loadingResults = isLoading;
		}.bind( this ) );
	})

	.directive( 'wikiArticle', function() {
		return {
			restrict 		: 'E',
			templateUrl 	: 'wiki-article.html',
			controller 		: 'WikiArticleController',
			controllerAs 	: 'article'
		}
	})
	.controller( 'WikiArticleController', function( $scope, $sce, baseWikiPath ) {
		this.single 		= $scope.single;
		this.single.url 	= baseWikiPath + this.single.title;
		this.getSnippet 	= function() {
			return $sce.trustAsHtml( $scope.single.snippet + '...' );
		};
	})

	.directive( 'onBoarding', function() {
		return {
			restrict 		: 'E',
			templateUrl 	: 'on-boarding.html',
			controller 		: 'OnBoardingController',
			controllerAs 	: 'OnBoarding',
			link 			: function( scope, element, attrs, controller ) {
				controller.watchOnBoarding();
			}
		}
	})
	.controller( 'OnBoardingController', function( $scope, SearchRequesterFactory ) {
		this.watchOnBoarding 	= function() {

			this.isOnboarding 	= true;
			$scope.isOnboarding = true;

			SearchRequesterFactory.addLoadingObserver( function() {

				if ( this.isOnboarding ) {

					this.isOnboarding 	= false;
					$scope.isOnboarding = false;

				}
			}.bind( this ) );
		}
	})

	.directive( 'noResults', function() {
		return {
			restrict 		: 'E',
			templateUrl 	: 'no-results.html'
		}
	})

	.directive( 'wikiError', function() {
		return {
			restrict		: 'E',
			templateUrl 	: 'wiki-error.html',
		}
	})

})();

