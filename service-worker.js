self.addEventListener('install', event => {
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('message', event => {
    if (event.data === 'play-alarm') {
        playAlarm();
    }
});

const playAlarm = () => {
    self.registration.showNotification('Alarm', {
        body: 'Time to wake up!',
        icon: 'alarm-icon.png',  // Change this to the path of your icon file
        requireInteraction: true,
    });

    self.registration.getNotifications().then(notifications => {
        notifications.forEach(notification => {
            notification.onclick = () => {
                clients.openWindow('/');
                notification.close();
            };
        });
    });
};
