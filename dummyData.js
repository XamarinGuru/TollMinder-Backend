const Data = [
  {
    collection: 'users',
    data: {},
    ret: false
  },
  {
    collection: 'users',
    data: {},
    ret: false
  },
  {
    collection: 'locations',
    data: {
      latitude: 33.479557,
      longitude: -117.140821
    },
    ret: true
  },
  {
    collection: 'tollPoints',
    data: {
      name: 'Temecula entrance',
      action: 'entrance',
      _location: 'ret',
    },
    ret: true
  },
  {
    collection: 'tollRoadWayPoints',

  }

];
function start() {
  return Promise.resolve(null);
}

function logNumber(i) {
  console.log(i);
  return Promise.resolve(null);
}

let prom = start();

for (let i = 0; i < 10; i++) {
  prom.then(_ => logNumber(i));
}
