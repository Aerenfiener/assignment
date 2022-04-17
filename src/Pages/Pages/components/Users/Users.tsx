import React, { useEffect, useState } from 'react';
import { User } from './User/User';
import { IShownUser } from '../../../../Domains/Posts';
import { SearchString } from '../../../../Components/SearchString/SearchString';
import './Users.scss';

export function Users({ users, selectUser, selectedUser }:
                        { users: IShownUser[], selectUser: (id: string) => void, selectedUser: string }) {
  const [shownUsers, setShownUsers] = useState<IShownUser[]>();
  const [searchString, setSearchString] = useState<string>();

  const searchUsersString = async (searchString: string) => {
    await setSearchString(searchString);
    await setShownUsers(users?.filter((item: IShownUser) =>
      item.name.toLowerCase().includes(searchString.toLowerCase().trim())) ?? []
    );
  }

  useEffect(() => {
    searchUsersString(searchString || '');
    setShownUsers(users?.sort(
      (item, item2) => item.name < item2.name ? -1 : 1
    ));
  }, [users])

  return(
    <div className="users">
      <div className="users__search-string">
        <SearchString search={searchUsersString}/>
      </div>
      {
        shownUsers?.length
          ? shownUsers?.map((user: IShownUser) => {
            return <div className={`users__block ${selectedUser === user.id ? 'users__block-selected' : ''}`}
            key={user.id}
            onClick={() => selectUser(user.id)}
            >
            <User user={user} />
            </div>;
          })
          : <div className="description">No users found</div>
      }


    </div>
  )
}
