"use client";
import { useRef } from "react";
import addTransactions from "../app/generated/prisma/actions/addTransactions";
import { toast } from "react-toastify";

const AddTransactions = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const clientAction = async (formData: FormData) => {
    const { data, error } = await addTransactions(formData);
    if (error) {
      toast.error(error);
    } else {
      toast.success("Transaction Added");
      formRef.current?.reset();
    }
  };
  return (
    <>
      <h3>Add Transaction</h3>
      <form action={clientAction} ref={formRef} className="form">
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input type="text" name="text" placeholder="Enter text..." />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount <b>(+ for income, - for expense)</b>
          </label>
          <input
            type="number"
            name="amount"
            placeholder="Enter amount..."
            step="0.01"
          />
        </div>
        <button type="submit">Add Transaction</button>
      </form>
    </>
  );
};

export default AddTransactions;
