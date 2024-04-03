export const POST = async (req: { file: File | null }) => {
  try {
    const { file } = req;
    console.log("__upload__FILE", file);
  } catch (error) {
    console.error("__upload__ERROR", error);
  }
};
