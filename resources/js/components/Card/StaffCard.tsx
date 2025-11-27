import { User } from 'lucide-react';

export default function StaffCard({ name, role, imageUrl }) {
    return (
        <div className="w-36 transform overflow-hidden rounded-md border border-gray-100 bg-white transition-transform hover:scale-105 hover:shadow-xl">
            {/* Image Section 3:4 */}
            <div className="relative aspect-square w-full bg-gray-100">
                {imageUrl ? (
                    <img src={imageUrl} alt={name} className="h-full w-full object-cover" />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted">
                        <User className="h-12 w-12 text-muted-foreground" />
                    </div>
                )}
            </div>

            {/* Name & Role */}
            <div className="p-2 text-center">
                <h3 className="text-sm font-semibold text-gray-900">{name}</h3>
                <p className="mt-1 text-xs text-gray-500">{role}</p>
            </div>
        </div>
    );
}

// Usage
// <StaffCard name="John Doe" role="Software Engineer" imageUrl="https://yourimage.com/photo.jpg" />
// <StaffCard name="Jane Smith" role="Marketing Lead" />
