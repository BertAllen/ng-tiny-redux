angular.module('storytime')
  .component('heroes', {
    template: `
		<input ng-model="$ctrl.hero.name" />
		<button ng-click="$ctrl.addHero($ctrl.hero)">add</button>
		<ul>
			<li ng-repeat="hero in $ctrl.heroes">{{hero.name}} <button ng-click="$ctrl.removeHero($index)">x</button></li>
		</ul>
		`,
    controller: function (Store) {
      var hc = this
      this.$onInit = function () {
        Store.on('ADD_HERO', function () {
          hc.heroes = Store.getState().heroes
        })
        Store.on('REMOVE_HERO', function () {
          hc.heroes = Store.getState().heroes
        })
      }

      this.addHero = function (hero) {
        Store.commit('ADD_HERO', hero)
        hc.hero = null
      }

      this.removeHero = function (i) {
        Store.commit('REMOVE_HERO', i)
      }
    }
  })
