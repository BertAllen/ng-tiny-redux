;(function(){}())
function Emitter () {
  this.listeners = {}
}

Emitter.prototype.on = function (message, callback) {
  this.listeners[message] = this.listeners[message] || []
  this.listeners[message].push(callback)
}

Emitter.prototype.off = function (message, callback) {
  if (!this.listeners[message]) { return }
  let i = this.listeners[message].indexOf(callback)
  this.listeners[message].splice(i, 1)
}

Emitter.prototype.CHANGE = function (message, payload) {
  this.emit(message, payload)
}

Emitter.prototype.emit = function (message, payload) {
  for (var f in this.listeners[message]) {
    if (typeof this.listeners[message][f] == 'function') {
      this.listeners[message][f](payload)
    }
  }
}

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




var store = new Store({
state: {},  
mutations:{
   test: function(state, payload){
        if(payload && payload.type && payload.data){
          state[payload.type] = payload.data  
        }
        return state
   }
},
actions: {
   test: function(payload){
      return new Promise(function(resolve, reject){
        setTimeout(function(){
          return resolve({type: 'test', data:payload})
          }, 3000)
      }).then(function(res){
        return store.commit(res.type, res.data)
      })
   }
}
})

store.dispatch('test', {type: 'what', data:{hello:'hello'}})


store.on('test', function(payload){
  console.log('payload', payload)
  console.log('store', store.getState())
})

store.commit('non-registered-mutation', {wont: 'work'})

store.commit('test', {type: 'what', data: {hello: 'world!'}})