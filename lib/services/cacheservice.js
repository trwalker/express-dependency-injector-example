'use strict'

var CacheService = function() {
};

var getCacheItem = function(namespace, key) {
  var cacheNamespace = getCacheNamespace(namespace);
  return cacheNamespace[key];
};

var setCacheItem = function(namespace, key, value) {
  var cacheNamespace = getCacheNamespace(namespace);
  cacheNamespace[key] = value;
};

var getCacheNamespace = function(namespace) {
  if(!global.cacheService) {
    global.cacheService = {};
  }

  var cacheNamespace = global.cacheService;

  var parts = namespace.split('.');

  for(var i = 0; i < parts.length; i++) {
    var currentPart = parts[i];
    if(currentPart.length > 0) {
      cacheNamespace[currentPart] = cacheNamespace[currentPart] || {};
      cacheNamespace = cacheNamespace[currentPart];
    }
  }

  return cacheNamespace;
};

CacheService.prototype = {
  get: getCacheItem,
  set: setCacheItem
};

module.exports = CacheService;
