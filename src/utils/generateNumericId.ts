const generateNumericId = () => {
  const uuid = crypto.randomUUID();
  return uuid.replace(/\D/g, "").slice(0, 15); // Remove non-numeric characters and slice
};

export default generateNumericId;
