import request from "./util.js";

export function listArticle(params) {
    return request({
        url: "/article",
        method: "get",
        params
    });
}

export function detailArticle(id) {
    return request({
        url: "/article/" + id,
        method: "get"
    });
}
