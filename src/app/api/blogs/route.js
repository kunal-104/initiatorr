import dbConnect from '@/lib/dbConnect';
import Blog from '@/models/Blog';

export const POST = async (req, res) => {
  await dbConnect();

  try {
    const body = await req.json();
    const blog = await Blog.create(body);
    return new Response(JSON.stringify({ success: true, data: blog }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const GET = async () => {
  await dbConnect();

  try {
    const blogs = await Blog.find().limit(24);
    return new Response(JSON.stringify({ success: true, data: blogs }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};


// "kp_95260562f00e4ef78f782a490b0acd68"




// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// import connectToDatabase from '../../../../lib/mongodb';
// import Blog from '../../../../models/Blog';
// import User from '../../../../models/User';

// export const POST = async (req, res) => {
//   await connectToDatabase();

//   // Authenticate user
//   const { getUser } = getKindeServerSession();
//   const user = await getUser();

//   if (!user) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   // Find the user in the database
//   const existingUser = await User.findOne({ email: user.email });
//   if (!existingUser) {
//     return res.status(401).json({ message: 'User not found' });
//   }

//   // Get blog data from request body
//   const { id, title, description, tags, categories } = req.body;

//   // Create a new blog
  // const newBlog = new Blog({
  //   id,
  //   title,
  //   description,
  //   tags,
  //   categories,
  //   author: existingUser._id,
  // });

//   await newBlog.save();

//   res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
// };
