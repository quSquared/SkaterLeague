var animations_1 = require("@angular/animations");
var types_1 = require("utils/types");
var dependency_observable_1 = require("ui/core/dependency-observable");
var style_property_1 = require("ui/styling/style-property");
var trace_1 = require("../trace");
// overriden to use the default 'unsetValue'
// instead of empty string ''
function eraseStylesOverride(element, styles) {
    if (element["style"]) {
        Object.keys(styles).forEach(function (prop) { return setStyleProperty(element, prop, styles[prop]); });
    }
}
exports.eraseStylesOverride = eraseStylesOverride;
function cssClasses(element) {
    if (!element.ngCssClasses) {
        element.ngCssClasses = new Map();
    }
    return element.ngCssClasses;
}
exports.cssClasses = cssClasses;
// The following functions are from
// the original DomAnimationEngine
function getOrSetAsInMap(map, key, defaultValue) {
    var value = map.get(key);
    if (!value) {
        map.set(key, value = defaultValue);
    }
    return value;
}
exports.getOrSetAsInMap = getOrSetAsInMap;
function deleteFromArrayMap(map, key, value) {
    var arr = map.get(key);
    if (arr) {
        var index = arr.indexOf(value);
        if (index >= 0) {
            arr.splice(index, 1);
            if (arr.length === 0) {
                map.delete(key);
            }
        }
    }
}
exports.deleteFromArrayMap = deleteFromArrayMap;
function optimizeGroupPlayer(players) {
    switch (players.length) {
        case 0:
            return new animations_1.NoopAnimationPlayer();
        case 1:
            return players[0];
        default:
            return new animations_1.ɵAnimationGroupPlayer(players);
    }
}
exports.optimizeGroupPlayer = optimizeGroupPlayer;
function copyArray(source) {
    return source ? source.splice(0) : [];
}
exports.copyArray = copyArray;
function makeAnimationEvent(element, triggerName, fromState, toState, phaseName, totalTime) {
    return { element: element, triggerName: triggerName, fromState: fromState, toState: toState, phaseName: phaseName, totalTime: totalTime };
}
exports.makeAnimationEvent = makeAnimationEvent;
function setStyles(element, styles) {
    if (element["style"]) {
        Object.keys(styles).forEach(function (prop) { return setStyleProperty(element, prop, styles[prop]); });
    }
}
exports.setStyles = setStyles;
// utils for accessing NativeScript element's styles
function setStyleProperty(element, name, value) {
    style_property_1.withStyleProperty(name, value, function (property, resolvedValue) {
        if (types_1.isString(property)) {
            // Fallback to resolving property by name.
            var resolvedProperty = style_property_1.getPropertyByName(name);
            if (resolvedProperty) {
                setStyleValue(element, resolvedProperty, resolvedValue);
            }
            else {
                trace_1.rendererLog("Unknown style property: " + property);
            }
        }
        else {
            var resolvedProperty = property;
            setStyleValue(element, resolvedProperty, value);
        }
    });
}
function setStyleValue(view, property, value) {
    try {
        if (value === null) {
            view.style._resetValue(property, dependency_observable_1.ValueSource.Local);
        }
        else {
            view.style._setValue(property, value, dependency_observable_1.ValueSource.Local);
        }
    }
    catch (ex) {
        trace_1.styleError("Error setting property: " + property.name + " view: " + view +
            " value: " + value + " " + ex);
    }
}
//# sourceMappingURL=dom-utils.js.map