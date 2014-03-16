/** @jsx React.DOM */
define([
  'react',
  'jsx!./header',
  'jsx!./footer'
], function(React, Header, Footer) {
  return React.createClass({
    render: function() {
      return this.transferPropsTo(
        <div>
          <Header isLoggedIn={this.props.cookie.get('userId')} email={this.props.user.get('email')} />
          <section className="container">
            {this.props.children}
          </section>
          <Footer />
        </div>
      );
    }
  });
});
