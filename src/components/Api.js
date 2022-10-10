export const loginPayload = props => ({
  request: {
    url: "api/v2/login",
    headers: {
      Authorization: props.credential
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
