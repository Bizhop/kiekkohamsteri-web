import axios from 'axios'
import { mergeLeft } from 'ramda'

export const getPayload = params => ({
  request: {
    url: params.url,
    headers: {
      Authorization: localStorage.getItem('hamsteri-token')
    }
  }
})

export const loginPayload = params => ({
  request: {
    url: "api/auth/login",
    headers: {
      Authorization: params.tokenId
    }
  }
})

export const patchPayload = params => ({
  request: {
    url: params.url,
    method: 'patch',
    data: params.data,
    headers: {
      Authorization: localStorage.getItem('hamsteri-token')
    }
  }
})

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
