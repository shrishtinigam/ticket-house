/*
Suggestion Regarding a Default Export Warning
In the upcoming lecture, we will create our first components and run the Next server. You may see a warning in the terminal or browser console:

Anonymous arrow functions cause Fast Refresh to not preserve local component state.

Please add a name to your function, for example:

Before

export default () => <div />;

After

const Named = () => <div />;

export default Named;

This is a linter warning as of React v17 letting us know that it might be wise to use named exports instead.

You can suppress the warning by refactoring from this:

export default () => {
  return <h1>Landing Page</h1>;
};
to this:

const Landing = () => {
  return <h1>Landing Page</h1>;
};
 
export default Landing;
The warning will come up a few more times in this project (and throughout the course) when creating components and can be handled similarly.

*/

/*
A note about ECONNREFUSED errors
In the upcoming lecture at about the 4:10 timestamp, we will be moving the axios request from the getInitialProps function directly to the LandingPage as part of an explanation. This will likely fail with a long ECONNREFUSED error in your Skaffold output.

Node Alpine Docker images are now likely using the v16 version of Node, so, we will again encounter a situation that will require a catch block.

Change this code in client/pages/index.js

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  axios.get('/api/users/currentuser');
 
  return <h1>Landing Page</h1>;
};
to this:

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  axios.get('/api/users/currentuser').catch((err) => {
    console.log(err.message);
  });
 
  return <h1>Landing Page</h1>;
};
*/

// ingress-nginx-controller.ingress-nginx.svc.cluster.local

import buildClient from '../api/build-client';

// Browser
const LandingPage = ({ currentUser }) => {
  return currentUser ? <h1>Youre signed in</h1> : <h1>youre not signed in</h1>;
}

// Server
LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser').catch((err) => {
    console.log(err.message);
  });
  return data;
}

export default LandingPage;