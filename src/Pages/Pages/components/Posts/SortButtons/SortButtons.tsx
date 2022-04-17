import React from 'react';
import { SortEnum } from '../../../../../Domains/Posts';
import './SortButtons.scss';

export function SortButtons(
  { selectedSort, sortPosts }: { selectedSort: SortEnum, sortPosts: (sort: SortEnum) => void }
) {
  return(
    <div className="sort-buttons">
      <div
        className={
          `sort-buttons__button ${selectedSort === SortEnum.ASC ? 'sort-buttons__button-selected' : ''}`
        }
        onClick={() => sortPosts(SortEnum.ASC)}
      >
        ∨
      </div>
      <div
        className={
          `sort-buttons__button ${selectedSort === SortEnum.DESC ? 'sort-buttons__button-selected' : ''}`
        }
        onClick={() => sortPosts(SortEnum.DESC)}
      >
        ∧
      </div>
    </div>
  )
}
