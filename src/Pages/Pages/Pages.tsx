import React, { useEffect, useState } from 'react';
import usePosts from '../../Hooks/Posts';
import { useSearchParams } from 'react-router-dom';
import { Users } from './components/Users/Users';
import { Posts } from './components/Posts/Posts';
import { IShownUser, IUsersPosts } from '../../Domains/Posts';
import { Pagination } from './components/Pagination/Pagination';
import './Pages.scss';

export function Pages() {
  const { getPosts, posts, users, usersPosts } = usePosts();
  const [searchParams, setSearchParams] = useSearchParams(new URLSearchParams);
  const [user, setUser] = useState<string>();
  const [page, setPage] = useState<number>();

  const getParams = (params: any): {[key: string]: string} => {
    const resultParams: {[key: string]: string} = {};
    params.forEach((value: string, key: number) => {
      resultParams[key] = value;
    });

    return resultParams;
  }

  const selectUser = (id: string) => {
    setUser(id)
  }

  useEffect(() => {
    if (!page) return;
    const params = getParams(searchParams);
    params.page = String(page);
    setSearchParams(params);
    getPosts(page);
  }, [page])

  useEffect(() => {
    if (!user) return;
    const params = getParams(searchParams);
    params.user = user as string;
    setSearchParams(params)
  }, [user])

  useEffect(() => {
    if (!posts) {
      if (!searchParams.has('page')) {
        const params = getParams(searchParams);

        params.page = '1';

        setSearchParams(params)
      } else {
        getPosts(parseInt(searchParams.get('page') || '1', 10));
      }

      setPage(parseInt(searchParams.get('page') || '1', 10));
    }
  }, [searchParams]);

  useEffect(() => {
    if (users?.length && !users?.find((item: IShownUser) => item.id === user)) {
      setUser(users[0]?.id);
      return
    }

    if (searchParams.has('user') && !user) {
      setUser(searchParams.get('user') as string);
      return;
    }

    if (!user && users?.length) {
      setUser(users[0]?.id);
    }
  }, [searchParams, users])


  return (
    <div className="pages__wrapper">
      <div className="pages">
        <div className="pages__column">
          <Users users={users as IShownUser[]} selectUser={selectUser} selectedUser={user as string}/>
        </div>
        <div className="pages__column">
          <Posts posts={(usersPosts)?.find((item: IUsersPosts) => item.id === user)?.posts || []}/>
        </div>
      </div>
      <div className="pages__pagination">
        <Pagination selectPage={setPage} selectedPage={page as number} />
      </div>
    </div>
  )
}
