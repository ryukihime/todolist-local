"use client";

import { useState, useEffect } from "react";

type Todo = {
    id: number;
    title: string;
    completed: boolean;
};

export function useLocalStorageTodos() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem("todos");
        if (saved) {
            try {
                setTodos(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse todos from localStorage", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage whenever todos change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("todos", JSON.stringify(todos));
        }
    }, [todos, isLoaded]);

    const addTodo = (title: string) => {
        const newTodo: Todo = {
            id: Date.now(), // Use timestamp as ID
            title,
            completed: false,
        };
        setTodos((prev) => [...prev, newTodo]);
    };

    const toggleCompleted = (id: number, completed: boolean) => {
        setTodos((prev) =>
            prev.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
        );
    };

    const deleteTodo = (id: number) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    return {
        todos,
        addTodo,
        toggleCompleted,
        deleteTodo,
        isLoaded,
    };
}
