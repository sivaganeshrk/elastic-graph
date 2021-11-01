const enable = true;
export function debug(module: string, message: any) {
  if (enable) {
    console.debug(JSON.stringify({ module: module, message: message }));
  }
}
