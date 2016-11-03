const mongoose = require('mongoose');
const schemas = {
  user: {
    name: {type: String, default: 'Anonymous'},
    email: {type: String, required: false},
    /**
     * Password is SHA256 hash string
     */
    password: {type: String, required: false},
    token: {type: String, required: true},
    /**
     * Source can takes the following values:
     *  'enp'*String (default) - self registration with email and password
     *  'gplus'*String - OAuth2 from Google+
     *  'facebook'*String - OAuth from Facebook
     */
    source: {type: String, default: 'enp'},
    /**
     * Photo is link to image (default link to gray person avatar)
     */
    photo: {type: String, default: 'http://hotchillitri.co.uk/wp-content/uploads/2016/10/empty-avatar.jpg'},
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date}
  }
};

class User {

  constructor() {
    this.user = mongoose.model('User', new mongoose.Schema(schemas.user));
  }


}