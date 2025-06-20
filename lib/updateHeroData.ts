export const updateHeroData = async (payload: {
  greet: string;
  name: string;
  introText: string[];
  backgroundImage?: string;
}) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hero`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error('Failed to update hero data');
    }

    const data = await  res.json()
    return {
        success: true,
        message: 'Hero Data Updated Successfully',
        data: data,
    }

  } catch (error) {
    console.error('Error updating hero data:', error);
    return {
      success: false,
      message: error.message || 'Something went wrong',
      data: null,
    };
  }
};
