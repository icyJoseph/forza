import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

// Mock localStorage
const localStorageMock = (function() {
  let store = {};
  return {
    getItem: function(key) {
      return store[key] || null;
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    removeItem: function(key) {
      delete store[key];
    },
    clear: function() {
      store = {};
    }
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock
});

// Mock Share
const shareMock = (function() {
  return {
    share: function(data) {
      return new Promise(resolve => resolve(data));
    }
  };
})();

Object.defineProperty(window, "navigator", {
  value: shareMock
});

// Mock matchMedia
const matchMediaMock = function() {
  return {
    matchMedia: function(query) {
      return {
        matches: query => !query
      };
    },
    addListener: function() {}
  };
};

Object.defineProperty(window, "matchMedia", {
  value: matchMediaMock
});
