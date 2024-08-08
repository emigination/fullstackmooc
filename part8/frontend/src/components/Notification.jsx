import { forwardRef, useImperativeHandle, useState } from 'react';

const Notification = forwardRef((_props, ref) => {
  const [messages, setMessages] = useState([]);
  useImperativeHandle(ref, () => ({ setMessages, messages }));

  return (
    messages.map((message, index) => (
      <div key={index} style={{ border: 'solid', borderWidth: 1 }}>
        {message}
      </div>
    ))
  );
});

export default Notification;
