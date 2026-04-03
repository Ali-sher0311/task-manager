import React, { useState } from "react";
import { FilePlus } from "lucide-react";
import { db, auth } from "../utils/firebase";
import { collection, addDoc } from "firebase/firestore";
import Todos from "./todos";

const Dasboard = () => {
  const priorityColors = {
    High: "red",
    Medium: "blue",
    Low: "yellow",
  };

  const [showdiv, setShowdiv] = useState(false);
  const [item, setitem] = useState("");
  const [dueDate, setdueDate] = useState("");
  const [priority, setPriority] = useState("");

  const handleAdd = async () => {
    if (!item || !dueDate || !priority) {
      alert("fill the all fields ");
      return;
    }
    const useRef = collection(db, "todos");
    try {
      await addDoc(useRef, {
        task: item,
        date: dueDate,
        priority: priority,
        userId: auth.currentUser.uid,
      });
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
    setitem("");
    setdueDate("");
    setPriority("");
    setShowdiv(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-6">
      
      {/* Add Item Button (Left Side) */}
      <div className="flex justify-start mb-4">
        <button
          onClick={() => setShowdiv(!showdiv)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition"
        >
          <FilePlus size={20} />
          Add Item
        </button>
      </div>

      {/* Modal */}
      {showdiv && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl shadow-lg w-full max-w-md p-6 space-y-4 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center">
              Add Items
            </h2>

            {/* Task Input */}
            <input
              value={item}
              type="text"
              placeholder="Enter Item"
              onChange={(e) => setitem(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
            />

            {/* Due Date */}
            <input
              value={dueDate}
              type="date"
              onChange={(e) => setdueDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-700 text-white outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
            />

            {/* Priority Selection */}
            <div className="flex justify-between mt-2">
              {["High", "Medium", "Low"].map((p) => (
                <button
                  key={p}
                  onClick={() => setPriority(p)}
                  style={{
                    backgroundColor: priority === p ? priorityColors[p] : "white",
                    color: priority === p ? "white" : "black",
                  }}
                  className="flex-1 py-2 mx-1 rounded-xl transition hover:opacity-80 text-sm sm:text-base"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowdiv(false)}
                className="px-4 py-2 rounded-xl bg-red-700 text-white hover:bg-red-800 transition text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="px-4 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600 transition text-sm sm:text-base"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Todos Component */}
      <Todos />
    </div>
  );
};

export default Dasboard;