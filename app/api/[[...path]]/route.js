import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';

const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME || 'iri_brasil';

let cachedClient = null;

async function getDb() {
  if (cachedClient) return cachedClient.db(DB_NAME);
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  cachedClient = client;
  return client.db(DB_NAME);
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders() });
}

export async function GET(request, { params }) {
  const path = (params?.path || []).join('/');
  try {
    if (path === '' || path === 'health') {
      return NextResponse.json(
        { status: 'ok', service: 'iri-brasil-api', time: new Date().toISOString() },
        { headers: corsHeaders() }
      );
    }
    if (path === 'events') {
      const db = await getDb();
      const events = await db
        .collection('events')
        .find({})
        .sort({ createdAt: -1 })
        .limit(100)
        .toArray();
      return NextResponse.json(
        { events: events.map((e) => ({ ...e, _id: undefined })) },
        { headers: corsHeaders() }
      );
    }
    return NextResponse.json({ error: 'Not found' }, { status: 404, headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500, headers: corsHeaders() }
    );
  }
}

export async function POST(request, { params }) {
  const path = (params?.path || []).join('/');
  try {
    const body = await request.json().catch(() => ({}));

    if (path === 'track') {
      const { event, metadata } = body;
      if (!event) {
        return NextResponse.json(
          { error: 'event field required' },
          { status: 400, headers: corsHeaders() }
        );
      }
      const db = await getDb();
      const doc = {
        id: uuidv4(),
        event,
        metadata: metadata || {},
        userAgent: request.headers.get('user-agent') || '',
        referer: request.headers.get('referer') || '',
        createdAt: new Date().toISOString(),
      };
      await db.collection('events').insertOne(doc);
      return NextResponse.json(
        { ok: true, id: doc.id },
        { headers: corsHeaders() }
      );
    }

    return NextResponse.json({ error: 'Not found' }, { status: 404, headers: corsHeaders() });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500, headers: corsHeaders() }
    );
  }
}
