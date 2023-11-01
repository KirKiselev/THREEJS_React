type FrameCallback = (delta: number) => void;

export class FrameHandler {
  private rafTime: number;

  private rafHandle: number;

  private readonly handler: FrameCallback;

  public constructor(handler: FrameCallback) {
    this.rafHandle = -1;
    this.rafTime = 0;
    this.handler = handler;
    this.frame = this.frame.bind(this);
    this.visibleChange = this.visibleChange.bind(this);
  }

  public start() {
    this.stop();
    this.rafTime = performance.now();
    this.frame(this.rafTime);
    document.addEventListener('visibilitychange', this.visibleChange);
  }

  public stop() {
    if (this.rafHandle !== -1) {
      cancelAnimationFrame(this.rafHandle);
      this.rafHandle = -1;
      document.removeEventListener('visibilitychange', this.visibleChange);
    }
  }

  private visibleChange() {
    if (document.visibilityState === 'visible') {
      this.rafTime = performance.now();
    }
  }

  private frame(time: number) {
    this.rafHandle = requestAnimationFrame(this.frame);
    const delta = (time - this.rafTime) / 16.666;
    this.rafTime = time;
    this.handler(delta);
  }
}
