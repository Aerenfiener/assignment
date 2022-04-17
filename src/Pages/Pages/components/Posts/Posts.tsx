import React, { useEffect, useState } from 'react';
import { IPost, SortEnum } from '../../../../Domains/Posts';
import { Post } from './Post/Post';
import { SearchString } from '../../../../Components/SearchString/SearchString';
import { SortButtons } from './SortButtons/SortButtons';
import './Posts.scss';

export function Posts({ posts }: { posts: IPost[] }) {
  const [shownPosts, setShownPosts] = useState<IPost[]>();
  const [searchString, setSearchString] = useState<string>();
  const [selectedSort, setSelectedSort] = useState<SortEnum>();

  const searchPostsString = async (searchString: string) => {
    await setSearchString(searchString);
    await setShownPosts(posts?.filter((item: IPost) =>
      item.message.toLowerCase().includes(searchString.toLowerCase().trim())) ?? []
    );
  }

  const sortPosts = async (sort: SortEnum) => {
    setShownPosts(posts.sort(
      (item, item2) => (
        sort === SortEnum.ASC
        ? new Date(item.created_time).getTime() - new Date(item2.created_time).getTime()
        : new Date(item2.created_time).getTime() - new Date(item.created_time).getTime()
      )
    ));
    await setSelectedSort(sort);
  }

  useEffect(() => {
    searchPostsString(searchString || '');
    sortPosts(selectedSort || SortEnum.ASC);
  }, [posts])


  return(
    <div className="posts">
      <div className="posts__filter">
        <div className="posts__filter__search-string">
          <SearchString  search={searchPostsString}/>
        </div>
        <SortButtons selectedSort={selectedSort as SortEnum} sortPosts={sortPosts} />
      </div>
      {shownPosts?.length
        ? shownPosts?.map((post: IPost) => {
        return <div className="posts__block" key={post.id} >
                 <Post post={post}/>
               </div>
        })
        : <div className="description">No emails found</div>
      }
    </div>
  )
}
