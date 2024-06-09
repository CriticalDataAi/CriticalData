import { api } from "./configs/axiosConfig"
import { defineCancelApiObject } from "./configs/axiosUtils"
import getHeader from "./configs/axiosHeader"

export const DataSourceAPI = {
  get: async function (id, cancel = false) {
    const response = await api.request({
      url: `/data-sources/${id}`,
      method: "GET",
      headers: getHeader(),
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  getAll: async function (cancel = false) {
    const response = await api.request({
      url: "/data-sources/",
      method: "GET",
      headers: getHeader(),
      signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  search: async function (name, cancel = false) {
    const response = await api.request({
      url: "/data-sources",
      method: "GET",
      headers: getHeader(),
      params: {
        name: name,
      },
      signal: cancel ? cancelApiObject[this.search.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  create: async function (dataSource, cancel = false) {
    const response = await api.request({
      url: `/data-sources`,
      method: "POST",
      headers: getHeader(),
      data: dataSource,
      signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
    });
    
    return response;
  },
  edit: async function (id, dataSource, cancel = false) {
    const response = await api.request({
      url: `/data-sources/${id}`,
      method: "PUT",
      headers: getHeader(),
      data: dataSource,
      signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
    });
    
    return response;
  },
  delete: async function (id, cancel = false) {
    const response = await api.request({
      url: `/data-sources/${id}`,
      method: "DELETE",
      headers: getHeader(),
      signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
    });
    
    return response;
  },
}

const cancelApiObject = defineCancelApiObject(DataSourceAPI)