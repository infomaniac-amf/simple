var User = function (params) {
    // call super
    Model.call(this, params);

    console.log('new user instance');
};

User.prototype = new Model();
User.prototype.constructor = User;
User.prototype._classMapping = 'Simple\\User';
User.prototype.properties = {
    firstName: null,
    lastName: null,
    emailAddress: null,
    password: null,
    spamMe: false,
    gender: null,

    siblings: []
};

AMF.registerClassAlias('Simple\\User', User);