import React from 'react';
import { Input } from '../Input/Input';
import { ReactComponent as Search } from '../../Assets/search.svg';
import './SearchString.scss';

export function SearchString({ search }: { search: (searchString: string) => void }) {
  return (
    <div className="search-string">
      <Input changeValue={e => search(e.target.value)} />
      <div className="search-string__icon">
        <Search />
      </div>
    </div>
  )
}
