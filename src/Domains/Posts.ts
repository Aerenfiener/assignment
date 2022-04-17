export interface IPost {
  created_time: string,
  from_id: string,
  from_name: string,
  id: string,
  message: string,
  type: string,
}

export interface IUsersPosts {
  id: string,
  name: string,
  posts: IPost[],
}

export interface IShownUser {
  id: string,
  name: string,
  postsCount: number,
}

export enum SortEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}
