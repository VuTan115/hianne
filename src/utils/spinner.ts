class Spinner {
  private readonly loadingDivId = 'app-loading';
  private readonly loadingSpinnerTemplate = `<div id="${this.loadingDivId}" style="position:fixed;display:flex;width:100%;height:100%;z-index:99999;top:0;left:0;text-align:center;vertical-align:middle;background:rgb(255 255 255 / 10%);backdrop-filter:blur(1px);border:1px solid rgb(255 255 255 / 12.5%)"><div class="loader" style="margin: auto; font-size: 15px; position: relative; text-indent: -9999em; width: 56px; height: 56px; border-radius: 50%; background: radial-gradient(farthest-side, #474bff 94%, #0000) top/9px 9px no-repeat, conic-gradient(#0000 30%, #474bff); mask: radial-gradient(farthest-side, #0000 calc(100% - 9px), #000 0); -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 9px), #000 0); transform: translateZ(0); animation: loading-proccess 1.1s infinite linear;">Loading&#8230;</div></div>`;

  private static instance: Spinner | null = null;

  private constructor() {
    if (typeof document !== 'undefined') {
      const style = document.createElement('style');
      style.textContent = `@keyframes loading-proccess{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}`;
      document.head.appendChild(style);
    }
  }

  static getInstance(): Spinner {
    if (!Spinner.instance) {
      Spinner.instance = new Spinner();
    }
    return Spinner.instance;
  }

  showLoading(): void {
    if (typeof document === 'undefined') return;
    const bodyElement = document.querySelector('body');
    if (!bodyElement) return;
    if (!document.getElementById(this.loadingDivId)) {
      bodyElement.insertAdjacentHTML('beforeend', this.loadingSpinnerTemplate);
    }
  }

  hideLoading(): void {
    if (typeof document === 'undefined') return;
    const loadingDiv = document.getElementById(this.loadingDivId);
    if (loadingDiv) {
      loadingDiv.remove();
    }
  }
}

const spinner = Spinner.getInstance();
export default spinner;
