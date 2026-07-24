export default {
  async fetch(request) {


    const corsHeaders = {

      "Access-Control-Allow-Origin": "*",

      "Access-Control-Allow-Methods": "GET, OPTIONS",

      "Access-Control-Allow-Headers": "Content-Type",

    };



    // Handle CORS preflight

    if(request.method === "OPTIONS"){

      return new Response(null, {

        headers: corsHeaders

      });

    }



    const url = new URL(request.url);



    // Scan API

    if(url.pathname === "/scan"){



      const website = url.searchParams.get("url");



      if(!website){


        return Response.json(

          {

            error:"No website provided"

          },

          {

            headers:corsHeaders

          }

        );

      }



      // Temporary demo analysis

      const score = Math.floor(
        Math.random() * (95 - 60 + 1)
      ) + 60;



      return Response.json(

        {

          website: website,

          privacy_score: score,

          https: true,

          cookies: 8,

          trackers: 2,

          message:"Analysis completed"

        },

        {

          headers:corsHeaders

        }

      );


    }



    // Default route

    return Response.json(

      {

        status:"Spectra Guard API Running"

      },

      {

        headers:corsHeaders

      }

    );


  },

};
