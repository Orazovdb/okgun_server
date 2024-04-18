import { request } from "./generic.api";

export const GET_SLIDER = () =>
  request({ url: `/client/user/get-slider`, method: "GET" });

export const GET_CATALOG = () =>
  request({ url: `/client/user/get-catalog`, method: "GET" });
export const GET_SERVICES = () =>
  request({ url: `/client/user/get-service`, method: "GET" });
export const GET_CATEGORIES = () =>
  request({ url: `/client/user/get-category`, method: "GET" });
export const GET_ABOUTUS = () =>
  request({ url: `/client/user/get-about`, method: "GET" });
export const GET_CATEGORIES_PRODUCTS = ({ params }) =>
  request({
    url: `/client/user/product-get-by-id`,
    method: "GET",
    params: params,
  });
export const CONTACT_ADD = ({ data }) =>
  request({ url: `/admin/contact/add`, method: "POST", data: data });
export const GET_VACANCY = ({ params }) =>
  request({
    url: `/client/user/get-job`,
    params,
    method: "GET",
  });
export const GET_PRODUCT = ({ data }) =>
  request({
    url: `/client/user/product-get-by-id?l=${data.limit}&p=${data.page}&id=${data.uuid}`,
    method: "GET",
  });

export const GET_PRODUCT_NEW = ({ data }) =>
  request({
    url: `/client/user/get-new?l=${data.limit}&p=${data.page}`,
    method: "GET",
  });

export const GET_VACANCY_ALL = ({ params }) =>
  request({
    url: `/client/user/all-job`,
    params,
    method: "GET",
  });
