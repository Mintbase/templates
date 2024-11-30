import { NextResponse } from "next/server";

const replicate = () => {
  return {
    handlers: {
      GET: async (request: Request, data: any) => {
        const { params } = data;
        const { id } = params;

        if (!id) {
          return NextResponse.json(
            { error: "id is not defined" },
            { status: 500 }
          );
        }

        const response = await fetch(
          "https://api.replicate.com/v1/predictions/" + id,
          {
            headers: {
              Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
              "Content-Type": "application/json",
            },
            cache: "no-store",
          }
        );

        if (response.status !== 200 && response.status !== 201) {
          let error = await response.json();
          console.log(error);

          return NextResponse.json({ error: error.detail }, { status: 500 });
        }

        try {
          const prediction = await response.json();
          return NextResponse.json(prediction, { status: 200 });
        } catch (error) {
          console.error(error);

          return NextResponse.json({ error: error }, { status: 500 });
        }
      },
      POST: async (request: Request) => {
        const body = await request.json();

        const { version, input } = body;

        const response = await fetch(
          "https://api.replicate.com/v1/predictions",
          {
            method: "POST",
            headers: {
              Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              version: version,
              input: input,
            }),
          }
        );

        if (response.status !== 201) {
          let error = await response.json();
          return NextResponse.json({ error: error.detail }, { status: 500 });
        }

        try {
          const prediction = await response.json();
          return NextResponse.json(prediction, { status: 201 });
        } catch (error) {
          console.error("Error converting image to blob:", error);
          return NextResponse.json({ error: error }, { status: 500 });
        }
      },
    },
  };
};

export const { handlers } = replicate();
