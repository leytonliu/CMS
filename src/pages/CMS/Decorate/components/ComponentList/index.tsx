import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'antd';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from '@/utils/constants';

const boxStyle: React.CSSProperties = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '1rem 1rem',
  cursor: 'move',
};
const DragBox: React.FC<{
  name: string;
}> = ({ name }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: { name: name },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      console.log('dropResult', dropResult);
    },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
        handlerId: monitor.getHandlerId(),
      };
    },
  }));
  const opacity = isDragging ? 0.4 : 1;
  return (
    <Card ref={drag} style={{ ...boxStyle, opacity }} data-testid={`box`}>
      {name}
    </Card>
  );
};

const dustbinStyle: React.CSSProperties = {
  height: '12rem',
  width: '12rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
};

const Dustbin = () => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop: () => ({ name: 'Dustbin' }),
    collect: (monitor: any) => {
      console.log('DropMonitor', monitor);
      return {
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      };
    },
  }));
  const isActive = canDrop && isOver;
  let backgroundColor = '#222';
  if (isActive) {
    backgroundColor = 'darkgreen';
  } else if (canDrop) {
    backgroundColor = 'darkkhaki';
  }
  return (
    <div ref={drop} style={{ ...dustbinStyle, backgroundColor }} data-testid="dustbin">
      {isActive ? 'Release to drop' : 'Drag a box here'}
    </div>
  );
};

const ComponentList: React.FC = () => {
  const [messageList, setMessageList] = useState([]);

  const handleMessage = (data: string) => {
    // @ts-ignore
    setMessageList((oldMessageList) => [...oldMessageList, data]);
  };

  useEffect(() => {
    window.addEventListener('message', (event: MessageEvent) => {
      if (event.origin === 'http://10.216.15.19:5173') {
        handleMessage(event.data as string);
      }
    });
  }, []);

  const renderComponentList = () => {
    const componentList = [
      { type: 'Carousel', name: '轮播图' },
      { type: 'Recommend', name: '商品推荐' },
      { type: 'Notice', name: '通知公告' },
    ];
    // @ts-ignore
    return (
      <Row gutter={1}>
        {componentList.map((component, index) => (
          <Col key={index} span={7}>
            <DragBox name={component.name} />
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <>
      {messageList.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
      {/*  */}

      {renderComponentList()}

      <Dustbin />
    </>
  );
};

export default ComponentList;
