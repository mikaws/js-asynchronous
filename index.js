(async () => {
  const axios = require('axios');
  const gitHubApi = user => `https://api.github.com/users/${user}/repos`;
  const users = ['rmanguinho', 'otaviolemos', 'mikaws'];
  
  // ---------//--------- faster cases, useful if next code lines don't depend on promise

  //example 1
  console.time();
  const p1 = axios.get(gitHubApi('rmanguinho'));
  const p2 = axios.get(gitHubApi('otaviolemos'));
  const p3 = axios.get(gitHubApi('mikaws'));
  await Promise.all([p1, p2, p3]);
  console.log(res.status); //executes before response 200
  console.timeEnd();

  //example2
  console.time();
  users.forEach(async user => {
    const res = await axios.get(gitHubApi(user))
    console.log(res.status); //executes before response 200
  });
  console.timeEnd();

  // ---------//--------- slower, useful if next code lines depend on promise

  //example 1
  console.time();
  const res1 = await axios.get(gitHubApi('rmanguinho'));
  const res2 = await axios.get(gitHubApi('otaviolemos'));
  const res3 = await axios.get(gitHubApi('mikaws'));
  console.log(res1.status); //executes after response 200
  console.log(res2.status);
  console.log(res3.status);
  console.timeEnd();

  //example 2
  console.time();
  for(const user of users){
    const res = await axios.get(gitHubApi(user))
    console.log(res.status) //executes after response 200
  }
  console.timeEnd();
})();

// without async/await

axios.get(gitHubApi('mikaws')).then(res => {
  console.log(res.data);
});