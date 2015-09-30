import Ember from 'ember';
import ParseUser from 'ember-parse-adapter/models/parse-user';

// ParseUser is created by the Ember Parse Adapter.
// @see: node_modules/ember-parse-adapter/addon/models/parse-user.js

ParseUser.reopenClass({

  /****************************************************************************
  /* ACTIONS
  /***************************************************************************/

  /* Current User - called by 'authenticators/parse.js' */
  current: function(store) {

    // Get adapter and serializer
    var adapter = store.adapterFor('parse-user');
    var serializer = store.serializerFor('parse-user');

    return adapter.ajax(adapter.buildURL("parse-user", "me"), "GET", {}).then(function(user) {
      return store.push({
        data: {
          id: user.objectId,
          type: 'parse-user',
          attributes: {
            sessionToken: user.sessionToken,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
          }
        }
      });
    });
  }
});

export default ParseUser;
