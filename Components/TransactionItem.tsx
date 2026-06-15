"use client";

import { Transaction } from "@prisma/client";
import { addCommas } from "@/lib/utils";
import { toast } from "react-toastify";
import deleteTransaction from "@/app/generated/prisma/actions/DeleteTransaction";

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  const sign = transaction.amount < 0 ? "-" : "+";
  const handleDeleteTransaction = async (transactionId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this transaction?",
    );
    if (!confirmed) {
      return;
    }
    const { error } = await deleteTransaction(transactionId);
    if (error) {
      toast.error(error);
      return;
    }
    toast.success("Transaction deleted successfully");
  };
  return (
    <li className={transaction.amount < 0 ? "minus" : "plus"}>
      {transaction.text}{" "}
      <span>
        {sign}${addCommas(Math.abs(transaction.amount))}
      </span>
      <button
        onClick={() => handleDeleteTransaction(transaction.id)}
        className="delete-btn"
      >
        Delete
      </button>
    </li>
  );
};

export default TransactionItem;
