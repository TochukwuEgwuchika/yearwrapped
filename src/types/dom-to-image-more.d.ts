declare module 'dom-to-image-more' {
  interface Options {
    quality?: number;
    scale?: number;
    width?: number;
    height?: number;
    bgcolor?: string;
    style?: Record<string, string>;
    filter?: (node: Node) => boolean;
    imagePlaceholder?: string;
    cacheBust?: boolean;
  }

  function toPng(node: Node, options?: Options): Promise<string>;
  function toJpeg(node: Node, options?: Options): Promise<string>;
  function toBlob(node: Node, options?: Options): Promise<Blob>;
  function toSvg(node: Node, options?: Options): Promise<string>;
  function toPixelData(node: Node, options?: Options): Promise<Uint8ClampedArray>;
  function toCanvas(node: Node, options?: Options): Promise<HTMLCanvasElement>;

  export { toPng, toJpeg, toBlob, toSvg, toPixelData, toCanvas };
  export default { toPng, toJpeg, toBlob, toSvg, toPixelData, toCanvas };
}
