import dbConnect from '@/lib/dbConnect';
import Blog from '@/models/Blog';
import Article from '@/models/Article';
import Video from '@/models/Video';

export const GET = async (req) => {
    await dbConnect();


    const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  
  

  if (!userId) {
    return new Response(JSON.stringify({ success: false, error: 'userId is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const articles = await Article.find({ author: userId }).limit(24);
    const videos = await Video.find({ author: userId }).limit(24);
    const blogs = await Blog.find({ author: userId }).limit(24);

    return new Response(
      JSON.stringify({ success: true, data: { articles, videos, blogs } }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
