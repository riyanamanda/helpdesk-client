importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js');

const params = new URLSearchParams(self.location.search);

firebase.initializeApp({
    apiKey: params.get('apiKey'),
    authDomain: params.get('authDomain'),
    projectId: params.get('projectId'),
    storageBucket: params.get('storageBucket'),
    messagingSenderId: params.get('messagingSenderId'),
    appId: params.get('appId'),
});

const messaging = firebase.messaging();

const translations = {
    en: {
        titles: {
            NEW_TICKET: 'New Ticket',
            TICKET_ASSIGNED: 'Ticket Assigned',
            TICKET_CLOSED: 'Ticket Closed',
            FEEDBACK_STATUS_UPDATED: 'Feedback Updated',
        },
        bodies: {
            NEW_TICKET: '{actor_name} submitted a new ticket',
            TICKET_ASSIGNED: '{actor_name} assigned you to a ticket',
            TICKET_CLOSED: 'Your ticket has been closed',
            FEEDBACK_STATUS_UPDATED: {
                IN_REVIEW: '{actor_name} is reviewing your feedback',
                ACCEPTED: 'Your feedback has been accepted',
                REJECTED: 'Your feedback has been rejected',
                DELIVERED: 'Your feedback has been delivered',
            },
        },
    },
    id: {
        titles: {
            NEW_TICKET: 'Tiket Baru',
            TICKET_ASSIGNED: 'Tiket Ditugaskan',
            TICKET_CLOSED: 'Tiket Ditutup',
            FEEDBACK_STATUS_UPDATED: 'Masukan Diperbarui',
        },
        bodies: {
            NEW_TICKET: '{actor_name} mengajukan tiket baru',
            TICKET_ASSIGNED: '{actor_name} menugaskan Anda pada sebuah tiket',
            TICKET_CLOSED: 'Tiket Anda telah ditutup',
            FEEDBACK_STATUS_UPDATED: {
                IN_REVIEW: '{actor_name} sedang meninjau masukan Anda',
                ACCEPTED: 'Masukan Anda telah diterima',
                REJECTED: 'Masukan Anda telah ditolak',
                DELIVERED: 'Masukan Anda telah disampaikan',
            },
        },
    },
};

async function getLang() {
    try {
        const cache = await caches.open('app-prefs');
        const resp = await cache.match('/lang');
        if (resp) return await resp.text();
    } catch (_) {}
    return navigator.language.startsWith('id') ? 'id' : 'en';
}

function buildMessage(data, lang) {
    const t = translations[lang] || translations.en;
    const type = data.type || '';
    const actorName = data.actor_name || '';
    const status = data.status || '';

    const title = t.titles[type] || type;

    let bodyTemplate = t.bodies[type];
    if (typeof bodyTemplate === 'object') {
        bodyTemplate = bodyTemplate[status] || Object.values(bodyTemplate)[0] || type;
    }
    const body = (bodyTemplate || type).replace('{actor_name}', actorName);

    return { title, body };
}

messaging.onBackgroundMessage(async (payload) => {
    const data = payload.data || {};
    const lang = await getLang();
    const { title, body } = buildMessage(data, lang);

    await self.registration.showNotification(title, {
        body,
        icon: '/favicon.ico',
        data: {
            reference_type: data.reference_type,
            reference_id: data.reference_id,
        },
    });
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    const { reference_type, reference_id } = event.notification.data || {};
    if (!reference_type || !reference_id) return;

    const path = reference_type === 'TICKET'
        ? `/ticket/${reference_id}`
        : `/feedback/${reference_id}`;

    event.waitUntil(
        self.clients.matchAll({ type: 'window' }).then((clientList) => {
            for (const client of clientList) {
                if ('focus' in client) {
                    client.navigate(path);
                    return client.focus();
                }
            }
            return self.clients.openWindow(path);
        })
    );
});
