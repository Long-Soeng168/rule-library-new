interface ContentHeaderProps {
    title: string;
    description?: string;
    align?: 'start' | 'center' | 'end'; // default: start
}

export function ContentHeader({ title, description, align = 'start' }: ContentHeaderProps) {
    return (
        <div className={`mb-4 text-${align}`}>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
            {description && <p className="mt-2 text-gray-500">{description}</p>}
        </div>
    );
}
