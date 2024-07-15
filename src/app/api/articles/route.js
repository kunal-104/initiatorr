import dbConnect from '@/lib/dbConnect';
import Article from '@/models/Article';


export const POST = async (req, res) => {
  await dbConnect();

  try {
    const body = await req.json();
    const article = await Article.create(body);
    return new Response(JSON.stringify({ success: true, data: article }), {
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
    const articles = await Article.find().limit(24);
    return new Response(JSON.stringify({ success: true, data: articles }), {
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