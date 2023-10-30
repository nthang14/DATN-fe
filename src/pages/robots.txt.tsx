import { GetServerSideProps } from "next";

export default function Sitemap() {
  return null;
}

export const getServerSideProps: GetServerSideProps<{}> = async ({ res }) => {
  res.setHeader("Content-Type", "text/xml");
  res.setHeader("Cache-Control", "no-cache, must-revalidate");

  const xml = await generateSitemap();
  res.write(xml);
  res.end();
  return {
    props: {},
  };
};
async function generateSitemap(): Promise<string> {
  return `User-agent: *
  `;
}
