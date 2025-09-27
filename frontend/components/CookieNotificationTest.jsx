import React from 'react';

export default function CookieNotificationTest() {
  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '20px',
      borderRadius: '10px',
      zIndex: 9999
    }}>
      <p>🍪 Test Cookie Notification</p>
      <button onClick={() => console.log('Accept clicked')}>Accept</button>
    </div>
  );
}