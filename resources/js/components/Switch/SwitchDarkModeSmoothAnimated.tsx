import { Moon, Sun } from 'lucide-react';
import { useCallback, useRef } from 'react';
import { flushSync } from 'react-dom';

import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

type Props = {
    className?: string;
};

export const SwitchDarkModeSmoothAnimated = ({ className }: Props) => {
    const { appearance, updateAppearance } = useAppearance();
    const isDark = appearance === 'dark';
    const buttonRef = useRef<HTMLButtonElement>(null);

    const toggleTheme = useCallback(async () => {
        if (!buttonRef.current) return;

        const newTheme = isDark ? 'light' : 'dark';

        await document.startViewTransition(() => {
            flushSync(() => {
                updateAppearance(newTheme);
            });
        }).ready;

        // ripple animation from button center
        const { top, left, width, height } = buttonRef.current.getBoundingClientRect();
        const x = left + width / 2;
        const y = top + height / 2;
        const maxRadius = Math.hypot(Math.max(left, window.innerWidth - left), Math.max(top, window.innerHeight - top));

        document.documentElement.animate(
            {
                clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`],
            },
            {
                duration: 700,
                easing: 'ease-in-out',
                pseudoElement: '::view-transition-new(root)',
            },
        );
    }, [isDark, updateAppearance]);

    return (
        <Button
            variant="secondary"
            ref={buttonRef}
            onClick={toggleTheme}
            className={cn('size-9 overflow-hidden rounded-md border hover:border-primary', className)}
        >
            {isDark ? <Sun /> : <Moon />}
        </Button>
    );
};
