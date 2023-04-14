export const fileUpload = async (file) => {
  if (!file) throw new Error("No Files selected");

  const cloudinaryUrl = "https://api.cloudinary.com/v1_1/jlml/upload";

  const formData = new FormData();
  formData.append("upload_preset", "DAIRY_JOURNAL");
  formData.append("file", file);

  try {
    const res = await fetch(cloudinaryUrl, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("something went wrong sending img => " + res.statusText);
    }

    const { asset_id, secure_url, original_filename } = await res.json();

    return { asset_id, secure_url, original_filename };
  } catch (error) {
    console.error(error);
  }
};
