import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import Article from '@/models/Article';
import Video from '@/models/Video';
import Blog from '@/models/Blog';

export const GET = async (req) => {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');
  const query = searchParams.get('query');

  if (!type || !query) {
    return new Response(JSON.stringify({ success: false, error: 'Invalid search parameters' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    let results = [];

    switch (type) {
      case 'user':
        // results = await User.find({ name: { $regex: query, $options: 'i' } }).limit(24);
        // Find users matching the search query
        const users = await User.find({ name: { $regex: query, $options: 'i' } }).limit(24);

        // Count blogs, articles, and videos for each user
        const userContentCounts = await Promise.all(users.map(async (user) => {
          const [articleCount, blogCount, videoCount] = await Promise.all([
            Article.countDocuments({ authorId: user.author }),
            Blog.countDocuments({ authorId: user.author }),
            Video.countDocuments({ authorId: user.author })
          ]);

          return {
            userId: user.userId,
            email: user.email,
            name: user.name,
            picture: user.picture,
            articleCount,
            blogCount,
            videoCount
          };
        }));

        results = userContentCounts;
        break;
      case 'article':
        results = await Article.find({ 
          $or: [
            { title: { $regex: query, $options: 'i' } },
            { tags: { $regex: query, $options: 'i' } },
            { categories: { $regex: query, $options: 'i' } }
          ]
         }).limit(24);
        break;
      case 'video':
        results = await Video.find({
          $or: [
            { title: { $regex: query, $options: 'i' } },
            { tags: { $regex: query, $options: 'i' } },
            { categories: { $regex: query, $options: 'i' } }
          ]
        }).limit(24);
        break;
      case 'blog':
        results = await Blog.find({ 
          $or: [
            { title: { $regex: query, $options: 'i' } },
            { tags: { $regex: query, $options: 'i' } },
            { categories: { $regex: query, $options: 'i' } }
          ]
         }).limit(24);
        break;
      default:
        return new Response(JSON.stringify({ success: false, error: 'Invalid search type' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
    }

    return new Response(JSON.stringify({ success: true, data: results }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Database query error:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
