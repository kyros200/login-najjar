const extractUser = (token) => { try { return JSON.parse(atob(token.split('.')[1])); } catch { return undefined } };
const decodeLogin = () => localStorage.getItem('loggedUser') ? extractUser(localStorage.getItem('loggedUser')) : undefined;

const logoff = () => {
  localStorage.removeItem('loggedUser');
}

const authFetch = async (path, method = 'GET', data) => {
  let response = await fetch(`${path}`, {
    body: data ? JSON.stringify(data) : undefined,
    method: method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('loggedUser')}`
    },
    redirect: 'follow'
  });
  if (response.status !== 200) { //error 403 should be the only error for logoff
    if(response.status === 403)
      logoff();
    console.log(response);
  }
  return new Promise((resolve, reject) => { resolve(response); });
}

export { authFetch, decodeLogin, extractUser, logoff};