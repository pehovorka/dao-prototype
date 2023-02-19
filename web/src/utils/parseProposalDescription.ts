export const parseProposalDescription = (description: string) => {
  const [title, body] = description.slice(2).split(/\n(.*)/s);
  return { title, body };
};
