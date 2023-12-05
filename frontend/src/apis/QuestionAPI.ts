import { api } from "./configs/axiosConfig"
import { defineCancelApiObject } from "./configs/axiosUtils"

export const QuestionAPI = {
  search: async function (question, cancel = false) {
    const response = await api.request({
      url: "/questions",
      method: "GET",
      params: {
        question: question,
      },
      signal: cancel ? cancelApiObject[this.search.question].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },

}

const cancelApiObject = defineCancelApiObject(QuestionAPI)