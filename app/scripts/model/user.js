var User = function (params) {
    // call super
    Model.call(this, params);

    console.log('new user instance');
};

User.prototype = new Model();
User.prototype.constructor = User;
User.prototype._classMapping = 'Simple\\User';

$.extend(User.prototype, {
    firstName: null,
    lastName: null,
    emailAddress: null,
    password: null,
    spamMe: false,
    gender: null
});

AMF.registerClassAlias('Simple\\User', User);