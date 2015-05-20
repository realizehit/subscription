

function Pattern ( pattern ) {
    Util.extend( this, pattern );
    this._string = pattern;
}

module.exports = Pattern;

Environment.prototype.valueOf =
Environment.prototype.toString = function () {
    return this._string;
};
