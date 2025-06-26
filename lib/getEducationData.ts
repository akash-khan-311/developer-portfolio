export const getEducationData = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/education`,
      {
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      throw new Error('Failed to fetch education data');
    }
    const data = await res.json();
    return data;
  } catch (error) {}
};
