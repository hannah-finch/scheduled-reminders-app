/**
 * Shared "you haven't written this yet" error.
 *
 * Call this from every stub so you get a clear stack trace instead of
 * `undefined is not a function` later. Replace the call with real code
 * as you implement each function — don't leave notImplemented() in
 * shipping paths.
 */
export function notImplemented(what: string): never {
  throw new Error(
    `Not implemented yet: ${what}\n` +
      `Open the file in the stack trace and fill in the TODO comments.`,
  );
}
