'user server';
import {db} from "@/lib/db";
import {auth} from "@clerk/nextjs/server";

async function getUserBalance() : Promise<{
balance?: number;
error?: string;
}>{
    const {userId} = await auth();
    if (!userId) {
        return {error: "Unauthorized"};
    }
    try {
        const transaction = await db.transaction.findMany({
            where: {userId},
            select: {amount: true},
            
        });
           const balance = transaction.reduce((sum, t) => sum + t.amount, 0); 
        return {balance: balance};
     
        

    } catch (error) {
        console.error("Error fetching user balance:", error);
        return {error: "Failed to fetch balance"};
    }
}

export default getUserBalance;