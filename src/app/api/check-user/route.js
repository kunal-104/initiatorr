import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export const POST = async (req, res) => {
  const { email, name, userId, picture } = await req.json();

  try {
    await dbConnect();

    // Check if user already exists in the database
    let existingUser = await User.findOne({ email });

    if (!existingUser) {
      // If user does not exist, create a new user
      existingUser = await User.create({ email, name, userId, picture });
    } else {
      // If user exists, update the existing user
      await User.updateOne({ email }, { picture });
    }

    return new Response(JSON.stringify({ success: true, message: 'User authenticated and saved', user: existingUser }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error in user check/update:', error);
    return new Response(JSON.stringify({ success: false, message: 'Internal Server Error', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};


// import dbConnect from '@/lib/dbConnect';
// import User from '@/models/User';

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   const { email, name, userId } = req.body;

//   try {
//     const dbConnection = await dbConnect();
//     if (!dbConnection) {
//       throw new Error('Database connection failed');
//     }

//     // Check if user already exists in the database
//     let existingUser = await User.findOne({ email });

//     if (!existingUser) {
//       // If user does not exist, create a new user
//       existingUser = await User.create({ email, name, userId });
//     } else {
//       // If user exists, update the existing user
//       await User.updateOne({ email }, { name });
//     }

//     res.status(200).json({ success: true, message: 'User authenticated and saved', user: existingUser });
//   } catch (error) {
//     console.error('Error in user check/update:', error);
//     res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
//   }
// }
