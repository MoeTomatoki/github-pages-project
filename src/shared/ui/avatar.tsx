import clsx from "clsx";

interface AvatarProps {
    username: string;
    size?: 'sm' | 'md' | 'lg';
    imageUrl?: string;
  }
  
  export const Avatar = ({ username, size = 'md', imageUrl }: AvatarProps) => {
    const sizes = {
      sm: 'w-8 h-8 text-xs',
      md: 'w-10 h-10 text-sm',
      lg: 'w-12 h-12 text-base'
    };
  
    const initials = username
      .split(' ')
      .map(part => part[0]?.toUpperCase() || '')
      .join('')
      .slice(0, 2);
  
    return (
      <div className={clsx(
        "rounded-full bg-gradient-to-br from-blue-500 to-purple-600",
        "text-white flex items-center justify-center font-medium",
        "select-none flex-shrink-0 overflow-hidden",
        sizes[size]
      )}>
        {imageUrl ? (
          <img src={imageUrl} alt={username} className="w-full h-full object-cover" />
        ) : (
          initials
        )}
      </div>
    );
  };