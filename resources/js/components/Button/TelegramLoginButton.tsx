import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';

export default function TelegramLoginButton() {
    const { app_url, telegram_bot_username } = usePage<any>().props;
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://telegram.org/js/telegram-widget.js?22';
        script.async = true;

        script.setAttribute('data-telegram-login', telegram_bot_username);
        script.setAttribute('data-size', 'large');
        script.setAttribute('data-radius', '6');
        script.setAttribute('data-request-access', 'write');
        script.setAttribute('data-auth-url', `${app_url}/t-login/callback`);

        // append directly inside the container
        document.getElementById('tg-login-container')?.appendChild(script);
    }, []);

    return (
        <>
            <div
                id="tg-login-container"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '20px',
                }}
            />
        </>
    );
}
