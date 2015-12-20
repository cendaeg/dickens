var nconf = require('nconf');
nconf.file(process.env.PWD+"/config/config.json");
module.exports = {
    set: function(key, value) {
        nconf.set("appSettings:"+key, value);
        nconf.save(function(err) {
            console.log(err);
            if(err) throw err;
        });
    },
    get: function(key) {
        return nconf.get("appSettings:"+key);
    }
}
