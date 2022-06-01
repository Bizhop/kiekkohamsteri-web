import axios from 'axios'
import { mergeLeft } from 'ramda'

axios.defaults.baseURL=process.env.API_URL

const Api = {
  get(url, opts) {
    return axios
      .get(
        url,
        mergeLeft(
          {
            headers: { Authorization: localStorage.getItem('hamsteri-token') },
          },
          opts,
        ),
      )
      .then(res => res.data)
  },
  getRaw(url, opts) {
    return axios.get(url, opts).then(res => res.data)
  },
  post(url, data, opts) {
    return axios
      .post(
        url,
        data,
        mergeLeft(
          {
            headers: { Authorization: localStorage.getItem('hamsteri-token') },
          },
          opts,
        ),
      )
      .then(res => res.data)
  },
  put(url, data, opts) {
    return axios
      .put(
        url,
        data,
        mergeLeft(
          {
            headers: { Authorization: localStorage.getItem('hamsteri-token') },
          },
          opts,
        ),
      )
      .then(res => res.data)
  },
  patch(url, data, opts) {
    return axios
      .patch(
        url,
        data,
        mergeLeft(
          {
            headers: { Authorization: localStorage.getItem('hamsteri-token') },
          },
          opts,
        ),
      )
      .then(res => res.data)
  },
  delete(url, opts) {
    return axios.delete(
      url,
      mergeLeft(
        {
          headers: { Authorization: localStorage.getItem('hamsteri-token') },
        },
        opts,
      ),
    )
  },
}

export default Api
