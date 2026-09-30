import { isTodo, stripTodo } from "@/lib/utils";

/** Affiche un texte, ou un placeholder clairement identifié si la valeur commence par "TODO:". */
export function Txt({ children }: { children: string }) {
  if (!isTodo(children)) return <>{children}</>;
  return (
    <span className="todo">
      <span className="todo-tag">À compléter</span>
      {stripTodo(children)}
    </span>
  );
}
