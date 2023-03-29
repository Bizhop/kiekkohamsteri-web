import { IRequestPayload } from "../types"

export const loginPayload = props => ({
  request: {
    url: "api/v2/login",
    headers: {
      Authorization: props.credential,
    },
  },
})

export const loginPayloadTs = (credential?: string) => ({
  request: {
    url: "api/v2/login",
    headers: {
      Authorization: credential,
    },
  },
})

export const getPayloadTs = (url: string): IRequestPayload => ({
  request: {
    url,
    headers: {
      Authorization: localStorage.getItem("hamsteri-token"),
    },
  },
})

export const getPayload = props => ({
  request: {
    url: props.url,
    headers: {
      Authorization: localStorage.getItem("hamsteri-token"),
    },
  },
})

export const patchPayload = props => ({
  request: {
    url: props.url,
    method: "patch",
    data: props.data,
    headers: {
      Authorization: localStorage.getItem("hamsteri-token"),
    },
  },
})

export const patchPayloadTs = (url: string, data: unknown) => ({
  request: {
    url: url,
    method: "patch",
    data: data,
    headers: {
      Authorization: localStorage.getItem("hamsteri-token"),
    },
  },
})

export const putPayload = props => ({
  request: {
    url: props.url,
    method: "put",
    data: props.data,
    headers: {
      Authorization: localStorage.getItem("hamsteri-token"),
    },
  },
})

export const putPayloadTs = (url: string, data: unknown) => ({
  request: {
    url: url,
    method: "put",
    data: data,
    headers: {
      Authorization: localStorage.getItem("hamsteri-token"),
    },
  },
})

export const postPayload = props => ({
  request: {
    url: props.url,
    method: "post",
    data: props.data,
    headers: {
      Authorization: localStorage.getItem("hamsteri-token"),
    },
  },
})

export const postPayloadTs = (url: string, data: unknown): IRequestPayload => ({
  request: {
    url: url,
    method: "post",
    data: data,
    headers: {
      Authorization: localStorage.getItem("hamsteri-token"),
    },
  },
})

export const deletePayload = props => ({
  request: {
    url: props.url,
    method: "delete",
    headers: {
      Authorization: localStorage.getItem("hamsteri-token"),
    },
  },
})

export const deletePayloadTs = (url: string) => ({
  request: {
    url: url,
    method: "delete",
    headers: {
      Authorization: localStorage.getItem("hamsteri-token"),
    },
  },
})
