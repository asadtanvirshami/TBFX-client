// global.d.ts
export {};

type RemoteCalcConfig = {
  Url: string;
  Calculator: string;
  ContainerId: string;
  TopPaneStyle?: string;
  BottomPaneStyle?: string;
  ButtonStyle?: string;
  TitleStyle?: string;
  TextboxStyle?: string;
  ContainerWidth?: string;
  HighlightColor?: string;
  IsDisplayTitle?: boolean;
  IsShowChartLinks?: boolean;
  IsShowEmbedButton?: boolean;
  CompactType?: string;
  [key: string]: unknown;
};

declare global {
  interface Window {
    RemoteCalc?: (config: RemoteCalcConfig) => void;
  }
}
