import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createNewUser=mutation({
        args: {
        name: v.string(),
        email: v.string(),
        imageUrl: v.string(),
    },
    handler: async (ctx, args) => {
        // if user already exists, return the user
        const existingUser = await ctx.db.query("userTable").filter(q => q.eq(q.field("email"), args.email)).collect();
        
        if(existingUser?.length == 0)  {
            const userData={
                name: args.name,
                email: args.email,
                imageUrl: args.imageUrl,
            }
            // if not exists, create a new user
            const user = await ctx.db.insert("userTable", userData);
            return user;
        }   
        return existingUser[0];
    }
});
