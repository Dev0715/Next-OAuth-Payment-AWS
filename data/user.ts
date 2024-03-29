import { db, GetCommand } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  const command = new GetCommand({
    TableName: process.env.DYNAMODB_TABLE_NAME,
    Key: {
      partition: "user",
      email: email
    }
  });

  try {
    const response = await db.send(command);
    const item = response.Item;
    // {
    //   password: 'password',
    //   partition: 'user',
    //   email: 'sacreddevking@gmail.com'
    // }
    return item;
  } catch (error) {
    console.log("getUserByEmail", error);
    return null;
  }
};

// NEED TO BE UPDATED TO DYNAMODB
// export const getUserById = async (id: string) => {
//   try {
//     const user = await db.user.findUnique({ where: { id } });
//     return user;
//   } catch {
//     return null;
//   }
// };
