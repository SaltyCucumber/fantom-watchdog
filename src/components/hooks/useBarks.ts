import { useEffect, useState } from 'react';

export const useBarks = () => {
  const [isBarksEnabled, setIsBarksEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    if (window.Notification?.permission === 'granted') {
      setIsBarksEnabled(true);
    } else {
      setIsBarksEnabled(false);
    }
  }, []);

  const enableBarks = async () => {
    if (!window.Notification) {
      alert('Browser Notification feature is disabled or not supported');
      return;
    }

    await Notification.requestPermission();

    if (Notification.permission === 'granted') {
      setIsBarksEnabled(true);
    } else alert('Access to Browser Notification feature is not granted by user');
  };

  return { isBarksEnabled, enableBarks };
};
