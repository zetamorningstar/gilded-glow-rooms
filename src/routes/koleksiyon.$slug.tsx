import { createFileRoute, notFound } from "@tanstack/react-router";

import { CollectionDetail } from "@/components/collection-detail";
import { getCollection } from "@/lib/collections";

export const Route = createFileRoute("/koleksiyon/$slug")({
  loader: ({ params }) => {
    const collection = getCollection(params.slug);
    if (!collection) throw notFound();
    return { collection };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Koleksiyon bulunamadı | Nil Mobilya" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { collection } = loaderData;
    return {
      meta: [
        { title: `Nil Mobilya | ${collection.title} Koleksiyonu` },
        { name: "description", content: collection.description },
        { property: "og:title", content: `Nil Mobilya | ${collection.title} Koleksiyonu` },
        { property: "og:description", content: collection.description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CollectionRoute,
});

function CollectionRoute() {
  const { collection } = Route.useLoaderData();
  return <CollectionDetail collection={collection} />;
}
