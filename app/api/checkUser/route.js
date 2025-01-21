import { db } from "@/configs/db";
import { Users } from "@/configs/schema";
import { eq } from "drizzle-orm";

export async function POST(req) {
    try {
      // Check if name is sent correctly
      const { email, fullName, imageUrl } = await req.json();
  
      // Log received data
      console.log('Received user data:', { email, fullName, imageUrl });
  
      // If name (fullName) is missing, throw an error
      if (!fullName) {
        throw new Error('Name is required');
      }
  
      const existingUser = await db
        .select()
        .from(Users)
        .where(eq(Users.email, email))
        .limit(1);
  
      if (existingUser.length === 0) {
        await db.insert(Users).values({
          name: fullName, // Use fullName here to match your schema
          email,
          imageUrl,
        });
        console.log('User added successfully');
      } else {
        console.log('User already exists');
      }
  
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
      
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        { status: 500 }
      );
    }
  }
  