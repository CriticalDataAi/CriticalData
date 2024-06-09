import { api } from "./configs/axiosConfig"
import { defineCancelApiObject } from "./configs/axiosUtils"
import getHeader from "./configs/axiosHeader"

export const QuestionAPI = {
  search: async function (question, cancel = false) {
    console.log(getHeader())
    const response = await api.request({
      url: "/questions",
      method: "GET",
      params: {
        question: question,
      },
      headers: getHeader(),
      signal: cancel ? cancelApiObject[this.search.question].handleRequestCancellation().signal : undefined,
    })

    return response.data
  },

}

const cancelApiObject = defineCancelApiObject(QuestionAPI)