import React, { useMemo, useContext } from 'react';
import { Space, Typography, List, Checkbox } from 'antd';
import { TodoItem } from '@/App';

interface Props {
  listData: TodoItem[];
  finishTodo: (key: string) => void;
}

export interface CompRef {
  func: () => void;
}

const { Text } = Typography;
const UndoList: React.FC<Props> = ({ listData, finishTodo }) => {
  const func = () => {
    console.log('func');
  };

  return (
    <List>
      {listData.map(data => (
        <List.Item key={data.key}>
          <Space>
            <Checkbox
              onChange={() => {
                finishTodo(data.key);
              }}
            ></Checkbox>
            <Text>{data.value}</Text>
          </Space>
        </List.Item>
      ))}
    </List>
  );
};

export default UndoList;
