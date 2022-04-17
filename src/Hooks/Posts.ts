import { useState } from 'react';
import { fetchPosts } from '../Services/Assignment.service';
import { useNavigate } from 'react-router-dom';
import useToken from './Token';
import { IUsersPosts, IPost, IShownUser } from '../Domains/Posts';

export default function usePosts() {
  const navigate = useNavigate();
  const { token, removeToken } = useToken();

  const getPosts = async (page = 1): Promise<void> => {
    try {
      const currentPosts = await fetchPosts({ slToken: token, page });
      setPosts(currentPosts);

      const key = 'from_id';
      const currentUsers: IPost[] = [...new Map(currentPosts.map((item: IPost) =>
      [item[key], item])).values()] as IPost[];

      const currentUsersPosts = currentUsers.map((item: IPost) => ({
        id: item.from_id,
        name: item.from_name,
        posts: currentPosts.filter((post: IPost) => post.from_id === item.from_id) as IPost[],
      }));
      setUsersPosts(currentUsersPosts);
      setUsers(
        currentUsersPosts
          .map((item) => ({
            id: item.id,
            name: item.name as string,
            postsCount: item.posts.length as number
          })),
      );
    } catch (e) {
      if (e instanceof Error) {
        if (e?.message === 'Invalid SL Token') {
          removeToken();
          navigate('../login', { replace: true });
        }
      }
    }
  };

  const [posts, setPosts] = useState<IPost[]>();
  const [users, setUsers] = useState<IShownUser[]>();
  const [usersPosts, setUsersPosts] = useState<IUsersPosts[]>();

  return {
    getPosts,
    posts,
    users,
    usersPosts,
  }
}
