import React, { useEffect, useState } from 'react';

const ComponentList: React.FC = () => {
  const [messageList, setMessageList] = useState([]);
  const handleMessage = (data: string) => {
    // @ts-ignore
    setMessageList((oldMessageList) => [...oldMessageList, data]);
  };

  useEffect(() => {
    window.addEventListener('message', (event: MessageEvent) => {
      console.log('event', event);

      if (event.origin === 'http://10.216.15.19:5173') {
        handleMessage(event.data as string);
      }
    });
  }, []);

  return (
    <>
      {messageList.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
    </>
  );
};

export default ComponentList;
