/** @jsx React.DOM */
define([
  'react',
], function(React) {
  // isLoggedIn, email
  return React.createClass({
    render: function() {
      var navBar = null;
      if (this.props.isLoggedIn) {
        navBar = (
          <ul className="nav navbar-nav navbar-right">
            <li><a href="javascript:void(0)">Projects</a></li>
            <li className="dropdown">
              <a href="javascript:void(0)" className="dropdown-toggle" data-toggle="dropdown">
                {this.props.email}
                <b className="caret"></b>
              </a>
              <ul className="dropdown-menu">
                <li><a href="javascript:void(0)">Account Settings</a></li>
                <li><a href="/logout">Logout</a></li>
              </ul>
            </li>
          </ul>
        );
      } else {
        navBar = (
          <ul className="nav navbar-nav navbar-right">
            <li><a href="/signup">Sign up</a></li>
            <li><a href="/login">Login</a></li>
          </ul>
        );
      }

      return (
        <header>
          <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="javascript:void(0)">Namer</a>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              {navBar}
            </div>
          </nav>
        </header>
      );
    }
  });
});
