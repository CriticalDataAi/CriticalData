import { api } from "./configs/axiosConfig"
import { defineCancelApiObject } from "./configs/axiosUtils"
import getHeader from "./configs/axiosHeader"

export const ParameterAPI = {
  getParameter: async function (parameter, cancel = false) {
    const response = await api.request({
      url: `/parameters/${parameter}`,
      method: "GET",
      headers: getHeader(),
      params: {
        parameter: parameter
      },
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  edit: async function (parameter, data, cancel = false) {
    const response = await api.request({
      url: `/parameters`,
      method: "PUT",
      headers: getHeader(),
      params: {
        parameter: parameter
      },
      data: data,
      signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
    });
    
    return response;
  },
}

const cancelApiObject = defineCancelApiObject(ParameterAPI)