var alt = require("../alt-application.js")
var <%= componentKey %>Actions = require("../actions/actions.js")

class <%= componentKey %>Store {
  constructor() {

  }

}

module.exports = alt.createStore(<%= componentKey %>Store)
