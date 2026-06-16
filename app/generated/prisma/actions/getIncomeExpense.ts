'user server';
import {db} from "@/lib/db";
import {auth} from "@clerk/nextjs/server";


async function getIncomeExpense() : Promise<{
income?: number;
expense?: number;
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
         
        const amounts = transaction.map((t) => t.amount);
        const income = amounts.filter((amount) => amount > 0).reduce((sum, amount) => sum + amount, 0);
        const expense = amounts.filter((amount) => amount < 0).reduce((sum, amount) => sum + amount, 0);
        return {income, expense: Math.abs(expense)};

    } catch (error) {
        console.error("Error fetching user balance:", error);
        return {error: "Failed to fetch balance"};
    }
}

export default getIncomeExpense;