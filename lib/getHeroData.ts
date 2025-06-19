export const getHeroData = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hero`, {
      cache: 'no-store',
    });

    return res.json();
  } catch (error) {
    console.error('Error fetching hero data:', error);
    return null;
  }
};
