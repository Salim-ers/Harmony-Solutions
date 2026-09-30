export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Convention : toute donnée non fournie commence par "TODO:" et s’affiche comme un placeholder identifié. */
export const TODO_PREFIX = "TODO:";
export function isTodo(value: string) {
  return value.trim().startsWith(TODO_PREFIX);
}
export function stripTodo(value: string) {
  return value.trim().slice(TODO_PREFIX.length).trim();
}
