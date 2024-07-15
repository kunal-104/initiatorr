// // app/api/items/route.js
// import { NextResponse } from 'next/server';
// import clientPromise from '../../../lib/mongodb';
// import { ObjectId } from 'mongodb';

// export async function GET() {
//   const client = await clientPromise;
//   const db = client.db('myDatabase');
//   const items = await db.collection('items').find({}).toArray();
//   return NextResponse.json(items);
// }

// export async function POST(req) {
//   const client = await clientPromise;
//   const db = client.db('myDatabase');
//   const newItem = await req.json();
//   const result = await db.collection('items').insertOne(newItem);
//   return NextResponse.json(result.ops[0], { status: 201 });
// }

// export async function PUT(req) {
//   const client = await clientPromise;
//   const db = client.db('myDatabase');
//   const { id, ...updateData } = await req.json();
//   await db.collection('items').updateOne({ _id: new ObjectId(id) }, { $set: updateData });
//   return NextResponse.json({ message: 'Item updated' });
// }

// export async function DELETE(req) {
//   const client = await clientPromise;
//   const db = client.db('myDatabase');
//   const { id } = await req.json();
//   await db.collection('items').deleteOne({ _id: new ObjectId(id) });
//   return NextResponse.json({ message: 'Item deleted' });
// }
// useEffect(() => {
//     const fetchItems = async () => {
//       const res = await fetch('/api/items');
//       const data = await res.json();
//       setItems(data);
//     };

//     fetchItems();              // calling api
//   }, []);