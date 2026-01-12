"use client";

import UnicornScene from "unicornstudio-react";

export function AnimatedUnicorn() {
  return (
    <UnicornScene
      projectId="L99tNyU87GNVw5k0YV79"
      fps={60}
      dpi={2}
      scale={0.8}
      lazyLoad={true}
      production={true}
    />
  );
}
