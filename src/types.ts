export interface MinecraftMod {
  id: string;
  name: string;
  description: string;
  enabledByDefaults: boolean;
  category: 'performance' | 'animation' | 'hud' | 'gameplay';
}

export interface ClientProfile {
  clientName: string;
  version: string;
  themeColor: string;
  fpsMultiplier: number;
  unlockedFps: boolean;
  toggles: Record<string, boolean>;
  hudPositions: Record<string, { x: number; y: number; enabled: boolean }>;
}

export interface ScreenshotSlide {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tag: string;
}
