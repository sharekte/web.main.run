import MIcon from "./src/Icon";

MIcon.install = function(Vue) {
    Vue.component(MIcon.name, MIcon);

    const requireAll = requireContext => requireContext.keys().map(requireContext);
    const req = require.context('./src/svgs', false, /\.svg$/);
    requireAll(req);
}

export default MIcon;
