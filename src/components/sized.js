import sizeMe from 'react-sizeme'

export default function (component) {
  // our react-sizeme defaults
  const config = {
    monitorHeight: true,
    refreshRate: 100,  // frequency of updates in ms, default is 16
    refreshMode: 'throttle'
  }

  // Call SizeMe with the config to get back the Higher Order Component (HOC)
  return sizeMe(config)(component)
}
