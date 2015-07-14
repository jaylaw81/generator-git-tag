var React = require("react")
var Router = require("react-router")
var routes = require("./router/routes.jsx")

Router.run(routes, function(Handler) {
  React.render(
    <Handler />,
    document.getElementById('ReactApp')
  );
})
