export const toggler = (id, prevState) => ({
  open: prevState.id === id ? !prevState.open : true,
  id: prevState.id === id ? null : id
});
