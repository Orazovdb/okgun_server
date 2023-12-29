import { request } from "./generic.api";

export const ADD_FILE = ({ data }) =>
  request({ url: `/admin/product/add-file`, data, file: true, method: "post" });

export const LOGIN = ({ data }) =>
  request({ url: `/admin/login`, data, method: "post" });

export const ADD_SLIDER = ({ data }) =>
  request({ url: `/admin/slider/add`, data, file: true, method: "post" });
export const DELETE_SLIDER = ({ data }) =>
  request({ url: `/admin/slider/delete`, data, method: "post" });
export const GET_SLIDER = () =>
  request({ url: `/admin/slider/get`, method: "GET" });

export const ADD_PARTNER = ({ data }) =>
  request({ url: `/admin/service/add`, data, method: "post" });
export const GET_PARTNERS = () =>
  request({ url: `/admin/service/get`, method: "GET" });
export const DELETE_PARTNER = ({ data }) =>
  request({ url: `/admin/service/delete`, data, method: "post" });

export const ADD_JOBS = ({ data }) =>
  request({ url: `/admin/jobs/add`, data, method: "post" });
export const GET_JOBS = ({ params }) =>
  request({
    url: `/admin/jobs/get?l=${params.limit}&p=${params.page}`,
    method: "GET",
  });
export const DELETE_JOB = ({ data }) =>
  request({ url: `/admin/jobs/delete`, data, method: "post" });
export const GET_JOBS_VELAYATS = () =>
  request({
    url: `/admin/jobs/all-wel`,
    method: "get",
  });

export const ADD_ABOUT = ({ data }) =>
  request({ url: `/admin/about/add`, data, method: "post" });
export const GET_ABOUT = () =>
  request({ url: `/admin/about/get`, method: "GET" });

export const ADD_CATEGORY = ({ data }) =>
  request({
    url: `/admin/product/add-category`,

    data,
    method: "post",
  });
export const GET_CATEGORY = () =>
  request({ url: `/admin/product/get-category`, method: "GET" });
export const DELETE_CATEGORY = ({ data }) =>
  request({ url: `/admin/product/delete-category`, data, method: "post" });

export const ADD_PRODUCT = ({ data }) =>
  request({ url: `/admin/product/add`, data, method: "post" });
export const GET_PRODUCT = ({ data }) =>
  request({
    url: `/admin/product/get-by-id?l=${data.limit}&p=${data.page}&id=${data.uuid}`,
    method: "GET",
  });
export const DELETE_PRODUCT = ({ data }) =>
  request({ url: `/admin/product/delete`, data, method: "post" });

export const ADD_CATALOG = ({ data }) =>
  request({ url: `/admin/catalog/add`, data, method: "post" });
export const GET_CATALOG = () =>
  request({ url: `/admin/catalog/get`, method: "GET" });
export const DELETE_CATALOG = ({ data }) =>
  request({ url: `/admin/catalog/delete`, data, method: "post" });

export const GET_PRODUCT_NEW = ({ data }) =>
  request({
    url: `/admin/product/get-product?l=${data.limit}&p=${data.page}`,
    method: "GET",
  });
export const ADD_PRODUCT_NEW = ({ data }) =>
  request({ url: `/admin/product/add-new`, data, method: "post" });
export const DELETE_PRODUCT_NEW = ({ data }) =>
  request({ url: `/admin/product/delete-new`, data, method: "post" });
