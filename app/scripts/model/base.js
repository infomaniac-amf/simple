var Model = function(data) {
    // constructor
    console.log('new model instance');

    this.importData(data);
};

Model.prototype = {
    properties: {},

    set: function(name, value) {
        if(!(name in this.properties)) {
            throw new Error('Undefined property: ' + name);
        }
        this.properties[name] = value;
    },

    get: function(name) {
        if(!(name in this.properties)) {
            throw new Error('Undefined property: ' + name);
        }

        return this.properties[name];
    },

    exportData: function() {
        return this.properties;
    },

    importData: function(data) {
        if(!data) {
            return;
        }

        for(var key in data) {
            var value = data[key];
            this.set(key, value);
        }
    }
};