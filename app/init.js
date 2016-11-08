angular.module('storytime', ['ng-tiny-redux'])
  .factory('Store', function (TinyStore) {
		var store = TinyStore.create({
			state: {
				name: 'Story Time'
			},
			mutations: {
				ADD_HERO: function(state, hero){
					state.heroes = state.heroes || []
					state.heroes.push(hero) 
					return state
				},
				REMOVE_HERO: function(state, i){
					state.heroes.splice(i,1); 
					return state
				}
			}
		})
		return store
  })
  .run(function () {})
