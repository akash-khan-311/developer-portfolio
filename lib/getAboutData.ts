export const getAboutData = async () => {
 const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/about`,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) {
    throw new Error('Failed to fetch about data');
  }
  const data = await res.json();
  return data;
};