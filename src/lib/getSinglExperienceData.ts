export const getExperienceDataById = async (id: string) => {
 
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/experience/${id}`,
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
