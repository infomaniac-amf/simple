var Sibling = function (params) {
    // call super
    Model.call(this, params);

    console.log('new sibling instance');
};

Sibling.prototype = new Model();
Sibling.prototype.constructor = Sibling;
Sibling.prototype._classMapping = 'Simple\\Sibling';
$.extend(Sibling.prototype, {
    name: null
});

AMF.registerClassAlias('Simple\\Sibling', Sibling);