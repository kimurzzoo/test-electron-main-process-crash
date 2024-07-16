import './App.css';

function App() {
  return (
    <div className="App">
      <button
        onClick={() => {
          const device = (navigator as any).bluetooth.requestDevice({
            filters: [{ namePrefix: ['C-B'] }],
            optionalServices: [serviceUUID],
          });
          console.log(device);
        }}
      >
        bluetooth connect
      </button>
    </div>
  );
}

const serviceUUID = 'aa';

const timeoutPromise = new Promise((_, rej) => {
  const timer = setTimeout(() => {
    console.log('timeout dfu');
    rej();
  }, 1000 * 30);
});

const bluetoothConnect = new Promise((res, rej) => {
  const device = (navigator as any).bluetooth.requestDevice({
    filters: [{ namePrefix: ['kk'] }],
    optionalServices: [serviceUUID],
  });
  console.log(device);
  res(device);
});

const bluetoothBtnClick = () => {
  return Promise.race([bluetoothConnect, timeoutPromise]).then(
    async (device) => {
      console.log('race', device);
    },
  );
};

export default App;
