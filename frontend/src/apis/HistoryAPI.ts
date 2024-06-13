import { api } from "./configs/axiosConfig"
import { defineCancelApiObject } from "./configs/axiosUtils"
import getHeader from "./configs/axiosHeader"

export const HistoryAPI = {
  get: async function (id, cancel = false) {
    const response = await api.request({
      url: `/history/${id}`,
      method: "GET",
      headers: getHeader(),
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  getAll: async function (cancel = false) {
    const response = await api.request({
      url: "/history/",
      method: "GET",
      headers: getHeader(),
      signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  search: async function (name, cancel = false) {
    const response = await api.request({
      url: "/history",
      method: "GET",
      headers: getHeader(),
      params: {
        name: name,
      },
      signal: cancel ? cancelApiObject[this.search.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  create : function (){},
  edit : function (){},
  delete : function (){}
}

const cancelApiObject = defineCancelApiObject(HistoryAPI)