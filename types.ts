
export {};

declare global {
  interface Window {
    EBWidgets: {
      createWidget: (options: {
        widgetType: string;
        eventId: string;
        iframeContainerId: string;
        iframeContainerHeight: number;
        onOrderComplete: () => void;
      }) => void;
    };
  }
}
