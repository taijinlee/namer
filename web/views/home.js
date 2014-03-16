/** @jsx React.DOM */
define([
  'react',
  'jsx!/views/layout/layout'
], function(React, Layout) {

  return React.createClass({
    render: function() {
      return this.transferPropsTo(
        <Layout>
          <div>hihi</div>
        </Layout>
      );
    }
  });
});
