export interface ILoginResponse {
  data?: {
    client_id: string;
    email: string;
    sl_token: string;
  }
  meta: {
    request_id: string;
  }
  error?: {
    message: string;
  }
}

export interface IPostsRequest {
  slToken: string,
  page: number
}
