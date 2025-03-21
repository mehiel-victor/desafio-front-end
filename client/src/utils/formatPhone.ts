export const formatPhone = (phone: string): string => {
  const regex = /^(\d{2})(\d{2})(\d{5})(\d{4})$/;
  const match = phone.match(regex);

  if (match) {
    return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}`;
  }

  return phone;
};
