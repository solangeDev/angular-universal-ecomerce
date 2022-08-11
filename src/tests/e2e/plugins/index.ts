const path = require('path');
const MockApi = require('restapify').default;
const apiFolderPath = path.resolve('./src/utils/mockedApi');

const default_states = [
  {
    route: '/users',
    method: 'POST'
  },
  {
    route: '/tokens',
    method: 'POST'
  },
  {
    route: '/companies',
    method: 'GET'
  },
  {
    route: '/companies',
    method: 'POST'
  },
  {
    route: '/forgot-password/request',
    method: 'POST'
  },
  {
    route: '/domains',
    method: 'GET'
  },
  {
    route: "/forgot-password/request",
    method: "POST"
  },
  {
    route: "/forgot-password/recover",
    method: "POST"
  },
  {
    route: "/users/confirm-account",
    method: "POST"
  }
];

const not_found_states = [
  {
    route: '/users',
    method: 'POST',
    state: 'NOT_FOUND'
  },
  {
    route: '/companies',
    method: 'GET',
    state: 'NOT_FOUND'
  },
  {
    route: '/companies',
    method: 'POST',
    state: 'NOT_FOUND'
  },
  {
    route: '/domains',
    method: 'GET',
    state: 'NOT_FOUND'
  }
];

const suggest_states = [
  {
    route: '/domains',
    method: 'GET',
    state: 'SUGGEST'
  }
];

const bad_request_states = [
  {
    route: '/forgot-password/request',
    method: 'POST',
    state: 'BAD_REQUEST'
  },
  {
    route: "/forgot-password/recover",
    method: "POST",
    state: "BAD_REQUEST"
  },
  {
    route: "/users/confirm-account",
    method: "POST",
    state: "BAD_REQUEST"
  }
];

export async function LaunchMockApi(type: string) {

  return new Promise((resolve, reject) => {
    let states: { route: string; method: string; state?: string }[];

    switch (type) {
      case 'not_found':
        states = not_found_states;
        break;
      case 'bad_request':
        states = bad_request_states;
        break;
      case 'suggest':
        states = suggest_states;
        break;
      default:
        states = default_states;
        break;
    }

    // @ts-ignore
    if(global.rpfy){
      console.info(`Mock API update states: ${type}`);
      // @ts-ignore
      global.rpfy.close();
    }

    // @ts-ignore
    global.rpfy = new MockApi({
      rootDir: apiFolderPath,
      openDashboard: false,
      hotWatch: false,
      states: states
    });

    // @ts-ignore
    console.info('Mock API init ',  JSON.stringify(global.rpfy.getServedRoutes()));

    // @ts-ignore
    global.rpfy.on('error', ({ error, message }) => {
      console.info('mock-api error: ', error);
      return resolve(false);
    });

    // @ts-ignore
    global.rpfy.on('start', () => {
      console.log('Mock API successfully started');
      return resolve(true);
    });

    // @ts-ignore
    global.rpfy.run();

    // @ts-ignore
    global.rpfy.on(['server:restart'], () => {
      console.log('Mock API successfully restarted');
    })

  });
}




