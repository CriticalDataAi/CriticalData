import { api } from "./configs/axiosConfig"
import { defineCancelApiObject } from "./configs/axiosUtils"

export const TrainingStatementAPI = {
  get: async function (id, cancel = false) {
    const response = await api.request({
      url: `/training-statements/${id}`,
      method: "GET",
      signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  getAll: async function (cancel = false) {
    const response = await api.request({
      url: "/training-statements/",
      method: "GET",
      signal: cancel ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  search: async function (name, cancel = false) {
    const response = await api.request({
      url: "/training-statements",
      method: "GET",
      params: {
        name: name,
      },
      signal: cancel ? cancelApiObject[this.search.name].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },
  create: async function (trainingStatement, cancel = false) {
    const response = await api.request({
      url: `/training-statements`,
      method: "POST",
      data: trainingStatement,
      signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
    });
    
    return response;
  },
  edit: async function (id, trainingStatement, cancel = false) {
    const response = await api.request({
      url: `/training-statements/${id}`,
      method: "PUT",
      data: trainingStatement,
      signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
    });
    
    return response;
  },
  delete: async function (id, cancel = false) {
    const response = await api.request({
      url: `/training-statements/${id}`,
      method: "DELETE",
      signal: cancel ? cancelApiObject[this.create.name].handleRequestCancellation().signal : undefined,
    });
    
    return response;
  },
}

const cancelApiObject = defineCancelApiObject(TrainingStatementAPI)