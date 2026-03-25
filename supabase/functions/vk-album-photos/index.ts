import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const OWNER_ID = '-224938569';
const ALBUM_ID = '302058882';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const VK_SERVICE_KEY = Deno.env.get('VK_SERVICE_KEY');
    if (!VK_SERVICE_KEY) throw new Error('VK_SERVICE_KEY is not configured');

    const url = new URL(req.url);
    const count = url.searchParams.get('count') || '50';
    const offset = url.searchParams.get('offset') || '0';

    const vkUrl = `https://api.vk.com/method/photos.get?owner_id=${OWNER_ID}&album_id=${ALBUM_ID}&count=${count}&offset=${offset}&rev=1&photo_sizes=1&access_token=${VK_SERVICE_KEY}&v=5.199`;

    const response = await fetch(vkUrl);
    const data = await response.json();

    if (data.error) {
      throw new Error(`VK API error: ${JSON.stringify(data.error)}`);
    }

    const photos = data.response.items.map((item: any) => {
      // Get the largest available size
      const sizes = item.sizes || [];
      const best = sizes.reduce((prev: any, curr: any) =>
        (curr.width * curr.height > prev.width * prev.height) ? curr : prev,
        sizes[0] || {}
      );
      return {
        id: item.id,
        url: best.url,
        width: best.width,
        height: best.height,
        text: item.text || '',
        date: item.date,
      };
    });

    return new Response(JSON.stringify({ photos, total: data.response.count }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
