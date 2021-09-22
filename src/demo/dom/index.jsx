import React, { useEffect } from 'react';
import { Card, Tabs } from 'antd';

export default () => {
  useEffect(() => {
    document.getElementById('div1')?.addEventListener('click', () => {
      alert('在父元素div上触发');
    });

    document.getElementById('btn1')?.addEventListener('click', () => {
      alert('在子元素button上触发');
    });

    document.getElementById('div2')?.addEventListener(
      'click',
      () => {
        alert('在父元素div上触发');
      },
      true,
    );

    document.getElementById('btn2')?.addEventListener(
      'click',
      () => {
        alert('在子元素button上触发');
      },
      true,
    );
  }, []);

  return (
    <Card bordered={false}>
      <Tabs defaultActiveKey="1" destroyInactiveTabPane={false}>
        <Tabs.TabPane tab="useCapture: false" key="1" forceRender>
          <div id="div1">
            <button id="btn1">测试1</button>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="useCapture: true" key="2" forceRender>
          <div id="div2">
            <button id="btn2">测试2</button>
          </div>
        </Tabs.TabPane>
      </Tabs>
    </Card>
  );
};
