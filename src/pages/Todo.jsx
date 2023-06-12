import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

export default function Todo() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingTodoText, setEditingTodoText] = useState("");
  const [editingTodoCompleted, setEditingTodoCompleted] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleTodoCheckboxChange = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isCompleted: !todo.isCompleted,
          };
        }
        return todo;
      });
    });
  };

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        "https://www.pre-onboarding-selection-task.shop/todos",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (response.status === 200) {
        setTodos(response.data);
      }
    } catch (error) {
      console.error("Todo 리스트 가져오기 요청 에러:", error);
    }
  };

  const handleAddTodo = async () => {
    try {
      const response = await axios.post(
        "https://www.pre-onboarding-selection-task.shop/todos",
        { todo: newTodo },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        setTodos([...todos, response.data]);
        setNewTodo("");
      }
    } catch (error) {
      console.error("Todo 추가 요청 에러:", error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      const response = await axios.delete(
        `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (response.status === 204) {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
      }
    } catch (error) {
      console.error("Todo 삭제 요청 에러:", error);
    }
  };

  const handleEditTodo = (id, todoText, completed) => {
    setEditingTodoId(id);
    setEditingTodoText(todoText);
    setEditingTodoCompleted(completed);
  };

  const handleUpdateTodo = async () => {
    try {
      const response = await axios.put(
        `https://www.pre-onboarding-selection-task.shop/todos/${editingTodoId}`,
        {
          todo: editingTodoText,
          isCompleted: editingTodoCompleted,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const updatedTodos = todos.map((todo) =>
          todo.id === editingTodoId
            ? {
                ...todo,
                todo: editingTodoText,
                isCompleted: editingTodoCompleted,
              }
            : todo
        );
        setTodos(updatedTodos);
        setEditingTodoId(null);
        setEditingTodoText("");
        setEditingTodoCompleted(false);
      }
    } catch (error) {
      console.error("Todo 수정 요청 에러:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingTodoId(null);
    setEditingTodoText("");
    setEditingTodoCompleted(false);
  };

  return (
    <TodoContainer>
      <TodoInput
        data-testid="new-todo-input"
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <TodoButton data-testid="new-todo-add-button" onClick={handleAddTodo}>
        추가
      </TodoButton>
      <TodoList>
        {todos.map((todo) => (
          <TodoItem key={todo.id}>
            <TodoCheckbox
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => handleTodoCheckboxChange(todo.id)}
            />
            {editingTodoId === todo.id ? (
              <>
                <TodoEditInput
                  data-testid="modify-input"
                  type="text"
                  value={editingTodoText}
                  onChange={(e) => setEditingTodoText(e.target.value)}
                />
                <SubmitButton
                  data-testid="submit-button"
                  onClick={handleUpdateTodo}
                >
                  제출
                </SubmitButton>
                <CancelButton
                  data-testid="cancel-button"
                  onClick={handleCancelEdit}
                >
                  취소
                </CancelButton>
              </>
            ) : (
              <>
                <TodoText completed={todo.isCompleted ? "true" : undefined}>
                  {todo.todo}
                </TodoText>
                <EditButton
                  data-testid="modify-button"
                  onClick={() =>
                    handleEditTodo(todo.id, todo.todo, todo.isCompleted)
                  }
                >
                  수정
                </EditButton>
                <DeleteButton
                  onClick={() => handleDeleteTodo(todo.id)}
                  data-testid="delete-button"
                >
                  삭제
                </DeleteButton>
              </>
            )}
          </TodoItem>
        ))}
      </TodoList>
    </TodoContainer>
  );
}
const EditButton = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  background-color: #f4d35e;
  color: #000;
`;

const DeleteButton = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  background-color: #ee6055;
  color: #fff;
`;

const SubmitButton = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  background-color: #32a852;
  color: #fff;
`;

const CancelButton = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  background-color: #666;
  color: #fff;
`;

const TodoContainer = styled.div`
  margin: 20px auto;
  max-width: 500px;
  padding: 0 20px;
`;

const TodoInput = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
`;

const TodoButton = styled.button`
  padding: 10px 20px;
  background-color: #2225f1;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #ff5858;
  }
`;

const TodoList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const TodoItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const TodoCheckbox = styled.input`
  margin-right: 10px;
`;

const TodoText = styled.span`
  text-decoration: ${({ completed }) =>
    completed === "true" ? "line-through" : "none"};
`;

const TodoEditInput = styled.input`
  margin-right: 10px;
`;
