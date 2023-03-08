import React from 'react';
import { Button } from 'antd';

const iframeStyle: React.CSSProperties = {
  width: '100%',
  height: '100vh',
  border: '1px solid black',
};

const Preview: React.FC = ({}) => {
  const sendMessage = () => {
    console.log('send');

    const iframe: Window | null = (document.getElementById('my-iframe') as HTMLIFrameElement)
      .contentWindow;

    iframe?.postMessage(
      {
        type: 'parent',
        value: new Date(),
      },
      'http://10.216.15.19:5173',
    );
  };

  return (
    <>
      <Button onClick={sendMessage}>发送消息</Button>
      <div>
        <iframe id={'my-iframe'} src={'http://10.216.15.19:5173'} style={iframeStyle}></iframe>
      </div>
    </>
  );
};

export default Preview;
