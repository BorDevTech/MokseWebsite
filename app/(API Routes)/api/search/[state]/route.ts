// Dynamic State resource route
const GET = async (req: Request, { params }: { params: { state: string } }) => {
  return new Response(`State: ${params.state}`);
};
