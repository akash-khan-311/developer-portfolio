export const getExperienceData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/experience/`,
    {
      cache: 'no-store',
    }
  );
  if (!res.ok) {
    throw new Error('Failed to fetch experience data');
  }
  const data = await res.json();
  return data;
};
