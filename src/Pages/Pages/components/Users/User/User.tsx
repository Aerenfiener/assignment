import React  from 'react';
import { IShownUser } from '../../../../../Domains/Posts';
import './User.scss';

export function User(
  { user }: {
    user: IShownUser,
  }) {
  return(
    <div className="user">
      <div>
        { user.name }
      </div>
      <div>
        { user.postsCount }
      </div>
    </div>
  )
}
