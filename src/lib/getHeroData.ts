

export const getHeroData = async () => {
 const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/hero`,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) {
    throw new Error('Failed to fetch hero data');
  }
  const data = await res.json();
  return data;
};