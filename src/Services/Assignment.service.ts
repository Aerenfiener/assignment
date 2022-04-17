import { IUser } from '../Domains/User';
import { BASE_API, CLIENT_ID } from '../Constants/Api.constants';
import { ILoginResponse, IPostsRequest } from '../Domains/Api/Assignment';

export async function login({ name, email }: IUser): Promise<string> {
    return await fetch( `${BASE_API}/assignment/register`, {
        method: 'POST',
        body: JSON.stringify({
            name,
            email,
            client_id: CLIENT_ID
        }),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response: Response ) => {
        return response.json();
    }).then((response: ILoginResponse) => {
        if (response.data) {
            return response?.data?.sl_token;
        }

        throw new Error(response?.error?.message)
    });
}

export async function fetchPosts({ slToken, page }: IPostsRequest): Promise<any> {
    return await fetch( `${BASE_API}/assignment/posts?sl_token=${slToken}&page=${page}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response: Response ) => {
        return response.json();
    }).then((response: any) => {
        if (response.data) {
            return response?.data?.posts;
        }

        throw new Error(response?.error?.message)
    });
}
