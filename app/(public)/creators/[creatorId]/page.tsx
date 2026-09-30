export default async function CreatorPage({ params }: PageProps<"/creators/[creatorId]">) {
  const { creatorId } = await params;

  return <div>Creator: {creatorId}</div>;
}
