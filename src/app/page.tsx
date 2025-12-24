"use client";

import { useState } from "react";
import { useLocalStorageTodos } from "../hooks/useLocalStorageTodos";

export default function TodoList() {
  const { todos, addTodo: addHook, toggleCompleted, deleteTodo, isLoaded } = useLocalStorageTodos();
  const [newTitle, setNewTitle] = useState("");

  const handleAddTodo = () => {
    if (!newTitle.trim()) return;
    addHook(newTitle);
    setNewTitle("");
  };

  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-extrabold text-center mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Todo List
        </h1>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 mb-8 border border-white/20 dark:border-slate-700/50">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="何をお手伝いしましょうか？"
              className="flex-grow bg-slate-50 dark:bg-slate-900 border-none ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-blue-500 rounded-xl p-3 text-sm transition-all"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddTodo();
              }}
            />
            <button
              onClick={handleAddTodo}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm whitespace-nowrap"
              disabled={!newTitle.trim()}
            >
              追加
            </button>
          </div>
        </div>

        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="group flex items-center justify-between bg-white dark:bg-slate-800 rounded-xl p-4 border border-white/10 dark:border-slate-700/50 hover:shadow-lg transition-all animate-in fade-in slide-in-from-bottom-2"
            >
              <label className="flex items-center space-x-3 cursor-pointer flex-grow min-w-0">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleCompleted(todo.id, !todo.completed)}
                  className="w-5 h-5 rounded-md border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500 transition-all cursor-pointer"
                />
                <span
                  className={`truncate text-sm font-medium transition-all ${todo.completed
                    ? "text-slate-400 line-through"
                    : "text-slate-700 dark:text-slate-200"
                    }`}
                >
                  {todo.title}
                </span>
              </label>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                title="削除"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>

        {todos.length === 0 && (
          <div className="text-center py-10">
            <p className="text-slate-400 text-sm">タスクはありません。新しいTodoを追加しましょう！</p>
          </div>
        )}
      </div>
    </main>
  );
}
