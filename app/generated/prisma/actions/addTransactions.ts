
import {auth} from "@clerk/nextjs/server";
import {db} from "@/lib/db";
import { revalidatePath } from "next/cache";

interface TransactionData {
  amount: number;
  text: string;
}

interface TransactionResult {
  data?: TransactionData;
  error?: string;
}

async function addTransactions(formData: FormData): Promise<TransactionResult> {
  const textValue = formData.get("text");
  const amountValue = formData.get("amount");

  if (typeof textValue !== "string" || typeof amountValue !== "string") {
    return { error: "Invalid input data" };
  }

  const text = textValue.toString();
  const amount: number = parseFloat(amountValue.toString());

  const { userId } = await auth();
    if (!userId) {
    return { error: "User not found" };
  }
  try {
    const transactionData: TransactionData = await db.transaction.create({
      data: {
        text,
        amount,
        userId,
      },
  });
  revalidatePath("/"); 
    return { data: transactionData };
  } catch (error) {
    return { error: "Failed to add transaction" };
  }
}

export default addTransactions;