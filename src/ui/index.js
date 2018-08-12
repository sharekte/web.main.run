import MButton from "./components/button/index.js";

const components = [
    MButton
];

const install = function(Vue) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
};

if (typeof window !== "undefined" && window.Vue) {
    console('aaa')
    install(window.Vue);
}

// module.exports = {
//     install,
//     MButton
// };

//module.exports.default = module.exports;
export default {
    install,
    MButton
};
