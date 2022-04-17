import React from 'react';
import { IPost } from '../../../../../Domains/Posts';
import './Post.scss';

export function Post({ post }: { post: IPost }) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };
  const createdTime  = new Date(post.created_time).toLocaleDateString("en-US", options);


  return(
    <div className="post">
      <div className="post__date">
        { createdTime }
      </div>
      <div>
        { post.message }
      </div>
    </div>
  )
}
