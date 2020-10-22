import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  useContext,
  useReducer,
} from 'react';
import { Row, Col, Input, Card } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import UndoList from './Undo';
import DoneList from './Done';

export interface TodoItem {
  key: string;
  value: string;
  done: boolean;
}

export default () => {
  const [todoValue, setTodoValue] = useState('');
  const [listData, setListData] = useState<TodoItem[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('handleInputChange');
    const { value } = e.target as HTMLInputElement;
    if (value !== '') {
      setTodoValue(value);
    }
  };

  const addTodo = () => {
    console.log('addTodo');
    if (todoValue !== '') {
      setTodoValue('');
      const key = uuidv4();
      const newTodo = {
        key,
        value: todoValue,
        done: false,
      };
      setListData([...listData, { ...newTodo }]);
    }
  };

  const finishTodo = (key: string) => {
    console.log('执行finishTodo');
    const newListData = [...listData];
    const index = newListData.findIndex(item => item.key === key);
    newListData.splice(index, 1, {
      ...newListData[index],
      done: true,
    });
    setListData(newListData);
  };

  const deleteDoneTodo = () => {
    console.log('执行deleteDoneTodo');
    const newListData = listData.filter(item => !item.done);
    setListData(newListData);
  };

  const hasDoneItem = () => {
    console.log('计算hasDoneItem');
    return listData.some(item => item.done);
  };

  const undoList = () => {
    console.log('计算undoList');
    return listData.filter(item => !item.done);
  };

  const doneList = () => {
    console.log('计算doneList');
    return listData.filter(item => {
      return item.done;
    });
  };
  // const doneList = listData.filter((item) => {
  //   console.log("计算doneList");
  //   return item.done;
  // });

  // const memoDoneList = useMemo(() => {
  //   console.log('计算doneList');
  //   return listData.filter(item => {
  //     return item.done;
  //   });
  // }, [listData]);

  return (
    <Row>
      <Col span={12} offset={6}>
        <Card
          title={
            <Input
              value={todoValue}
              placeholder="请输入事项"
              onChange={handleInputChange}
              onPressEnter={addTodo}
            />
          }
        >
          <UndoList listData={undoList()} finishTodo={finishTodo} />
        </Card>
        {hasDoneItem() && (
          <DoneList listData={doneList()} deleteDoneTodo={deleteDoneTodo} />
        )}
      </Col>
    </Row>
  );
};
