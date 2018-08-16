import MButton from "./components/button/index.js";
import MInput from "./components/input/index.js";

const components = [MButton, MInput];

const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

// module.exports = {
//     install,
//     MButton
// };

//module.exports.default = module.exports;
export default {
  install,
  MButton,
  MInput
};
