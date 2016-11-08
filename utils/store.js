function Store (config) {
  var store = this
	
	//Store inherits Event Emitter Methods
	store = Object.create(new Emitter())

  var state = config.state || {}
  var mutations = config.mutations || {}
  store.actions = config.actions || {}
	store.getter = config.getters || {}

  store.getState = function () {
		// Allows DEEP copy of state
		return JSON.parse(JSON.stringify(state))
  }

  function _toArray (type) {
    if (typeof type == 'string') {
      type = [type]
    }
    if (!Array.isArray(type)) {
      return console.error(`[store::dispatch] expecting a string or array of strings but got: `, type)
    }
    return type
  }

  store.dispatch = function (type, payload) {
    type = _toArray(type)
    dispatchableActions = type.filter(function (name) {
      var action = store.actions[type]
      return action ? action : console.error(`[store::dispatch] unknown action type ${action}`)
    })
    dispatchableActions.map(function (action) {
      store.actions[action](payload)
    })
  }

  store.commit = function (name, payload) {
    var commitable = mutations[name]
    if (!commitable) {
      return console.error(`[store::commit] unknown mutation type ${name}`)
    }
    commitable = commitable.bind(null)
    state = commitable(state, payload)
		store.CHANGE(name, payload)
  }
	return store
}
