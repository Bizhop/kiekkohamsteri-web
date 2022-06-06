import axios from 'axios'
import { prop } from 'ramda'
import { mergeLeft } from 'ramda'

export const loginPayload = props => ({
  request: {
    url: "api/auth/login",
    headers: {
      Authorization: props.tokenId
    }
  }
})

export const getPayload = props => ({
  request: {
    url: props.url,
    headers: {
      Authorization: localStorage.getItem('hamsteri-token')
    }
  }
})

export const patchPayload = props => ({
  request: {
    url: props.url,
    method: 'patch',
    data: props.data,
    headers: {
      Authorization: localStorage.getItem('hamsteri-token')
    }
  }
})

export const putPayload = props => ({
  request: {
    url: props.url,
    method: 'put',
    data: props.data,
    headers: {
      Authorization: localStorage.getItem('hamsteri-token')
    }
  }
})

export const postPayload = props => ({
  request: {
    url: props.url,
    method: 'post',
    data: props.data,
    headers: {
      Authorization: localStorage.getItem('hamsteri-token')
    }
  }
})

export const deletePayload = props => ({
  request: {
    url: props.url,
    method: 'delete',
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