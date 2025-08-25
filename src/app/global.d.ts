// global.d.ts
export {};

declare global {
  interface Window {
    RemoteCalc?: (config: {
      Url: string;
      Calculator: string;
      ContainerId: string;
      [key: string]: unknown;
    }) => void;
  }
}
