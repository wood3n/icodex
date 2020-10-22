import React, { useEffect, useMemo } from 'react';
import { Space, Typography, List, Collapse, Button, Tag } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { TodoItem } from '@/App';

interface Props {
  listData: TodoItem[];
  deleteDoneTodo: () => void;
}

const { Text } = Typography;
const { Panel } = Collapse;
const DoneList: React.FC<Props> = ({ listData, deleteDoneTodo }) => {
  console.log('done更新');
  return (
    <Collapse>
      <Panel
        extra={
          <Button type="link" onClick={deleteDoneTodo}>
            清空
          </Button>
        }
        key={1}
        header="已完成"
      >
        <List>
          {listData.map(
            data =>
              data.done && (
                <List.Item key={data.key}>
                  <Space>
                    <Tag color="green">
                      <CheckOutlined />
                    </Tag>
                    <Text delete>{data.value}</Text>
                  </Space>
                </List.Item>
              ),
          )}
        </List>
      </Panel>
    </Collapse>
  );
};

export default DoneList;
