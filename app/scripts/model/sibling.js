var Sibling = function (params) {
    // call super
    Model.call(this, params);

    console.log('new sibling instance');
};

Sibling.prototype = new Model();
Sibling.prototype.constructor = Sibling;
Sibling.prototype._classMapping = 'Simple\\Sibling';
Sibling.prototype.properties = {
    name: null,
    user: null
};

AMF.registerClassAlias('Simple\\Sibling', Sibling);