import React, { useEffect, useState } from "react";
import { db, auth } from "../utils/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const Todos = () => {
  const [editId, setEditId] = useState(null);
  const [updatedTask, setUpdatedTask] = useState("");
  const [updatedPriority, setUpdatedPriority] = useState("");
  const [updatedDate, setUpdatedDate] = useState("");
  const [data, setData] = useState([]);

  const fetchDatas = async () => {
    try {
      const todoRef = collection(db, "todos");
      const q = query(
        todoRef,
        where("userId", "==", auth.currentUser.uid),
        orderBy("date", "asc")
      );
      const snapshot = await getDocs(q);
      const todos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(todos);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  const handleEdit = (todo) => {
    setEditId(todo.id);
    setUpdatedTask(todo.task);
    setUpdatedPriority(todo.priority);
    setUpdatedDate(todo.date);
  };

  const handleUpdate = async (id) => {
    try {
      const todoRef = doc(db, "todos", id);
      await updateDoc(todoRef, {
        task: updatedTask,
        priority: updatedPriority,
        date: updatedDate,
      });
      alert("Todo updated successfully");
      setEditId(null);
      setUpdatedTask("");
      setUpdatedPriority("");
      setUpdatedDate("");
      fetchDatas();
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const todoRef = doc(db, "todos", id);
      await deleteDoc(todoRef);
      alert("Todo deleted successfully");
      fetchDatas();
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const priorityColors = {
    High: "bg-red-500",
    Medium: "bg-blue-500",
    Low: "bg-yellow-400",
  };

  return (
    <div className="space-y-4 mt-4 px-2 sm:px-0">
      {data.length === 0 ? (
        <h2 className="text-center text-gray-400 text-lg mt-8">
          No tasks added yet
        </h2>
      ) : (
        data.map((todo) => (
          <div
            key={todo.id}
            className="bg-gray-800 p-4 rounded-2xl shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 transition-all duration-200"
          >
            {editId === todo.id ? (
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 w-full">
                <input
                  type="text"
                  value={updatedTask}
                  onChange={(e) => setUpdatedTask(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  placeholder="Task Name"
                />
                <input
                  type="text"
                  value={updatedPriority}
                  onChange={(e) => setUpdatedPriority(e.target.value)}
                  className="w-full sm:w-24 px-3 py-2 rounded-xl bg-gray-700 text-white outline-none focus:ring-2 focus:ring-indigo-500 text-center transition"
                  placeholder="Priority"
                />
                <input
                  type="date"
                  value={updatedDate}
                  onChange={(e) => setUpdatedDate(e.target.value)}
                  className="w-full sm:w-36 px-3 py-2 rounded-xl bg-gray-700 text-white outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />

                <div className="flex gap-2 mt-2 sm:mt-0">
                  <button
                    onClick={() => handleUpdate(todo.id)}
                    className="px-4 py-2 bg-green-500 rounded-xl text-white hover:bg-green-600 transition text-sm sm:text-base"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditId(null)}
                    className="px-4 py-2 bg-red-700 rounded-xl text-white hover:bg-red-800 transition text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-3 sm:gap-4">
                <div className="text-white font-semibold text-lg sm:text-base">
                  {todo.task}
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`${priorityColors[todo.priority]} text-white px-3 py-1 rounded-full text-sm sm:text-base`}
                  >
                    {todo.priority}
                  </span>
                  <span className="text-gray-400 text-sm sm:text-base">
                    {todo.date}
                  </span>
                </div>

                <div className="flex gap-2 mt-2 sm:mt-0">
                  <button
                    onClick={() => handleEdit(todo)}
                    className="px-3 py-1 bg-indigo-600 rounded-xl text-white hover:bg-indigo-700 transition text-sm sm:text-base"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="px-3 py-1 bg-red-700 rounded-xl text-white hover:bg-red-800 transition text-sm sm:text-base"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Todos;