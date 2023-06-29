var uniqid = require("uniqid");
const states = require("../utils/states.json");

console.log(states);

class RandomID {

    generateID(state, city) {
        var code;
        var cityInit = city.substring(0, 2).toUpperCase();
        for(var ele of states) {
            if(ele.name === state) {
                code = ele.code;
            }
        }
        return uniqid(code + cityInit + "-");
    }
}

module.exports = RandomID;