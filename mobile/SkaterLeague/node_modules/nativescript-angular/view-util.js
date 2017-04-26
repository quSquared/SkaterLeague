var types_1 = require("utils/types");
var view_1 = require("ui/core/view");
var content_view_1 = require("ui/content-view");
var layout_base_1 = require("ui/layouts/layout-base");
var element_registry_1 = require("./element-registry");
var special_properties_1 = require("ui/builder/special-properties");
var style_property_1 = require("ui/styling/style-property");
var dependency_observable_1 = require("ui/core/dependency-observable");
var platform_1 = require("platform");
var trace_1 = require("./trace");
var XML_ATTRIBUTES = Object.freeze(["style", "rows", "columns", "fontAttributes"]);
var ELEMENT_NODE_TYPE = 1;
var whiteSpaceSplitter = /\s+/;
function isView(view) {
    return view instanceof view_1.View;
}
exports.isView = isView;
function isLayout(view) {
    return view instanceof layout_base_1.LayoutBase;
}
exports.isLayout = isLayout;
function isContentView(view) {
    return view instanceof content_view_1.ContentView;
}
exports.isContentView = isContentView;
var propertyMaps = new Map();
var ViewUtil = (function () {
    function ViewUtil(device) {
        this.isIos = device.os === platform_1.platformNames.ios;
        this.isAndroid = device.os === platform_1.platformNames.android;
    }
    ViewUtil.prototype.insertChild = function (parent, child, atIndex) {
        if (atIndex === void 0) { atIndex = -1; }
        if (!parent || child.meta.skipAddToDom) {
            return;
        }
        if (parent.meta && parent.meta.insertChild) {
            parent.meta.insertChild(parent, child, atIndex);
        }
        else if (isLayout(parent)) {
            if (child.parent === parent) {
                var index = parent.getChildIndex(child);
                if (index !== -1) {
                    parent.removeChild(child);
                }
            }
            if (atIndex !== -1) {
                parent.insertChild(child, atIndex);
            }
            else {
                parent.addChild(child);
            }
        }
        else if (isContentView(parent)) {
            // Explicit handling of template anchors inside ContentView
            if (child.nodeName === "#comment") {
                parent._addView(child, atIndex);
            }
            else {
                parent.content = child;
            }
        }
        else if (parent && parent._addChildFromBuilder) {
            parent._addChildFromBuilder(child.nodeName, child);
        }
        else {
        }
    };
    ViewUtil.prototype.removeChild = function (parent, child) {
        if (!parent || child.meta.skipAddToDom) {
            return;
        }
        if (parent.meta && parent.meta.removeChild) {
            parent.meta.removeChild(parent, child);
        }
        else if (isLayout(parent)) {
            parent.removeChild(child);
        }
        else if (isContentView(parent)) {
            if (parent.content === child) {
                parent.content = null;
            }
            // Explicit handling of template anchors inside ContentView
            if (child.nodeName === "#comment") {
                parent._removeView(child);
            }
        }
        else if (isView(parent)) {
            parent._removeView(child);
        }
        else {
        }
    };
    ViewUtil.prototype.getChildIndex = function (parent, child) {
        if (isLayout(parent)) {
            return parent.getChildIndex(child);
        }
        else if (isContentView(parent)) {
            return child === parent.content ? 0 : -1;
        }
        else {
        }
    };
    ViewUtil.prototype.createComment = function () {
        var commentView = this.createView("Comment");
        commentView.nodeName = "#comment";
        commentView.visibility = "collapse";
        return commentView;
    };
    ViewUtil.prototype.createText = function () {
        var detachedText = this.createView("DetachedText");
        detachedText.nodeName = "#text";
        detachedText.visibility = "collapse";
        return detachedText;
    };
    ViewUtil.prototype.createView = function (name) {
        trace_1.rendererLog("Creating view: " + name);
        if (!element_registry_1.isKnownView(name)) {
            name = "ProxyViewContainer";
        }
        var viewClass = element_registry_1.getViewClass(name);
        var view = new viewClass();
        view.nodeName = name;
        view.meta = element_registry_1.getViewMeta(name);
        // we're setting the node type of the view
        // to 'element' because of checks done in the
        // dom animation engine:
        // tslint:disable-next-line:max-line-length
        // https://github.com/angular/angular/blob/master/packages/animations/browser/src/render/dom_animation_engine.ts#L70-L81
        view.nodeType = ELEMENT_NODE_TYPE;
        return view;
    };
    ViewUtil.prototype.setProperty = function (view, attributeName, value, namespace) {
        if (namespace && !this.runsIn(namespace)) {
            return;
        }
        if (attributeName.indexOf(".") !== -1) {
            // Handle nested properties
            var properties = attributeName.split(".");
            attributeName = properties[properties.length - 1];
            var propMap = this.getProperties(view);
            var i = 0;
            while (i < properties.length - 1 && types_1.isDefined(view)) {
                var prop = properties[i];
                if (propMap.has(prop)) {
                    prop = propMap.get(prop);
                }
                view = view[prop];
                propMap = this.getProperties(view);
                i++;
            }
        }
        if (types_1.isDefined(view)) {
            this.setPropertyInternal(view, attributeName, value);
        }
    };
    // finds the node in the parent's views and returns the next index
    // returns -1 if the node has no parent or next sibling
    ViewUtil.prototype.nextSiblingIndex = function (node) {
        var parent = node.parent;
        if (!parent) {
            return -1;
        }
        var index = 0;
        var found = false;
        parent._eachChildView(function (child) {
            if (child === node) {
                found = true;
            }
            index += 1;
            return !found;
        });
        return found ? index : -1;
    };
    ViewUtil.prototype.runsIn = function (platform) {
        return (platform === "ios" && this.isIos) ||
            (platform === "android" && this.isAndroid);
    };
    ViewUtil.prototype.setPropertyInternal = function (view, attributeName, value) {
        trace_1.rendererLog("Setting attribute: " + attributeName);
        var specialSetter = special_properties_1.getSpecialPropertySetter(attributeName);
        var propMap = this.getProperties(view);
        if (attributeName === "class") {
            this.setClasses(view, value);
        }
        else if (XML_ATTRIBUTES.indexOf(attributeName) !== -1) {
            view._applyXmlAttribute(attributeName, value);
        }
        else if (specialSetter) {
            specialSetter(view, value);
        }
        else if (propMap.has(attributeName)) {
            // We have a lower-upper case mapped property.
            var propertyName = propMap.get(attributeName);
            view[propertyName] = this.convertValue(value);
        }
        else {
            // Unknown attribute value -- just set it to our object as is.
            view[attributeName] = this.convertValue(value);
        }
    };
    ViewUtil.prototype.convertValue = function (value) {
        if (typeof (value) !== "string" || value === "") {
            return value;
        }
        var valueAsNumber = +value;
        if (!isNaN(valueAsNumber)) {
            return valueAsNumber;
        }
        else if (value && (value.toLowerCase() === "true" || value.toLowerCase() === "false")) {
            return value.toLowerCase() === "true" ? true : false;
        }
        else {
            return value;
        }
    };
    ViewUtil.prototype.getProperties = function (instance) {
        var type = instance && instance.constructor;
        if (!type) {
            return new Map();
        }
        if (!propertyMaps.has(type)) {
            var propMap = new Map();
            for (var propName in instance) {
                propMap.set(propName.toLowerCase(), propName);
            }
            propertyMaps.set(type, propMap);
        }
        return propertyMaps.get(type);
    };
    ViewUtil.prototype.cssClasses = function (view) {
        if (!view.ngCssClasses) {
            view.ngCssClasses = new Map();
        }
        return view.ngCssClasses;
    };
    ViewUtil.prototype.addClass = function (view, className) {
        this.cssClasses(view).set(className, true);
        this.syncClasses(view);
    };
    ViewUtil.prototype.removeClass = function (view, className) {
        this.cssClasses(view).delete(className);
        this.syncClasses(view);
    };
    ViewUtil.prototype.setClasses = function (view, classesValue) {
        var _this = this;
        var classes = classesValue.split(whiteSpaceSplitter);
        this.cssClasses(view).clear();
        classes.forEach(function (className) { return _this.cssClasses(view).set(className, true); });
        this.syncClasses(view);
    };
    ViewUtil.prototype.syncClasses = function (view) {
        var classValue = Array.from(this.cssClasses(view).keys()).join(" ");
        view.cssClass = classValue;
    };
    ViewUtil.prototype.setStyle = function (view, styleName, value) {
        trace_1.rendererLog("Set style: " + styleName + " with value: " + value + " to view: " + view);
        this.setStyleProperty(view, styleName, value);
    };
    ViewUtil.prototype.removeStyle = function (view, styleName) {
        trace_1.rendererLog("Remove style: " + styleName + " from view: " + view);
        this.setStyleProperty(view, styleName);
    };
    ViewUtil.prototype.setStyleProperty = function (view, styleName, styleValue) {
        var _this = this;
        trace_1.rendererLog("setStyleProperty: " + styleName + " = " + styleValue);
        var name = styleName;
        var resolvedValue = this.resolveCssValue(styleValue);
        style_property_1.withStyleProperty(name, resolvedValue, function (property, value) {
            if (types_1.isString(property)) {
                // Fall back to resolving property by name.
                var resolvedProperty = style_property_1.getPropertyByName(name);
                if (resolvedProperty) {
                    _this.setStyleValue(view, resolvedProperty, resolvedValue);
                }
                else {
                    trace_1.rendererLog("Unknown style property: " + styleName);
                }
            }
            else {
                var resolvedProperty = property;
                _this.setStyleValue(view, resolvedProperty, value);
            }
        });
    };
    ViewUtil.prototype.resolveCssValue = function (styleValue) {
        return styleValue;
    };
    ViewUtil.prototype.setStyleValue = function (view, property, value) {
        try {
            if (!!value) {
                view.style._setValue(property, value, dependency_observable_1.ValueSource.Local);
            }
            else {
                view.style._resetValue(property, dependency_observable_1.ValueSource.Local);
            }
        }
        catch (ex) {
            trace_1.styleError("Error setting property: " + property.name + " view: " + view +
                " value: " + value + " " + ex);
        }
    };
    return ViewUtil;
}());
exports.ViewUtil = ViewUtil;
//# sourceMappingURL=view-util.js.map