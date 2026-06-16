'user server';
import {db} from "@/lib/db";
import {auth} from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

async function deleteTransaction(transactionId: string) : Promise<{
    success?: boolean;
    error?: string;
}> {
    const {userId} = await auth();
    if (!userId) {
        return {error: "Unauthorized"};
    }
    try {
        await db.transaction.deleteMany({
            where: {id: transactionId, userId},
        });
        revalidatePath("/dashboard");
        return {success: true};
    } catch (error) {
        console.error("Error deleting transaction:", error);
        return {error: "Failed to delete transaction"};
    }
    
}
        

export default deleteTransaction; 


     
        

  
