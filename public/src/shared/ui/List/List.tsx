import React from 'react';
import { List as AntList, ListProps } from 'antd';

// Дженерик компонент для типизации
export function List<T>(props: ListProps<T>) {
  return <AntList<T> {...props} />;
}

List.Item = AntList.Item;
List.Item.Meta = AntList.Item.Meta;