import MButton from "./components/button/index.js";
import MInput from "./components/input/index.js";
import MTextarea from "./components/textarea/index.js";
import MIcon from "./components/icons/index.js";

const components = [
    MButton,
    MInput,
    MTextarea,
    MIcon
];

const install = function(Vue) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });

    const requireAll = requireContext => requireContext.keys().map(requireContext);
    const req = require.context('./components/icons/src/svgs', false, /\.svg$/);
    requireAll(req);
};

if (typeof window !== "undefined" && window.Vue) {
    install(window.Vue);
}

export default {
    install,
    MButton,
    MInput,
    MTextarea,
    MIcon
};
