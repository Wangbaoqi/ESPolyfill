import { LanguageType } from "@/types/languageType";

// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
// host environment eg. nodejs or browser
const documentAll = typeof document === 'object' && document.all;
// IsHTMLDDA-internal-slot and IsLooselyEqual and ToBoolean
const IsHTMLDDA = typeof documentAll == 'undefined' && documentAll === 'undefined';

// https://tc39.es/ecma262/#sec-iscallable
export function IsCallable(argument: Function): boolean {
  if(IsHTMLDDA) return typeof argument === 'function' || argument === documentAll;
  return typeof argument === 'function';
}

