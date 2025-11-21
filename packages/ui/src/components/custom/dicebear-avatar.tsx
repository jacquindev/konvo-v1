"use client";

import { glass } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { Avatar } from "@repo/ui/components/ui/avatar";
import { cn } from "@repo/ui/lib/utils";
import { useMemo } from "react";

interface DicebearAvatarProps {
  seed: string;
  size?: number;
  imageUrl?: string;
  className?: string;
  badgeImageUrl?: string;
  badgeClassName?: string;
}

export const DicebearAvatar = ({
  seed,
  size = 32,
  imageUrl,
  className,
  badgeClassName,
  badgeImageUrl,
}: DicebearAvatarProps) => {
  const avatarSrc = useMemo(() => {
    if (imageUrl) {
      return imageUrl;
    }

    const avatar = createAvatar(glass, {
      seed: seed.toLowerCase().trim(),
      size,
    });

    return avatar.toDataUri();
  }, [imageUrl, seed, size]);

  const badgeSize = Math.round(size * 0.5);

  return (
    <div
      className="relative inline-block"
      style={{ width: size, height: size }}
    >
      <Avatar
        className={cn(
          "border rounded-full relative bg-card dark:bg-indigo-900 size-full",
          className
        )}
      >
        <img
          src={avatarSrc}
          alt="avatar"
          width={size}
          height={size}
          className="min-w-0 size-full object-cover"
        />
      </Avatar>

      {badgeImageUrl && (
        <div
          className={cn(
            "shrink-0 absolute right-0 bottom-0 flex items-center justify-center overflow-hidden rounded-full border-2 bg-background border-background",
            badgeClassName
          )}
          style={{
            width: badgeSize,
            height: badgeSize,
            transform: "translate(15%, 15%)",
          }}
        >
          <img
            src={badgeImageUrl}
            alt="avatar badge"
            width={badgeSize}
            height={badgeSize}
            className="size-full object-cover shrink-0"
          />
        </div>
      )}
    </div>
  );
};
