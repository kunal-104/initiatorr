import dbConnect from '@/lib/dbConnect';
import Video from '@/models/Video';

export const POST = async (req, res) => {
  await dbConnect();

  try {
    const body = await req.json();
    const video = await Video.create(body);
    return new Response(JSON.stringify({ success: true, data: video }), {
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
    const videos = await Video.find().limit(24);
    return new Response(JSON.stringify({ success: true, data: videos }), {
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
