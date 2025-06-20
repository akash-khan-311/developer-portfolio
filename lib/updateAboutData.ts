export const updateAboutData = async (payload: {description: string, profileImage: string}
) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/about`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error('Failed to update about  data');
    }

    const data = await  res.json()
    return {
        success: true,
        message: 'About Data Updated Successfully',
        data: data,
    }

  } catch (error) {
    console.error('Error updating About data:', error);
    return {
      success: false,
      message: error.message || 'Something went wrong',
      data: null,
    };
  }
};
